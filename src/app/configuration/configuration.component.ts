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
  updatedInputValue = '';

  constructor(private data: DataService) { }

  ngOnInit() {
    this.breadCrumb = [];
    this.breadCrumbCounter = 0;
    this.initialize(this.data.feature.href);
    this.data.initialize();
  }

  initialize(url: string) {
    this.data.initialize();
    this.data.get(url)
      .subscribe(r => {
        this.getProperties(r);

        // set powershell script
        this.data.powershellScript = url;

      }, e => {
        console.log(e);
      });
  }

  onClickItem(item) {
    this.selectedItem = item;
    if (item.index === undefined) {
      this.breadCrumb.push({index: this.breadCrumbCounter++, name: item.name, href: item.href});
    } else {
      if ((item.index + 1) < this.breadCrumb.length ) {
        this.breadCrumb.splice((item.index + 1), this.breadCrumb.length - item.index - 1);
        this.breadCrumbCounter = this.breadCrumb.length;
      }
    }

    this.items = [];
    this.properties = [];
    this.initialize(item.href);
  }

  onClickBreadcrumb(item) {
    this.onClickItem(item);
  }

  onChangeValue(property, newValue) {
    const oldValue = property.value;
    property.value = newValue;
    console.log(property.name, newValue);
    this.data.patch(this.selectedItem.href, property.name, newValue)
      .subscribe(r => {
        this.data.patchedProperty = property;
      }, e => {
        property.value = oldValue;
      });
  }

  private getProperties(items: Object) {
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
        if (this.isStringArray(value)) {
           const parent = item;
           this.getStringArray(parent, value);
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

  private checkJSON(m) {
    if (typeof m === 'object') {
       try { m = JSON.stringify(m); } catch (err) { return false; }
    }
    if (typeof m === 'string') {
       try { m = JSON.parse(m); } catch (err) { return false; }
    }
    if (typeof m !== 'object') { return false; }
    return true;
  }

  private isArray(what) {
    return Object.prototype.toString.call(what) === '[object Array]';
  }

  private isStringArray(what) {
    if (this.isArray(what) && what.length > 0) {
      if (!this.checkJSON(what[0])) {
        return true;
      }
    }
    return false;
  }

  private getLinks(links: Object) {
    for (const link in links) {
      if (links.hasOwnProperty(link)) {
        if (link === 'self') {
          continue;
        }
        if (link === 'copy') {
          continue;
        }
        if (link === 'move') {
          continue;
        }
        if (link === 'downloads') {
          continue;
        }
        this.items.push({
          'name': link,
          'href': links[link].href
        });
      }
    }
  }

  private getCollection(parent: string, links) {
    let found = false;

    for (const key in links) {
      if (links.hasOwnProperty(key)) {
        found = true;

        // set name with a meaningful value among from the existing property values

        // for server
        let name = '';
        if (links[key].name) {
          name = links[key].name;
        }
        if (name === '' && links[key].path) {
          name = links[key].path;
        }
        if (name === '' && links[key].file_extension) {   // mime type
          name = links[key].file_extension;
        }
        if (name === '' && links[key].users) {            // authorization\rules
          name = links[key].users;
        }

        // for certificates
        if (name === '' && links[key].thumbprint) {
          name = links[key].thumbprint + ( (links[key].subject !== '') ? ', ' + links[key].subject : '');
        }

        // for access token
        if (name === '' && links[key].purpose) {
          name = links[key].purpose + '(' + links[key].id + ')';
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
          this.getChildProperties(parent + ' ' + '[' + key + ']', links[key]);
        }
      }
    }
    return found;
  }

  private getStringArray(parent: string, items: Object) {
    const childProperties = [];
    for (const item in items) {
      if (items.hasOwnProperty(item)) {
        const value = items[item];
        childProperties.push({
          'name': item,
          'value': value,
          'type': 'stringArray'
        });
      }
    }
    this.properties.push({
      'name': parent,
      'value': '...',
      'childProperites': childProperties
    });
  }

  private getChildProperties(parent: string, items: Object) {
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
}
