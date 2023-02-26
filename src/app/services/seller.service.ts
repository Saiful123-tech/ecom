import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { login,SignUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIN = new BehaviorSubject<boolean>(false)
  isLoginError = new EventEmitter<boolean>(false)
  constructor(private http: HttpClient, private router: Router) { }
  userSignUp(data: SignUp) {
    this.http.post('http://localhost:3000/seller', data, { observe: 'response' })
      .subscribe((result) => {
        this.isSellerLoggedIN.next(true);
        localStorage.setItem('seller', JSON.stringify(result.body));
        this.router.navigate(['seller-home']);
      });
  }
  roadloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIN.next(true);
      this.router.navigate(['seller-home']);
    }
  }
  userLogin(data: login){
     console.warn(data);
     // api call code will be there
     this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
     {observe:'response'}
     ).subscribe((result:any) =>{
        console.warn(result);
        if(result && result.body && result.body.length===1){
          console.warn("user Loged in")
          localStorage.setItem('seller', JSON.stringify(result.body));
          this.router.navigate(['seller-home']);
        }
        else{
          console.warn("login failed")
          this.isLoginError.emit(true);
        }
     });
  }

}
