import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthService } from './auth.service';

const mockResponse = {
  userType: 'PrivilegedUser',
  valid: true
}

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should authenticate', () => {
    service.authenticate('test', 'secret').subscribe(res => {
      expect(res.userType).toEqual('PrivilegedUser');
      expect(res.valid).toEqual(true);
      expect(service.userLoggedin).toBeTruthy();
    });

    const request = httpTestingController.expectOne('https://localhost:44368/auth');

    request.flush(mockResponse)

  })

  it('should logoff user', () => {
    service.userLoggedin.subscribe(user => {
      expect(user).toBeFalsy();
    })
    service.logOff();
  })
});
