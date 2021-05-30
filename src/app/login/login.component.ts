import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = "Jewelry Login";
  loginForm: FormGroup;
  errorMessage: string;
  authSubs: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  onLogin() {

    const credential = this.loginForm.value;
    this.authSubs = this.authService.authenticate(credential.username, credential.password)
        .subscribe(result => {
          this.router.navigate(
            ['jewelry', credential.username], 
            {relativeTo: this.route});          
        },
        error => {
          this.errorMessage = `${error.status} ${error.statusText}`;
        });    
  }

  onCancel() {
    this.loginForm.reset();    
  }

  onCloseError() {
    this.errorMessage = null;    
  }

  ngOnDestroy() {
    if(this.authSubs) { 
       this.authSubs.unsubscribe();
    }
  }

}
