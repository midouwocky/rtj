import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EmbryoService } from '../../../services/Embryo.service';
import { ProductsService } from 'src/app/Services/products.service';

@Component({
   selector: 'app-DetailPage',
   templateUrl: './DetailPage.component.html',
   styleUrls: ['./DetailPage.component.scss']
})
export class DetailPageComponent implements OnInit {

   id: any;
   type: any;
   apiResponse: any;
   singleProductData: any;
   productsList: any;
   singleProductImage: any;

   constructor(private route: ActivatedRoute,
      private router: Router,
      public embryoService: EmbryoService,
      private productsService: ProductsService) {

   }

   ngOnInit() {
      this.route.params.subscribe(res => {
         this.id = res.id;
         this.type = res.type;
         this.getData();
      });
   }

   public getData() {

      this.productsService.getProduct(this.id)
         .subscribe((res: any) => {
            this.singleProductData = res.data;
            this.singleProductImage = res.included;
         }, error => {
         });
   }



   public checkResponse(response) {
      this.productsList = null;
      this.productsList = response[this.type];
      for (const data of this.productsList) {
         if (data.id === this.id) {
            this.singleProductData = data;
            break;
         }
      }
   }

   public addToCart(value) {
      this.embryoService.addToCart(value);
   }

   public addToWishList(value) {
      this.embryoService.addToWishlist(value);
   }

}
