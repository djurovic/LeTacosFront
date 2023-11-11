import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {OrderService} from "../../services/order.service";
import {Order} from "../../models/Order";
import {OrderStatus} from "../../enum/OrderStatus";
import {UserService} from "../../services/user.service";
import {JwtResponse} from "../../response/JwtResponse";
import {Subscription, interval} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {Role} from "../../enum/Role";

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit, OnDestroy {

    page: any;
    OrderStatus = OrderStatus;
    currentUser: JwtResponse;
    Role = Role;
    constructor(private httpClient: HttpClient,
                private orderService: OrderService,
                private userService: UserService,
                private route: ActivatedRoute
    ) {
    }

    querySub: Subscription;
    refreshSubscription: Subscription;

    ngOnInit() {
        this.currentUser = this.userService.currentUserValue;
        this.querySub = this.route.queryParams.subscribe(() => {
            this.update();
        });
        this.startRefreshing();

    }

    startRefreshing() {
        this.refreshSubscription = interval(3000).subscribe(() => {
            this.refreshTableData();
        });
    }

    update() {
        let nextPage = 1;
        let size = 10;
        if (this.route.snapshot.queryParamMap.get('page')) {
            nextPage = +this.route.snapshot.queryParamMap.get('page');
            size = +this.route.snapshot.queryParamMap.get('size');
        }
        this.orderService.getPage(nextPage, size).subscribe(page => this.page = page, _ => {
            console.log("Get Orde Failed")
        });
    }


    cancel(order: Order) {
        console.log(order.orderId + "order id order component");
        this.orderService.cancel(order.orderId).subscribe(res => {
            if (res) {
                order.orderStatus = res.orderStatus;
            }
        });
    }

    finish(order: Order) {
        this.orderService.finish(order.orderId, "string").subscribe(res => {
            if (res) {
                order.orderStatus = res.orderStatus;
            }
        })
    }
    refreshPage() {
        location.reload();
    }

    ngOnDestroy(): void {
        this.querySub.unsubscribe();
        if (this.refreshSubscription) {
            this.refreshSubscription.unsubscribe();
          }
    }
    refreshTableData() {
        this.update(); // Fetch updated data and update the table
    }

}