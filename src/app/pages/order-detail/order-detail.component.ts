import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {OrderService} from "../../services/order.service";
import {Order} from "../../models/Order";
import {ActivatedRoute} from "@angular/router";
import { OrderStatus } from 'src/app/enum/OrderStatus';

@Component({
    selector: 'app-order-detail',
    templateUrl: './order-detail.component.html',
    styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

    constructor(private orderService: OrderService,
                private route: ActivatedRoute) {
    }

    order$: Observable<Order>;
    OrderStatus = OrderStatus;
    orderStatus: string;
    vreme: string;


    ngOnInit() {        
        this.order$ = this.orderService.show(this.route.snapshot.paramMap.get('id'));
    }
    
    
    cancel(order: Observable<Order>) {        
        
        order.subscribe((order: Order) => {
            // Access the ID from the order object
            const orderId = order.orderId; // Replace 'ID' with the actual property name
            
            
            this.orderService.cancel(orderId).subscribe((res: Order) => {
                if(res) {
                    this.orderStatus = res.orderStatus;
                }
            });
          });
        
    }

    finish(order: Observable<Order>) {
        

        order.subscribe((order: Order) => {
            // Access the ID from the order object
            const orderId = order.orderId; // Replace 'ID' with the actual property name
            var orderStatus = order.orderStatus;
            const vreme = this.vreme;            
            console.log(vreme + " finish vreme");
            this.orderService.finish(orderId, vreme).subscribe(res => {
                if(res) {
                    orderStatus = res.orderStatus;
                }
            })
          });
        
    }

    
    

    
}
