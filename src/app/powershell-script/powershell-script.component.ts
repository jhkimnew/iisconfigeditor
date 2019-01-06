import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-powershell-script',
  templateUrl: './powershell-script.component.html',
  styleUrls: ['./powershell-script.component.css']
})
export class PowershellScriptComponent implements OnInit {

  constructor(private data: DataService) { }

  ngOnInit() {
  }

  get content() {
    if (this.data.patchedProperty) {
      return this.patch_content();
    } else {
      return this.get_content();
    }
  }

  patch_content() {
    const $url = (this.data.powershellScript === undefined) ? '/api' : this.data.powershellScript;
    return `
    # Initialize token (Warning! Do not share your token key used here!)
    $headers = @{"Access-Token"=("Bearer " + "${this.data.token}"); "Accept"="application/hal+json"}
    $content = '{ "${this.data.patchedProperty.name}":"${this.data.patchedProperty.value}" }'

    # Call IISAdministration API
    $response = invoke-webrequest ${this.data.uri}${$url} -UseBasicParsing -UseDefaultCredentials -ContentType "application/json" -Headers $headers -Method "Patch" -Body $content

    # Convert the content in byte array to UTF string
    $content = if ( $response.Content.GetType().Name -eq "Byte[]" ) { [System.Text.Encoding]::UTF8.GetString( $response.content ) } else { $response.content }

    # Clear screen and display rrettified Json object
    $content | ConvertFrom-JSON | ConvertTo-JSON
`;
  }

  get_content() {
    const $url = (this.data.powershellScript === undefined) ? '/api' : this.data.powershellScript;
    return `
    # Initialize token (Warning! Do not share your token key used here!)
    $headers = @{"Access-Token"=("Bearer " + "${this.data.token}"); "Accept"="application/hal+json"}

    # Call IISAdministration API
    $response = invoke-webrequest ${this.data.uri}${$url} -UseBasicParsing -UseDefaultCredentials -ContentType "application/json" -Headers $headers

    # Convert the content in byte array to UTF string
    $content = if ( $response.Content.GetType().Name -eq "Byte[]" ) { [System.Text.Encoding]::UTF8.GetString( $response.content ) } else { $response.content }

    # Clear screen and display rrettified Json object
    $content | ConvertFrom-JSON | ConvertTo-JSON

`;
  }
}
