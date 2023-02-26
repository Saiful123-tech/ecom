import { Component,OnInit } from '@angular/core';
import { cart, login, product, SignUp } from '../data-type';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {
  showLogin:boolean = true;
  authError:string = "";
 constructor(private user:UserService,private product:ProductService){}
 ngOnInit(): void {
   this.user.userAuthReload();
 }
  signUp(data:SignUp){
   this.user.userSignUp(data)
  }
  login(data:login){
    this.user.userLogin(data);
    this.user.invaliduserAuth.subscribe((result) =>{
      console.warn("apple",result)
      if(result){
        this.authError="Please Enter Valid User details"
      }
      else{
        this.localCartToRemoveCart()
      }
    })
  }
  openSignUp(){
  this.showLogin = false
  }
  openLogin(){
  this.showLogin = true;
  }
  localCartToRemoveCart(){
     let data=localStorage.getItem('localCart');
     let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
      console.warn(user)
      console.warn(userId)
     if(data){
      let cartDataList:product [] = JSON.parse(data)
      

      cartDataList.forEach((product:product,index) => {
        let cartData : cart = {
          ...product,
          productId:product.id,
          userId
        };
        delete cartData.id
       setTimeout(() => {
        this.product.addToCart(cartData).subscribe((result) =>{
          if(result){
            console.warn("Item stored in db");
          }
      })
    }, 500);
      if(cartDataList.length===index+1){
        localStorage.removeItem('localCart')
      }
       
      });
     }
     setTimeout(() => {
      this.product.getCartList(userId)
     }, 2000);
       
  }
 
}
