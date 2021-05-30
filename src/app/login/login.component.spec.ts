import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

import { LoginComponent } from './login.component';
import { FormControl, FormGroup } from '@angular/forms';
import { JewelryComponent } from '../jewelry/jewelry.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([
        {path:'jewelry/:user', component: JewelryComponent}
      ]), HttpClientTestingModule],
      declarations: [ LoginComponent ],
      providers: [ AuthService ]
    })
    .compileComponents();
    authService = TestBed.inject(AuthService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a component', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Jewelry Login'`, () => {
    expect(component.title).toEqual('Jewelry Login');
  });

  it('should create form of login page', () => {
    expect(component.loginForm).toBeTruthy();
    expect(component.loginForm.valid).not.toBeTruthy();
    expect(component.loginForm.value).toEqual({username: null, password: null});
  })

  it('should set errorMessage as null onCloseError', () => {
    component.errorMessage = "Some error occured!";
    component.onCloseError();
    expect(component.errorMessage).toBe(null);
  })

  it('should reset form on click onCancel', () => {
    component.loginForm = new FormGroup({
      username : new FormControl('some'),
      password : new FormControl('secret')
    });

    component.onCancel();

    expect(component.loginForm.value).toEqual({username: null, password: null});
  })

  it('should fail with unauthorized while login', ()=> {
    spyOn(authService, 'authenticate').and.
          returnValue(throwError({status: 401, statusText: 'UnAuthorized'}));
    component.onLogin();
    expect(component.errorMessage).toEqual('401 UnAuthorized');
  })

  it('should login successfully', ()=> {
    component.loginForm = new FormGroup({
      username : new FormControl('some'),
      password : new FormControl('secret')
    });
    spyOn(authService, 'authenticate').and.
          returnValue(of({userType: 'PrivilegedUser', valid: true}));
    component.onLogin();
    expect(component.errorMessage).toBeUndefined();
  })
});
