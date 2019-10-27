import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
declare var $: any;

@Component({
   selector: 'embryo-ProductGrid',
   templateUrl: './ProductGrid.component.html',
   styleUrls: ['./ProductGrid.component.scss']
})
export class ProductGridComponent implements OnInit {
   url = 'http://young-scrubland-57448.herokuapp.com';
   @Input() allImages: any;
   @Input() products: any;

   @Input() currency: string;

   @Input() gridLength: any;

   @Input() gridThree = false;

   @Output() addToCart: EventEmitter<any> = new EventEmitter();

   @Output() addToWishList: EventEmitter<any> = new EventEmitter();

   loaded = false;
   lg = 25;
   xl = 25;

   trackByObjectID(index, hit) {
      return hit.objectID;
   }

   constructor() { }

   ngOnInit() {

      if (this.gridThree) {
         this.lg = 33;
         this.xl = 33;
      }
   }

   public addToCartProduct(value: any) {
      this.addToCart.emit(value);
   }

   public onLoad() {
      this.loaded = true;
   }

   public productAddToWishlist(value: any, parentClass) {
      if (!($('.' + parentClass).hasClass('wishlist-active'))) {
         $('.' + parentClass).addClass('wishlist-active');
      }
      this.addToWishList.emit(value);
   }

   public checkCartAlready(singleProduct) {
      const products = JSON.parse(localStorage.getItem('cart_item')) || [];
      if (!products.some((item) => item.name === singleProduct.name)) {
         return true;
      }
   }

   getImageLink(product) {
      const id = product.id;
      let link = '';
      if (id) {
         this.allImages.find(image => {
            if (image.attributes.viewable_id === +id) {
               link = image.attributes.styles[2].url;
            }
         });
      }
      return this.url + link;

   }

}
