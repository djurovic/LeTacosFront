import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductInfo } from 'src/app/models/productInfo';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  product = new ProductInfo();

  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  productId: string;

  ngOnInit() {


  }

  

  onSubmit() {
    if (this.product) {
      console.log(this.product + "FInal");      
      this.add();
    } 
  }

  add() {
    this.productService.create(this.product).subscribe(prod => {
      if (!prod) throw new Error;
      this.router.navigate(['/']);
    },
      e => {
      });
  }

  ngAfterContentChecked(): void {
    //console.log(this.product);
  }

}
