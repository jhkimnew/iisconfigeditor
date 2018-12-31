import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

export class IISAdministrationApiService {
  private url = 'https://localhost:55539';
  constructor(private http: Http) {
  }

  private requestToCreateToken = {
    'api_key': {
      'purpose': 'iisconfigeditor',
      'id': 'XdGcGBmQjIPLGUMHOioCNQ',
      'created_on': '2018-12-30T05:16:31.352428Z',
      'last_modified': '2018-12-30T05:59:19.1485126Z',
      'expires_on': ''
    }
  };

  createToken() {
    return this.http.post(this.url + '/security/access-tokens', this.requestToCreateToken).map(r => r.json());
  }

  getTodos() {
    return this.http.get(this.url).map(r => r.json());
  }

  delete(id) {
    return this.http.delete(this.url).map(r => r.json());
  }
}
