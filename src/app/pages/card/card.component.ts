import {Component, OnDestroy, ElementRef, OnInit} from '@angular/core';
// import {prod, products} from '../shared/mockData';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit, OnDestroy {


  title: string;
  page: any;
  private paramSub: Subscription;
  private querySub: Subscription;
  tako: any[] = [];
  fingerFood: any[] =[];
  pice: any[] = []; 


  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private elementRef: ElementRef) {

  }


  ngOnInit() {
    this.querySub = this.route.queryParams.subscribe(() => {
      this.update();
    });
    this.paramSub = this.route.params.subscribe(() => {
      this.update();
    });
    
  }

  ngOnDestroy(): void {
    this.querySub.unsubscribe();
    this.paramSub.unsubscribe();
  }

  
  update() {
    if (this.route.snapshot.queryParamMap.get('page')) {
      const currentPage = +this.route.snapshot.queryParamMap.get('page');
      const size = +this.route.snapshot.queryParamMap.get('size');
      this.getProds(currentPage, size);
    } else {
      this.getProds();
    }
  }
  getProds(page: number = 1, size: number = 999) {
    if (this.route.snapshot.url.length == 1) {
      this.productService.getAllInPage(+page, +size)
        .subscribe(page => {
          this.page = page;
          this.title = 'Get Whatever You Want!';
          this.takosi();
          this.fingerFoods();
          this.drinks();
        });
    } else { //  /category/:id
      const type = this.route.snapshot.url[1].path;
      this.productService.getCategoryInPage(+type, page, size)
        .subscribe(categoryPage => {
          this.title = categoryPage.category;
          this.page = categoryPage.page;
        });
    }

  }

  scrollToSection() {
    // Scroll to the target section smoothly
    const targetElement = this.elementRef.nativeElement.querySelector('#order-section');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  takosi() {
    if (this.page) {
      this.tako = this.page.content.filter(productInfo => productInfo.categoryType === 0);
    }
  }
  
  fingerFoods() {
    if (this.page) {
      this.fingerFood = this.page.content.filter(productInfo => productInfo.categoryType === 1);
    }
  }
  drinks() {
    if(this.page) {
      this.pice = this.page.content.filter(productInfo => productInfo.categoryType === 2);
    }
  }
  


}
