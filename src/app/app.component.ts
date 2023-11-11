import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Le Tacos';

  isDeliveryClosed(): boolean {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const hour = now.getHours();

    // Check if it's Monday-Friday (days 1 to 5) and the time is outside 8:00-20:00
    return dayOfWeek >= 1 && dayOfWeek <= 5 && (hour < 8 || hour >= 23);
    
  }
}


