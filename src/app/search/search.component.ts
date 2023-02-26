import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchResult:undefined | product[];
  NoResult:boolean = false;
   constructor(private activeRoute:ActivatedRoute,private product:ProductService) {}
   ngOnInit(): void{
    let query = this.activeRoute.snapshot.paramMap.get('query');
    query && this.product.searchProducts(query).subscribe((result) =>{
       this.searchResult = result;
       if(result.length==0){
        this.NoResult = true;
       }
    })
   }
}
