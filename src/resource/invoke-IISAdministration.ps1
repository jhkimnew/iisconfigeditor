#Requires -RunAsAdministrator
#Requires -Version 4.0
#
# FYI, example of raw request:
#  Invoke-WebRequest https://localhost:55539/api -UseBasicParsing -UseDefaultCredentials -ContentType "application/json" -Headers @{"Access-Token"="Bearer s2qS3-wKW2LzLJUbQ9kr0GhHHnpORWc5Ds6nPEfk7AD4pVl-hfaNSg"}
# 
Param(
    [string]
    $apiCommand = "/api",

    [string]
    $sessionId = "test",

    [ValidateSet('ensure', 'delete')]
    [string]
    $command = "ensure",

    [string]
    $tokenId,

    [string]
    $apiHost = "https://localhost:55539",

    [int]
    $tokenExpiryDays = 3
)

$ErrorActionPreference = "Stop"
$contentEncoding = [System.Text.Encoding]::UTF8
$tokenName = "PS/${sessionId}"
$RenewEndpoint = "access-tokens"
$CreateEndpoint = "api-keys"
$DeleteEndpoint = "api-keys"
function VerifyResponse([string] $action, [Microsoft.Powershell.Commands.WebResponseObject] $response) {
    if ($response.StatusCode -ge 300) {
        throw "Invalid status code $($response.StatusCode) while performing action: $action"
    }
}

function TokenRequest([string] $targetEndpoint, [string]$method, [string]$subpath, $requestBody) {
    $sessionCreate = Invoke-WebRequest "$apiHost/security/$targetEndpoint" -UseBasicParsing -UseDefaultCredentials -SessionVariable sess
    VerifyResponse "Create WSRF-TOKEN on $targetEndpoint" $sessionCreate | Out-Null
    $hTok = $sessionCreate.headers."XSRF-TOKEN"
    if ($hTok -is [array]) {
        $hTok = $hTok[0]
    }
    $requestParams = @{
        "Uri" = "$apiHost/security/$targetEndpoint";
        "Headers" = @{ 'XSRF-TOKEN' = $htok };
        "Method" = $method;
        "UseDefaultCredentials" = $true;
        "UseBasicParsing" = $true;
        "ContentType" = "application/json";
        "WebSession" = $sess
    }
    if ($subpath) {
        $requestParams.Uri += "/${subpath}"
    }
    if ($requestBody) {
        $requestParams.Body = (ConvertTo-Json -Compress $requestBody)
    }
    $tokenUpsert = Invoke-WebRequest @requestParams
    VerifyResponse "Upsert access token on $targetEndpoint" $sessionCreate | Out-Null
    return $contentEncoding.GetString($tokenUpsert.Content)
}

if ($tokenId) {
    $existingToken = @{ "id" = $tokenId }
} else {
    try {
        $query = Invoke-WebRequest "$apiHost/security/$CreateEndpoint" -UseBasicParsing -UseDefaultCredentials -ContentType "application/json"
    } catch {
        if ($_.Exception.Status -eq [System.Net.WebExceptionStatus]::ConnectFailure) {
            ## NOTE: we will be detecting this error message upstream
            throw "Unable to connect to the remote server"
        } else {
            throw $_
        }
    }
    VerifyResponse "query exsiting tokens" $query | Out-Null
    $existingToken = (ConvertFrom-Json $contentEncoding.GetString($query.Content)).api_keys | Where-Object { $_.purpose -eq $tokenName }
}

if ($command -eq 'ensure') {
    if ($existingToken) {
        ## always renew token when this script is called because there was no way to query for existing token's value
        $existingToken.expires_on = (Get-Date).AddDays($tokenExpiryDays).ToString()
        ## This is an odd behavior: we need to wrap the existing token in a new object
        $output = TokenRequest -targetEndpoint $RenewEndpoint -method "POST" -requestBody @{ "api_key" = $existingToken }
    } else {
        $output = TokenRequest -targetEndpoint $CreateEndpoint -method "POST" -requestBody @{ "expires_on" = (Get-Date).AddDays(14).ToString(); "purpose" = $tokenName }
    }
} elseif ($command -eq 'delete') {
    $output = TokenRequest -targetEndpoint $DeleteEndpoint -method "DELETE" -subpath $existingToken.id
}

$global:result = $null
$tokenValue = ($output | ConvertFrom-JSON).value
$global:result = @{"tokenValue"=$tokenValue}
$result = $null
try {
    $result = Invoke-WebRequest ($apiHost + $apiCommand) -UseBasicParsing -UseDefaultCredentials -ContentType "application/json" -Headers @{"Access-Token"=("Bearer " + $tokenValue)}
    $global:result = @{ "tokenValue"=$tokenValue; "response"=$result }
    if ($result.Content.GetType().Name -eq "Byte[]") {
        [System.Text.Encoding]::ASCII.GetString($result.content)
    }
    else {
        $result.content
    }
} catch {
    if ($_.Exception.Status -eq [System.Net.WebExceptionStatus]::ConnectFailure) {
        ## NOTE: we will be detecting this error message upstream
        throw "Unable to connect to the remote server"
    } else {
        throw $_
    }
}