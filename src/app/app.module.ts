import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {AppComponent} from './app.component';
import {NavigationComponent} from './parts/navigation/navigation.component';
import {CardComponent} from './pages/card/card.component';
import {PaginationComponent} from './parts/pagination/pagination.component';
import {AppRoutingModule} from './app-routing.module';
import {LoginComponent} from './pages/login/login.component';
import {SignupComponent} from './pages/signup/signup.component';
import {DetailComponent} from './pages/product-detail/detail.component';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CartComponent} from './pages/cart/cart.component';
import {CookieService} from "ngx-cookie-service";
import {ErrorInterceptor} from "./_interceptors/error-interceptor.service";
import {JwtInterceptor} from "./_interceptors/jwt-interceptor.service";
import {OrderComponent} from './pages/order/order.component';
import {OrderDetailComponent} from './pages/order-detail/order-detail.component';
import {ProductListComponent} from './pages/product-list/product.list.component';
import {UserDetailComponent} from './pages/user-edit/user-detail.component';
import {ProductEditComponent} from './pages/product-edit/product-edit.component';
import { ProductAddComponent } from './pages/product-add/product-add.component';
import { FooterComponent } from './parts/footer/footer.component';
import { PageNotFoundComponent } from './parts/page-not-found/page-not-found.component';
import { KontaktComponent } from './parts/kontakt/kontakt.component';
import { ONamaComponent } from './parts/o-nama/o-nama.component';
import { AfterHoursComponent } from './parts/after-hours/after-hours.component';
import { PolitikaPrivatnostiComponent } from './parts/politika-privatnosti/politika-privatnosti.component';
import { ThankYouComponent } from './parts/thank-you/thank-you.component';
import { CheckOutComponent } from './pages/check-out/check-out.component';
import { SvePorudzbineComponent } from './pages/sve-porudzbine/sve-porudzbine.component';
import { PorudzbinaComponent } from './pages/porudzbina/porudzbina.component';

@NgModule({
    declarations: [
        AppComponent,
        NavigationComponent,
        CardComponent,
        PaginationComponent,
        LoginComponent,
        SignupComponent,
        DetailComponent,
        CartComponent,
        OrderComponent,
        OrderDetailComponent,
        ProductListComponent,
        UserDetailComponent,
        ProductEditComponent,
        ProductAddComponent,
        FooterComponent,
        PageNotFoundComponent,
        KontaktComponent,
        ONamaComponent,
        AfterHoursComponent,
        PolitikaPrivatnostiComponent,
        ThankYouComponent,
        CheckOutComponent,
        SvePorudzbineComponent,
        PorudzbinaComponent

    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule

    ],
    providers: [CookieService,
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}],
    bootstrap: [AppComponent]
})
export class AppModule {
}
