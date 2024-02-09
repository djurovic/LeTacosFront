import { Component, OnDestroy, OnInit, HostListener } from '@angular/core';
import { UserService } from "../../services/user.service";
import { Subscription } from "rxjs";
import { JwtResponse } from "../../response/JwtResponse";
import { Router } from "@angular/router";
import { Role } from "../../enum/Role";
import { CartService } from 'src/app/services/cart.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {


    currentUserSubscription: Subscription;
    name$;
    name: string;
    currentUser: JwtResponse;
    root = '/';
    Role = Role;
    cartItemCount: number = 0;
    cartValue: any = {};


    constructor(private userService: UserService,
        private router: Router,
        private cartService: CartService,
        private cookieService: CookieService
    ) {

    }


    ngOnInit() {
        this.cartService.getCart().subscribe(products => {
            this.cartItemCount = products.length;
          });
        

        this.name$ = this.userService.name$.subscribe(aName => this.name = aName);
        this.currentUserSubscription = this.userService.currentUser.subscribe(user => {
            this.currentUser = user;
            if (!user || user.role == Role.Customer) {
                this.root = '/';
            } else {
                this.root = '/seller';
            }
        });




        // Add an event listener for the 'storage' event to detect changes in localStorage


    }

    ngOnDestroy(): void {
        this.currentUserSubscription.unsubscribe();
        // this.name$.unsubscribe();
    }

    logout() {
        this.userService.logout();
        // this.router.navigate(['/login'], {queryParams: {logout: 'true'}} );
    }





}
