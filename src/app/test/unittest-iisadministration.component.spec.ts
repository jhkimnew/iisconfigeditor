import { IISAdministrationComponent } from './unittest-iisadministration.component';
import { IISAdministrationApiService } from './unittest-iisadministration.service';

import { Observable } from 'rxjs';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';

describe('TodoFormComponent', () => {
  let component: IISAdministrationComponent;
  let service: IISAdministrationApiService;

  beforeEach(() => {
    service = new IISAdministrationApiService(null); // set null for http
    component = new IISAdministrationComponent(service);
  });

  it('should set the result property with the items returned from the server', () => {
    const result = [ 1, 2, 3 ];

    spyOn(service, 'createToken').and.callFake(() => {
      return Observable.from([ result ]);
    });

    component.createToken();
    expect(component.result.indexOf(result)).toBeGreaterThan(-1);
  });
});
