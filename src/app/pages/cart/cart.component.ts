import {AfterContentChecked, Component, OnDestroy, OnInit, HostListener} from '@angular/core';
import {CartService} from '../../services/cart.service';
import {Subject, Subscription} from 'rxjs';
import {UserService} from '../../services/user.service';
import {JwtResponse} from '../../response/JwtResponse';
import {ProductInOrder} from '../../models/ProductInOrder';
import {debounceTime, switchMap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {Role} from '../../enum/Role';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy, AfterContentChecked {



    constructor(private cartService: CartService,
                private userService: UserService,
                private router: Router) {
        this.userSubscription = this.userService.currentUser.subscribe(user => this.currentUser = user);
    }

    isTableLayout: boolean = true;
    @HostListener('window:resize', ['$event'])
    onResize(event: Event): void {
    this.checkScreenWidth();
  }

    productInOrders = [];
    total = 0;
    currentUser: JwtResponse;
    userSubscription: Subscription;

    private updateTerms = new Subject<ProductInOrder>();
    sub: Subscription;

    static validateCount(productInOrder) {
        const max = productInOrder.productStock;
        if (productInOrder.count > max) {
            productInOrder.count = max;
        } else if (productInOrder.count < 1) {
            productInOrder.count = 1;
        }
    }
    
    ngOnInit() {
        this.checkScreenWidth();
        this.cartService.getCart().subscribe(prods => {
            this.productInOrders = prods;
            console.log(this.rowCount + ' ngOninit cart.component.ts');
            
        });
        this.sub = this.updateTerms.pipe(
            // wait 300ms after each keystroke before considering the term
            debounceTime(300),
            //
            // ignore new term if same as previous term
            // Same Object Reference, not working here
            //  distinctUntilChanged((p: ProductInOrder, q: ProductInOrder) => p.count === q.count),
            //
            // switch to new search observable each time the term changes
            switchMap((productInOrder: ProductInOrder) => this.cartService.update(productInOrder))
        ).subscribe(prod => {
                if (prod) { throw new Error(); }
            },
            _ => console.log('Update Item Failed'));

        
    }

    ngOnDestroy() {
        if (!this.currentUser) {
            this.cartService.storeLocalCart();
        }
        this.userSubscription.unsubscribe();
    }

    ngAfterContentChecked() {
        this.total = this.productInOrders.reduce(
            (prev, cur) => prev + cur.subTotal, 0);
        
        localStorage.setItem('cartItemCount', this.rowCount.toString());
    }

    addOne(productInOrder) {
        const subtotal = productInOrder.subTotal/productInOrder.count;
        if(productInOrder.count < 5) {
            productInOrder.count++;
        CartComponent.validateCount(productInOrder);
        localStorage.setItem('cartItemCount','addONe');
        if (this.currentUser) { this.updateTerms.next(productInOrder); }
        }
        
        
        productInOrder.subTotal=subtotal*productInOrder.count;
    }

    minusOne(productInOrder) {
        const subtotal = productInOrder.subTotal/productInOrder.count;
        productInOrder.count--;
        CartComponent.validateCount(productInOrder);
        if (this.currentUser) { this.updateTerms.next(productInOrder); }
        productInOrder.subTotal=subtotal*productInOrder.count;
    }

    onChange(productInOrder) {
        CartComponent.validateCount(productInOrder);
        if (this.currentUser) { this.updateTerms.next(productInOrder); }
        
    }


    remove(productInOrder: ProductInOrder) {
        this.cartService.remove(productInOrder).subscribe(
            success => {
               this.productInOrders = this.productInOrders.filter(e => e.productId !== productInOrder.productId);
                console.log('Cart: ' + this.productInOrders);
            },
            _ => console.log('Remove Cart Failed'));
    }

    checkout() {
        /* if (!this.currentUser) {
            this.router.navigate(['/login'], {queryParams: {returnUrl: this.router.url}});
        } else if (this.currentUser.role !== Role.Customer) {
            this.router.navigate(['/seller']);
        } else {
            this.cartService.checkout().subscribe(
                _ => {
                    this.productInOrders = [];
                    
                },
                error1 => {
                    console.log('Checkout Cart Failed');
                });
            this.router.navigate(['/thankYou']);
        }
 */     this.router.navigate(['/check-out']);
    }

    get rowCount(): number {
        return this.productInOrders.length;
    }

    private checkScreenWidth(): void {
        // Adjust the breakpoint based on your design needs
        this.isTableLayout = window.innerWidth >= 768;
      }

    

    
    
    
    
    
}

