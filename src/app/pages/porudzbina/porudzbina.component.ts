import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderStatus } from 'src/app/enum/OrderStatus';
import { PorudzbinaService } from 'src/app/services/porudzbina.service';
import { Porudzbina } from 'src/app/models/Porudzbina';

@Component({
  selector: 'app-porudzbina',
  templateUrl: './porudzbina.component.html',
  styleUrls: ['./porudzbina.component.css']
})
export class PorudzbinaComponent implements OnInit {

  orderId: number;
  order: Porudzbina;
  OrderStatus = OrderStatus;
  vreme: string;
  
  orderStatus: string;

  constructor(private route: ActivatedRoute, private porudzbinaService: PorudzbinaService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.orderId = +params.get('id');
      this.loadOrderDetails();
    });
    console.log(this.order + "order data");
    
  }

  loadOrderDetails(): void {
    this.porudzbinaService.getPorudzbinaById(this.orderId).subscribe(
      (data) => {
        this.order = data;
        console.log(OrderStatus[data.orderStatus]);
        console.log(data);
        
      },
      (error) => {
        console.error('Error fetching order details:', error);
      }
    );
  }

  cancelOrder(): void {
    this.porudzbinaService.cancel(this.orderId).subscribe(
      (result: Porudzbina) => {
        // Handle the result or perform any additional logic here
        console.log('Order cancelled successfully', result);
        // You might want to update the UI or navigate to a different page here
      },
      (error) => {
        // Handle the error or perform any error-specific logic here
        console.error('Error cancelling order', error);
      }
    );
  }

  finishOrder(): void {
    if (!this.vreme) {
      // Handle the case where 'vreme' is not selected
      console.error('Please select a time (vreme) before finishing the order.');
      return;
    }

    this.porudzbinaService.finish(this.orderId, this.vreme).subscribe(
      (result: Porudzbina) => {
        // Handle the result or perform any additional logic here
        console.log('Order finished successfully', result);
        // You might want to update the UI or navigate to a different page here
      },
      (error) => {
        // Handle the error or perform any error-specific logic here
        console.error('Error finishing order', error);
      }
    );
  }

}
