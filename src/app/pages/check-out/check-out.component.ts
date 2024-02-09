import { Component, OnInit, HostListener } from '@angular/core';
import { PorudzbinaService } from 'src/app/services/porudzbina.service';
import { Porudzbina } from 'src/app/models/Porudzbina';
import { ProductInOrder } from 'src/app/models/ProductInOrder';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  porudzbina: Porudzbina = new Porudzbina();
  checkoutForm: FormGroup;
  constructor(private porudzbinaService: PorudzbinaService, private router: Router, private cookieService: CookieService, private formBuilder: FormBuilder) { }

  mobileLayout: boolean = true;
    @HostListener('window:resize', ['$event'])
    onResize(event: Event): void {
    this.checkScreenWidth();
  }

  ukupno: number;

  ngOnInit() {
    this.checkScreenWidth();
    const productInOrderString = this.cookieService.get('cart');
    const isCartEmpty = productInOrderString === '{}' || productInOrderString === null || productInOrderString === undefined;
    if (isCartEmpty) {
      console.log('The cart is empty.');
    } else {
      console.log('The cart is not empty.');
    }
    
    if(productInOrderString.length === 0 || isCartEmpty) {
      this.router.navigate(['/product']);
    }
    console.log('Original productInOrderString:', JSON.parse(productInOrderString));

    const transform =  this.transformProduct(JSON.parse(productInOrderString));

    console.log('Transoformisan: ', transform);
    
    this.porudzbina.proizvodi = transform;
    this.checkUkupno();
    this.checkoutForm = this.formBuilder.group({
      kupacIme: [this.porudzbina.kupacIme, Validators.required],
      kupacPrezime: [this.porudzbina.kupacPrezime, Validators.required],
      kupacUlica: [this.porudzbina.kupacUlica, Validators.required],
      kupacBroj: [this.porudzbina.kupacBroj, Validators.required],
      kupacTelefon: [this.porudzbina.kupacTelefon, Validators.required],
      kupacEmail: [this.porudzbina.kupacEmail, [Validators.required, Validators.email]],
      kupacInterfon: [''],
      kupacBrojStana: [''],
      kupacSprat: [''],
      posebanZahtev: ['']
    });
    console.log('Form controls:', this.checkoutForm.controls);
    this.porudzbina.orderAmount=this.ukupno;
  }

  onSubmit() {
    // Convert the object to a JSON string and log it
    const porudzbinaJson = JSON.stringify(this.porudzbina);
    console.log('Submitting Porudzbina:', this.porudzbina);
    // Call your service method to send the data to the backend
    if (this.checkoutForm.valid) {
      
      this.porudzbinaService.createPorudzbina(this.porudzbina).subscribe(
        (response) => {
  
          console.log('Order placed successfully:', response);
          // Add any additional handling or navigation logic here
          this.router.navigate(['/thankYou']);
          this.cookieService.delete('cart');
        },
        (error) => {
          console.error('Error placing order:', error);
          // Handle errors as needed
        }
      );
    }
    
  }

  

  transformProduct(productObject: any): ProductInOrder[] {
    const transformedProducts: ProductInOrder[] = [];
  
    Object.keys(productObject).forEach(key => {
      const product = productObject[key];
  
      const transformedProduct: ProductInOrder = {
        productId: product.productId,
      productName: product.productName,
      productPrice: product.productPrice,
      productIcon: product.productIcon,
      categoryType: product.categoryType,
      count: product.count,
      kecap: product.kecap,
      majonez: product.majonez,
      sahara: product.sahara,
      seville: product.seville,
      texasBbq: product.texasBbq,
      ninjaBlend: product.ninjaBlend,
      kari: product.kari,
      siracha: product.siracha,
      tostSir: product.tostSir,
      cedar: product.cedar,
      zdenka: product.zdenka,
      gorgonzola: product.gorgonzola,
      slanina: product.slanina,
      jalapeno: product.jalapeno,
      hrskaviLuk: product.hrskaviLuk,
      guacamole: product.guacamole,
      mariniranaPiletina: product.mariniranaPiletina,
      mlevenaJunetina: product.mlevenaJunetina,
      rostiljKobasica: product.rostiljKobasica,
      chickenNugets: product.chickenNugets,
      cordonBleu: product.cordonBleu,
      falafel: product.falafel,
      besplatniSos: product.besplatniSos,
      gauda: product.gauda,
      sampinjoni: product.sampinjoni,
      barbecue: product.barbecue,
      posebanZahtev: product.posebanZahtev,
      subTotal: product.subTotal
      };
  
      transformedProducts.push(transformedProduct);
    });
  
    return transformedProducts;
  }

  private checkScreenWidth(): void {
    // Adjust the breakpoint based on your design needs
    this.mobileLayout = window.innerWidth >= 768;
  }

  private checkUkupno() {
    if (this.porudzbina.proizvodi) {
      // Use reduce to sum up the subTotal values
      this.ukupno = this.porudzbina.proizvodi.reduce((total, product) => total + product.subTotal, 0);
    } else {
      // If proizvodi array is not defined or empty, set ukupno to 0
      this.ukupno = 0;
    }
  }
  



}
