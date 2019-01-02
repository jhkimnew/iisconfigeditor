import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  configActive = false;
  features = [];

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.get('/api/webserver')
      .subscribe(r => {
        const links = r['_links'];
        for (const key in links) {
          if (links.hasOwnProperty(key)) {
            const val = links[key];
            this.features.push({'name': key, 'href': val['href']});
          }
        }
      }, e => {
        console.log(e);
      });
  }

  reset() {
    setTimeout(() => this.configActive = false, 0);
    setTimeout(() => this.configActive = true, 0);
  }
}
