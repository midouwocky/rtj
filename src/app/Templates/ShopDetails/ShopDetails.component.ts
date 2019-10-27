import { Component, OnInit, Input, OnChanges, Renderer2, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
declare var $: any;

import { EmbryoService } from '../../services/Embryo.service';

@Component({
   selector: 'embryo-ShopDetails',
   templateUrl: './ShopDetails.component.html',
   styleUrls: ['./ShopDetails.component.scss']
})
export class ShopDetailsComponent implements OnInit, OnChanges {

   @Input() detailData: any;
   @Input() imageData: any;
   @Input() currency: string;
   url = 'http://young-scrubland-57448.herokuapp.com';
   mainImgPath: string;
   totalPrice: any;
   type: any;
   colorsArray: string[] = ["Red", "Blue", "Yellow", "Green"];
   sizeArray: number[] = [36, 38, 40, 42, 44, 46, 48];
   quantityArray: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
   productReviews: any;

   constructor(private route: ActivatedRoute,
      private router: Router,
      public embryoService: EmbryoService
   ) {
      this.embryoService.getProductReviews().valueChanges().subscribe(res => { this.productReviews = res });
   }

   ngOnInit() {
      this.mainImgPath = this.url + this.imageData[0].attributes.styles[3].url;
      this.totalPrice = this.detailData.attributes.price;

      // this.route.params.subscribe(res => {
      //    this.type = null;
      //    this.type = res.type;
      // });
   }

   ngOnChanges() {
      this.mainImgPath = null;
      this.totalPrice = null;
      this.mainImgPath = this.detailData.image;
      this.totalPrice = this.detailData.price;
   }

   /**
    * getImagePath is used to change the image path on click event.ab
    */
   public getImagePath(imgPath: any, index: number) {
      $('.p-link').removeClass('border-active');
      this.mainImgPath = this.url + imgPath.attributes.styles[3].url;
      $('#' + index + 'img.id').addClass('border-active');
   }

   public calculatePrice(detailData: any, value: any) {
      detailData.quantity = value;
      this.totalPrice = detailData.price * value;
   }

   public reviewPopup(detailData) {
      let reviews: any = null;
      for (let review of this.productReviews) {
         // if((review.id == detailData.id) && (review.type == detailData.type) && (review.category == detailData.category)){
         //    singleProduct = review;
         //    break;
         // }

         reviews = review.user_rating;
      }

      this.embryoService.reviewPopup(detailData, reviews);
   }

   public addToWishlist(value: any) {
      this.embryoService.addToWishlist(value);
   }

   public addToCart(value: any) {
      this.embryoService.addToCart(value);
   }

   public buyNow(value: any) {
      this.embryoService.buyNow(value);
      this.router.navigate(['/checkout']);
   }

}
