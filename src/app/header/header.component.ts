import { Component } from '@angular/core';
import { Router} from '@angular/router'
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menuType: string = 'default';
  sellerName: string = "";
  userName: string = "";
  searchResult: undefined | product[];
  cartItems = 0;
constructor(private Route:Router,private product:ProductService){
}
ngOnInit():void{
  this.Route.events.subscribe((val:any) =>{
      if(val.url){
        console.warn(val);
      if(localStorage.getItem('seller') && val.url.includes('seller')){
        console.warn('in Seller Area')
          let sellerStore=localStorage.getItem('seller');
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName = sellerData.name;
          this.menuType='seller'
        }
      //  this.sellerName =  localStorage.getItem('seller':"name")
      else if(localStorage.getItem('user')){
        let userStore=localStorage.getItem('user');
        let userData = userStore && JSON.parse(userStore);
        this.userName = userData.name;
        this.menuType = 'user';
        this.product.getCartList(userData.id)
      }
      else{
        this.menuType='default'
      } 
    }
  })
  let cartData = localStorage.getItem('localCart');
  if(cartData){
    this.cartItems = JSON.parse(cartData).length;
  }
  this.product.cartData.subscribe((items) =>{
    this.cartItems = items.length;
  })
}
logout(){
  localStorage.removeItem('seller');
  this.Route.navigate(['/'])
  this.product.cartData.emit([]);

}
userLogout(){
  localStorage.removeItem('user');
  this.Route.navigate(['/user-auth'])
}
searchProduct(query:KeyboardEvent){
  if(query){
    const element = query.target as HTMLInputElement;
    this.product.searchProducts(element.value).subscribe((data) =>{
      console.warn(data);
      if(data.length>5){
      data.length = 5
      }
      this.searchResult = data;
    })
  }
}
hideSearch(){
  this.searchResult = undefined
}
redirectToDetails(id:number){
  this.Route.navigate(['/details/'+id])
}
submitSearch(val:string){
 this.Route.navigate([`search/${val}`])
}
}
