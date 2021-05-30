import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing"
import { ActivatedRouteSnapshot, Router } from "@angular/router";
import { AuthGuard } from "./auth-guard.service"
import { AuthService } from "./auth.service";
import { User } from "./user.model";
import { BehaviorSubject, of } from 'rxjs';

describe('AuthGuard', () => {
    let authGuard: AuthGuard;
    let authService: AuthService;
    let router = {
        navigate: jasmine.createSpy('navigate')
    };

    beforeEach( async () => {
        await TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [
                AuthGuard,
                AuthService,
                { provide: Router, useValue: router}
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        authGuard = TestBed.inject(AuthGuard);
        authService = TestBed.inject(AuthService);
    })

    it('should be activated for valid user', () => {         
        authService.userLoggedin = new BehaviorSubject(new User('test', 'NormalUser', false));     
        const response = authGuard.canActivate(null, null);
        expect(response).toBeTruthy();
    })
})