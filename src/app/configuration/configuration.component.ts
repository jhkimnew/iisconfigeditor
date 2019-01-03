import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {
  items = [];
  properties = [];
  selectedItem: any;
  breadCrumb = [];
  breadCrumbCounter: number;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.breadCrumb = [];
    this.breadCrumbCounter = 0;
    this.initialize(this.data.feature.href);
  }

  initialize(url: string) {
    this.data.get(url)
      .subscribe(r => {
        this.getProperties(r);
      }, e => {
        console.log(e);
      });
  }

  getProperties(items: Object) {
    for (const item in items) {
      if (items.hasOwnProperty(item)) {
        if (item === '_links') {
          this.getLinks(items['_links']);
          continue;
        }
        if (item === 'metadata') {
          continue;
        }
        const value = items[item];
        if (value === null) {
          continue;
        }
        if (item === 'scope' ) {
          continue;
        }
        if (item === 'id' ) {
          continue;
        }
        if (this.isArray(value)) {
          this.getCollection(item, value);
          continue;
        }
        if (typeof value === 'object') {
          const parent = item;
          this.getChildProperties(parent, value);
          continue;
        }
        this.properties.push({
          'name': item,
          'value': value
        });
      }
    }
  }

  getLinks(links: Object) {
    for (const link in links) {
      if (links.hasOwnProperty(link)) {
        if (link === 'self') {
          continue;
        }
        this.items.push({
          'name': link,
          'href': links[link].href
        });
      }
    }
  }

  getCollection(parent: string, links) {
    let found = false;
    for (const key in links) {
      if (links.hasOwnProperty(key)) {
        found = true;

        // name of collection is the value of name or path property
        let name = '';
        if (links[key].name) {
          name = links[key].name;
        }
        if (name === '' && links[key].path) {
          name = links[key].path;
        }
        if (name === '') {
          name = links[key].id;
        }

        if (name && links[key]._links && links[key]._links.hasOwnProperty('self')) {
          // get collection
          const href = links[key]._links['self'].href;
          this.items.push({
            'name': name,
            'id': links[key].id,
            'href': href
          });
        } else {
          // get collection properties
          this.getChildProperties(parent + '[' + key + ']', links[key]);
        }
      }
    }
    return found;
  }

  isArray(what) {
    return Object.prototype.toString.call(what) === '[object Array]';
  }

  getChildProperties(parent: string, items: Object) {
    let found = false;
    const childProperties = [];
    for (const item in items) {
      if (items.hasOwnProperty(item)) {
        const value = items[item];
        if (value === null) {
          continue;
        }
        if (item === '_links') {
          continue;
        }
        if (item === 'scope' && value === '' ) {
          continue;
        }
        if (item === 'id' ) {
          continue;
        }
        found = true;

        childProperties.push({
          'name': item,
          'value': items[item]
        });
      }
    }

    if (found) {
      this.properties.push({
        'name': parent,
        'value': '...',
        'childProperites': childProperties
      });
    }
  }

  onClickItem(item) {
    this.selectedItem = item;
    if (item.index === undefined) {
      this.breadCrumb.push({index: this.breadCrumbCounter++, name: item.name, href: item.href});
    }

    if (item.index !== undefined && this.breadCrumb.length > 1) {
      if ((item.index + 1) < this.breadCrumb.length ) {
        this.breadCrumb.splice((item.index + 1), this.breadCrumb.length - (item.index - 1));
      }
    }

    this.items = [];
    this.properties = [];
    this.initialize(item.href);
  }

  onClickBreadcrumb(item) {
    this.onClickItem(item);
  }
}
