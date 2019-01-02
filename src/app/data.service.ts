import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnInit {
  feature;

  constructor(private client: HttpClient) {}

  ngOnInit() {
    this.testToken(this.token)
      .subscribe(
        r => {
          console.log('using exisint token', r);
        },
        e => {
          console.log('existing token is invalid', e);
          localStorage.clear();
        });
  }

  get token() {
    return localStorage.getItem('token');
  }

  set token(value: string) {
    this.testToken(value)
      .subscribe(
        r => {
          console.log(r);
          localStorage.setItem('token', value);
        },
        e => {
          console.log(e);
          localStorage.clear();
        });
  }

  logout() {
    localStorage.clear();
  }

  get tokenInitialized() {
    return this.token;
  }

  testToken(value: string) {
    return this.client.get('https://localhost:55539/api', {
      withCredentials: true,
      headers: new HttpHeaders({
        'Access-Token': 'Bearer ' + value,
      }),
    });
  }

  get(url: string) {
    return this.client.get('https://localhost:55539' + url, {
      withCredentials: true,
      headers: new HttpHeaders({
        'Access-Token': 'Bearer ' + this.token,
        'Accept': 'application/hal+json'
      }),
    });
  }

  test() {
    this.client.get('https://localhost:55539/security/api-keys', {
      withCredentials: true,
    }).subscribe(r => {
      const keyId = this.extractKeyId(r);

      this.updateToken(keyId);
    }, e => {
      console.log('0: error', e);
    });
  }

  private extractKeyId(r) {
    let keys: Array<any>;
    keys = r.api_keys;
    const found = keys.find(e => {
      return e['purpose'] === 'iis-configuration-editor';
    });

    return found['id'];
  }

  private updateToken(keyId) {
    const token = {
      'api_key': {
        'purpose': 'iisconfigeditor',
        'id': 'XdGcGBmQjIPLGUMHOioCNQ',
        'created_on': '2018-12-30T05:16:31.352428Z',
        'last_modified': '2018-12-30T05:59:19.1485126Z',
        'expires_on': ''
      }
    };
    token.api_key.id = keyId;

    this.client.get('https://localhost:55539/api/files?parent.id=zFYTJrNEjq60h3MWysxNFg', {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Token': 'Bearer xgHdeVX8WWo9FPl7aQ54xqLaEesfj7V2J0HYkFi7E3MNfx8O_PulIw',
      }),
    }).subscribe(r => {
      console.log(r);
    }, e => {
      console.log('1: error', e);
    });
  }
}
