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
    const $url = (this.data.powershellScript === undefined) ? '/api' : this.data.powershellScript;
    return `
    # initialize token
    $headers = @{"Access-Token"=("Bearer " + "${this.data.token}"); "Accept"="application/hal+json"}

    # call IISAdministration API
    $response = invoke-webrequest ${this.data.uri}${$url} -UseBasicParsing -UseDefaultCredentials -ContentType "application/json" -Headers $headers;

    # Convert the content in byte array to UTF string
    $content = if ( $response.Content.GetType().Name -eq "Byte[]" ) { [System.Text.Encoding]::UTF8.GetString( $response.content ) } else { $response.content }

    # Clear screen and display rrettified Json object
    clear-host
    $content | ConvertFrom-JSON | ConvertTo-JSON
`;
  }
}
