import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PluginDirective } from '../directives/plugin-directive';
import { PopUpComponent } from '../dynamic-component/pop-up.component';
import { AuthService } from '../services/auth.service';
import { JewelryService } from '../services/jewelry.service';
import { User } from '../services/user.model';
import { of } from 'rxjs';

import { JewelryComponent } from './jewelry.component';

const mockUser = new User("test", "PrivilegedUser", true);

describe('JewelryComponent', () => {
  let component: JewelryComponent;
  let fixture: ComponentFixture<JewelryComponent>;
  let initialForm = {price: null, weight: null, discount: 2};
  let filledForm = { price: 1000, weight: 25, discount: 2, totalPrice: 24500};
  let jewelryService: JewelryService;
  let authService: AuthService;
  let mockResponseBlob = new HttpResponse<Blob>();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JewelryComponent, PopUpComponent, PluginDirective ],
      imports: [RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { 
            params: of({
              user: 'test'
            })
          }
        } 
      ]
    })
    .compileComponents();

    jewelryService = TestBed.inject(JewelryService);
    authService = TestBed.inject(AuthService);    
  });

  beforeEach(() => {
    authService.userLoggedin.next(mockUser);

    fixture = TestBed.createComponent(JewelryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();    
  });

  it('should create jewelry component', () => {
    expect(component).toBeTruthy();
    expect(component.user).toEqual('test');
    expect(component.userType).toEqual(component.PrivilegedUser);
    expect(component.jewelryForm.value).toEqual(initialForm)
    expect(component.jewelryForm.getRawValue()).toEqual({...initialForm, totalPrice: null});
  });

  it('should calculate total price', ()=> {
    spyOn(jewelryService, 'calculateTotal').and.
          returnValue(of({totalPrice: 1000}));
    component.onCalculate();
    expect(component.jewelryForm.getRawValue().totalPrice).toEqual(1000);
  })

  it('should print to file', ()=> {
    spyOn(jewelryService, 'printToFile').and.
          returnValue(of(mockResponseBlob));
    expect(() => component.onPrintToFile()).toBeTruthy();
  })

  it('should log off', ()=> {
    component.onLogout();
    authService.userLoggedin.subscribe(res => {
      expect(res).toBeFalsy();
    });
  })

  it('should throw error on print to paper', () => {
    expect(() => component.onPrintPaper()).toThrowError('Method not implemented.');
  })

  it('should load component dynamically', () => {    
    expect(component.pluginHost.vcRef.length === 0).toBeTrue();
    component.jewelryForm.setValue(filledForm)
    component.onPopup();
    expect(component.onCloseSub.closed).toBeFalse();
    expect(component.pluginHost.vcRef.length === 1).toBeTrue();
    component.pluginHost.vcRef.detach();
    expect(component.pluginHost.vcRef.length === 0).toBeTrue();
  })

});
