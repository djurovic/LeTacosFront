import { Component, OnInit } from '@angular/core';
import { PorudzbinaService } from 'src/app/services/porudzbina.service';
import {OrderStatus} from "../../enum/OrderStatus";
import {Subscription, interval} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-sve-porudzbine',
  templateUrl: './sve-porudzbine.component.html',
  styleUrls: ['./sve-porudzbine.component.css']
})
export class SvePorudzbineComponent implements OnInit {

  orders: any[] = [];
  OrderStatus = OrderStatus;
  page:any;

  querySub: Subscription;
  refreshSubscription: Subscription;


  constructor(private porudzbinaService: PorudzbinaService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadOrders();
    this.querySub = this.route.queryParams.subscribe(() => {
      this.update();
  });
  this.startRefreshing();

  }

  loadOrders() {
    this.porudzbinaService.getAllPorudzbine().subscribe(
      (data) => {
        this.orders = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching orders', error);
      }
    );
  }

  update() {
    let nextPage = 1;
    let size = 10;
    if (this.route.snapshot.queryParamMap.get('page')) {
        nextPage = +this.route.snapshot.queryParamMap.get('page');
        size = +this.route.snapshot.queryParamMap.get('size');
    }
    this.porudzbinaService.getAllPorudzbine(nextPage, size).subscribe(page => this.page = page, _ => {
        console.log("Get Orde Failed")
    });
}

startRefreshing() {
  this.refreshSubscription = interval(2000).subscribe(() => {
      this.refreshTableData();
  });
}
refreshTableData() {
  this.update(); // Fetch updated data and update the table
}

  

  


}
