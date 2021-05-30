import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators'; 
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrl = 'https://localhost:44368/auth';

  userLoggedin = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) { }

  authenticate(username: string, password: string) : Observable<any> {

    const authToken = btoa(`${username}:${password}`);
    return this.http.get(this.authUrl,  {
      headers : {
        "Authorization": `Basic ${authToken}`
      }
    }).pipe(tap(res => {
      this.userLoggedin.next(new User(username, res.userType, res.valid));
    }));
  }

  logOff(){
    this.userLoggedin.next(null);
  }


}
