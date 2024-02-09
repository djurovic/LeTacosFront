import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CartService} from '../../services/cart.service';
import {CookieService} from 'ngx-cookie-service';
import {ProductInOrder} from '../../models/ProductInOrder';
import {ProductInfo} from '../../models/productInfo';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  title: string;
  count: number;
  kecap:boolean = false;
  majonez:boolean = false;
  sahara:boolean = false;
  seville:boolean = false;
  texasBbq:boolean = false;
  ninjaBlend:boolean = false;
  kari:boolean = false;
  siracha:boolean = false;
  tostSir:boolean = false;
  cedar:boolean = false;
  zdenka:boolean = false;
  gorgonzola:boolean = false;
  slanina:boolean = false;
  jalapeno:boolean = false;
  hrskaviLuk:boolean = false;
  guacamole:boolean = false;
  mariniranaPiletina:number =0;
  mlevenaJunetina:number =0;
  rostiljKobasica:number ;
  chickenNugets:number ;
  cordonBleu:number ;
  falafel:number;
  besplatniSos:string;
  gauda:boolean=false;
  sampinjoni:boolean=false;
  barbecue:boolean=false;
  posebanZahtev:string;
  productInfo: ProductInfo;
  subTotal: number;
  maxSum:number=2;


  

  constructor(
      private productService: ProductService,
      private cartService: CartService,
      private cookieService: CookieService,
      private route: ActivatedRoute,
      private router: Router
  ) {
  }

  ngOnInit() {
    this.getProduct();
    this.title = 'Product Detail';
    this.count = 1;
    this.kecap = false;
    this.mlevenaJunetina=0;
    this.mariniranaPiletina=0;
    this.rostiljKobasica=0;
    this.chickenNugets=0;
    this.cordonBleu=0;
    this.falafel=0;
    this.subTotal=0;
  }


  getProduct(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.productService.getDetail(id).subscribe(
        prod => {
          this.productInfo = prod;
        },
        _ => console.log('Get Cart Failed')
    );
  }

  addToCart() {
    this.calculateSubtotal();
    console.log(this.subTotal);
    
    this.cartService
        .addItem(new ProductInOrder(this.productInfo, this.count, this.kecap, this.majonez,this.sahara,this.seville,
          this.texasBbq,this.ninjaBlend,this.kari,this.siracha,
           this.tostSir, this.cedar,this.zdenka,this.gorgonzola, 
           this.slanina, this.jalapeno,this.hrskaviLuk,this.guacamole,
           this.mariniranaPiletina,this.mlevenaJunetina,this.rostiljKobasica,
           this.chickenNugets,this.cordonBleu,this.falafel,this.besplatniSos,this.gauda,this.sampinjoni,this.barbecue,this.posebanZahtev, this.subTotal))
        .subscribe(
            res => {
              if (!res) {
                console.log('Add Cart failed' + res);
                throw new Error();
              }
              this.router.navigateByUrl('/cart');
            },
            _ => console.log('Add Cart Failed')
        );
        //console.log(new ProductInOrder(this.productInfo, this.count, this.kecap, this.tostSir, this.subTotal));
  }

  validateCount() {
    console.log('Validate');
    const max = 30;
    if (this.count > max) {
      this.count = max;
    } else if (this.count < 1) {
      this.count = 1;
    }
  }
  updateSumMesa() {
    const totalSum = this.mariniranaPiletina+this.mlevenaJunetina;
    console.log("Suma mesa " + totalSum);
  }

  calculateSubtotal(): number {
    //let subtotal2 = this.count * this.productInfo.productPrice;
    let subtotal2=this.productInfo.productPrice;
    //Extra dodaci
    if (this.tostSir == true) {
      subtotal2 += 80;
    }
    if (this.cedar == true) {
      subtotal2 += 80;
    }
    if(this.gauda == true) {
      subtotal2 += 80;
    }
    if (this.zdenka == true) {
      subtotal2 += 80;
    }
    if (this.gorgonzola == true) {
      subtotal2 += 80;
    }
    if (this.slanina == true) {
      subtotal2 += 80;
    }
    if (this.jalapeno == true) {
      subtotal2 += 80;
    }
    if(this.sampinjoni == true) {
      subtotal2 += 80;
    }
    if (this.hrskaviLuk == true) {
      subtotal2 += 80;
    }
    if (this.guacamole == true) {
      subtotal2 += 80;
    }

    //Extra sosevi
    if(this.kecap == true) {
      subtotal2 += 80;
    }
    if(this.majonez == true) {
      subtotal2 += 80;
    }
    if(this.sahara == true) {
      subtotal2 += 80;
    }
    if(this.seville == true) {
      subtotal2 += 80;
    }
    if(this.texasBbq == true) {
      subtotal2 += 80;
    }
    if(this.ninjaBlend == true) {
      subtotal2 += 80;
    }
    if(this.kari == true) {
      subtotal2 += 80;
    }
    if(this.siracha == true) {
      subtotal2 += 80;
    }
    if(this.barbecue == true) {
      subtotal2 += 80;
    }
    this.subTotal = subtotal2 *this.count;
    //console.log(subtotal + "calculate subtotal");
    return this.subTotal;
  }

  checkMeat() {
    if(this.productInfo.categoryType == 0) {
      if(this.productInfo.productId=="T0001") {
        if(this.chickenNugets+this.mlevenaJunetina+this.mariniranaPiletina+this.cordonBleu+this.falafel+this.rostiljKobasica <1)
        return true;
      }
      if(this.productInfo.productId=="T0002") {
        if(this.chickenNugets+this.mlevenaJunetina+this.mariniranaPiletina+this.cordonBleu+this.falafel+this.rostiljKobasica <2)
        return true;
      }
      if(this.productInfo.productId=="T0003") {
        if(this.chickenNugets+this.mlevenaJunetina+this.mariniranaPiletina+this.cordonBleu+this.falafel+this.rostiljKobasica <3)
        return true;
      }
    }
  }


  incrementCount() {
    if (this.count < 99) { // Max value is 99
      this.count++;
    }    
  }
  decrementCount() {
    if(this.count>1) {
      this.count--;
    }
  }
  decrementPiletina() {
    if(this.mariniranaPiletina>0) {
      this.mariniranaPiletina--;
    }
  }

  decrementJunetina() {
    if(this.mlevenaJunetina>0) {
      this.mlevenaJunetina--;
    }
  }

  decrementKobasica() {
    if(this.rostiljKobasica>0) {
      this.rostiljKobasica--;
    }
  }

  decrementNuggets() {
    if(this.chickenNugets>0) {
      this.chickenNugets--;
    }
  }

  decrementCordon() {
    if(this.cordonBleu>0) {
      this.cordonBleu--;
    }
  }

  decrementFalafel() {
    if(this.falafel>0) {
      this.falafel--;
    }
  }

  //Inkrementi

  incrementPiletina() {
    if(this.productInfo.productId=="T0001") {
        if(this.mariniranaPiletina+this.mlevenaJunetina+this.rostiljKobasica+this.chickenNugets+this.cordonBleu+this.falafel<1) {
          this.mariniranaPiletina++;
        }
    }
    if(this.productInfo.productId=="T0002") {
      if(this.mariniranaPiletina+this.mlevenaJunetina+this.rostiljKobasica+this.chickenNugets+this.cordonBleu+this.falafel<2) {
        this.mariniranaPiletina++;
      }
    }
    if(this.productInfo.productId=="T0003") {
      if(this.mariniranaPiletina+this.mlevenaJunetina+this.rostiljKobasica+this.chickenNugets+this.cordonBleu+this.falafel<3) {
        this.mariniranaPiletina++;
      }
    }
    
  }

  incrementJunetina() {
    if(this.productInfo.productId=="T0001") {
      if(this.mariniranaPiletina+this.mlevenaJunetina+this.rostiljKobasica+this.chickenNugets+this.cordonBleu+this.falafel<1) {
        this.mlevenaJunetina++;
      }
    }
    if(this.productInfo.productId=="T0002") {
      if(this.mariniranaPiletina+this.mlevenaJunetina+this.rostiljKobasica+this.chickenNugets+this.cordonBleu+this.falafel<2) {
        this.mlevenaJunetina++;
      }
    }
    if(this.productInfo.productId=="T0003") {
      if(this.mariniranaPiletina+this.mlevenaJunetina+this.rostiljKobasica+this.chickenNugets+this.cordonBleu+this.falafel<3) {
        this.mlevenaJunetina++;
      }
    }
  }

  incrementKobasica() {
    if(this.productInfo.productId=="T0001") {
      if(this.mariniranaPiletina+this.mlevenaJunetina+this.rostiljKobasica+this.chickenNugets+this.cordonBleu+this.falafel<1) {
        this.rostiljKobasica++;
      }
    }
    if(this.productInfo.productId=="T0002") {
      if(this.mariniranaPiletina+this.mlevenaJunetina+this.rostiljKobasica+this.chickenNugets+this.cordonBleu+this.falafel<2) {
        this.rostiljKobasica++;
      }
    }
    if(this.productInfo.productId=="T0003") {
      if(this.mariniranaPiletina+this.mlevenaJunetina+this.rostiljKobasica+this.chickenNugets+this.cordonBleu+this.falafel<3) {
        this.rostiljKobasica++;
      }
    }
  }

  incrementNuggets() {
    if(this.productInfo.productId=="T0001") {
      if(this.mariniranaPiletina+this.mlevenaJunetina+this.rostiljKobasica+this.chickenNugets+this.cordonBleu+this.falafel<1) {
        this.chickenNugets++;
      }
    }
    if(this.productInfo.productId=="T0002") {
      if(this.mariniranaPiletina+this.mlevenaJunetina+this.rostiljKobasica+this.chickenNugets+this.cordonBleu+this.falafel<2) {
        this.chickenNugets++;
      }
    }
    if(this.productInfo.productId=="T0003") {
      if(this.mariniranaPiletina+this.mlevenaJunetina+this.rostiljKobasica+this.chickenNugets+this.cordonBleu+this.falafel<3) {
        this.chickenNugets++;
      }
    }
  }

  incrementCordon() {
    if(this.productInfo.productId=="T0001") {
      if(this.mariniranaPiletina+this.mlevenaJunetina+this.rostiljKobasica+this.chickenNugets+this.cordonBleu+this.falafel<1) {
        this.cordonBleu++;
      }
    }
    if(this.productInfo.productId=="T0002") {
      if(this.mariniranaPiletina+this.mlevenaJunetina+this.rostiljKobasica+this.chickenNugets+this.cordonBleu+this.falafel<2) {
        this.cordonBleu++;
      }
    }
    if(this.productInfo.productId=="T0003") {
      if(this.mariniranaPiletina+this.mlevenaJunetina+this.rostiljKobasica+this.chickenNugets+this.cordonBleu+this.falafel<3) {
        this.cordonBleu++;
      }
    }
  }

  incrementFalafel() {
    if(this.productInfo.productId=="T0001") {
      if(this.mariniranaPiletina+this.mlevenaJunetina+this.rostiljKobasica+this.chickenNugets+this.cordonBleu+this.falafel<1) {
        this.falafel++;
      }
    }
    if(this.productInfo.productId=="T0002") {
      if(this.mariniranaPiletina+this.mlevenaJunetina+this.rostiljKobasica+this.chickenNugets+this.cordonBleu+this.falafel<2) {
        this.falafel++;
      }
    }
    if(this.productInfo.productId=="T0003") {
      if(this.mariniranaPiletina+this.mlevenaJunetina+this.rostiljKobasica+this.chickenNugets+this.cordonBleu+this.falafel<3) {
        this.falafel++;
      }
    }
  }

  
}
