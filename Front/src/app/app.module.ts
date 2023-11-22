import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './Components/Core/product-list/product-list.component';
import { ProductDetailsComponent } from './Components/Core/product-details/product-details.component';
import { CheckoutComponent } from './Components/Core/checkout/checkout.component';
import { LoginComponent } from './Components/Core/login/login.component';
import { RegisterComponent } from './Components/Core/register/register.component';
import { ProfileComponent } from './Components/Core/profile/profile.component';
import { CartComponent } from './Components/Core/cart/cart.component';
import { CustomerOrderHistoryComponent } from './Components/Core/customer-order-history/customer-order-history.component';
import { CustomerOrderDetailComponent } from './Components/Core/customer-order-detail/customer-order-detail.component';
import { ReviewListComponent } from './Components/Core/Review/review-list/review-list.component';
import { ReviewWriteComponent } from './Components/Core/Review/review-write/review-write.component';
import { InventoryDashboardComponent } from './Components/Core/inventory-dashboard/inventory-dashboard.component';
import { UsersListDashboardComponent } from './Components/Core/users-list-dashboard/users-list-dashboard.component';
import { ReviewsListDashboardComponent } from './Components/Core/Review/reviews-list-dashboard/reviews-list-dashboard.component';
import { ProductsListDasboardComponent } from './Components/Core/dashboard/products-list-dasboard/products-list-dasboard.component';
import { WishlistUserDashboardComponent } from './Components/Core/wishlist-user-dashboard/wishlist-user-dashboard.component';
import { FavoritesUserDashboardComponent } from './Components/Core/favorites-user-dashboard/favorites-user-dashboard.component';
import { ShippingComponent } from './Components/Core/shipping/shipping.component';
import { RecommendedProductsComponent } from './Components/Core/recommended-products/recommended-products.component';
import { CrossSellComponent } from './Components/Core/cross-sell/cross-sell.component';
import { NavbarComponent } from './Components/Shared/navbar/navbar.component';
import { FooterComponent } from './Components/Shared/footer/footer.component';
import { ContactusComponent } from './Components/Core/contactus/contactus.component';
import { HomeComponent } from './Components/Core/Home/home/home.component';
import { HomeBannerComponent } from './Components/Core/Home/home-banner/home-banner.component';
import { HomeOffersComponent } from './Components/Core/Home/home-offers/home-offers.component';
import { HomeTopPicksComponent } from './Components/Core/Home/home-top-picks/home-top-picks.component';
import { HomeBrandsComponent } from './Components/Core/Home/home-brands/home-brands.component';
import { HomeReviewsComponent } from './Components/Core/Home/home-reviews/home-reviews.component';
import { BlogComponent } from './Components/Core/blog/blog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotfoundComponent } from './Components/Core/notfound/notfound.component';
import { GeneralInformationComponent } from './Components/Core/user profile/general-information/general-information.component';
import { AddressComponent } from './Components/Core/user profile/address/address.component';
import { AddAddressComponent } from './Components/Core/user profile/add-address/add-address.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { OrderListComponent } from './Components/Core/user profile/order-list/order-list.component';
import { OrderdetailsComponent } from './Components/Core/user profile/orderdetails/orderdetails.component';
import { AuthInterceptor } from './auth.interceptor';
import { ReviewRateComponent } from './Components/Core/Review/review-rate/review-rate.component';
import { DashhomeComponent } from './Components/Core/dashboard/dashhome/dashhome.component';
import { AdminasideComponent } from './Components/Core/dashboard/adminaside/adminaside.component';
import { ProductFormComponent } from './Components/Core/dashboard/product-form/product-form.component';
import { CategoryListDashboardComponent } from './Components/Core/dashboard/categories/category-list-dashboard/category-list-dashboard.component';
import { BrandListDashboardComponent } from './Components/Core/dashboard/brands/brand-list-dashboard/brand-list-dashboard.component';
import { UsersListAdminDashboardComponent } from './Components/Core/dashboard/users/users-list-admin-dashboard/users-list-admin-dashboard.component';
import { OrdersListDashboardComponent } from './Components/Core/dashboard/orders/orders-list-dashboard/orders-list-dashboard.component';
import { ReviewsListAdminDashboardComponent } from './Components/Core/dashboard/reviews/reviews-list-admin-dashboard/reviews-list-admin-dashboard.component';
import { ContactAdminDashboardComponent } from './Components/Core/dashboard/contactus/contact-admin-dashboard/contact-admin-dashboard.component';
import { EditProductFormComponent } from './Components/Core/dashboard/edit-product-form/edit-product-form.component';
import { ChangepasswordComponent } from './Components/Core/user profile/changepassword/changepassword.component';
import { AdminOrderDetailsComponent } from './Components/Core/dashboard/orders/admin-order-details/admin-order-details.component';
import { AddUserComponent } from './Components/Core/dashboard/users/add-user/add-user.component';
import { AdminReportsComponent } from './Components/Core/dashboard/reports/admin-reports/admin-reports.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { PhonesComponent } from './Components/Core/phones/phones.component';
import { AddphoneComponent } from './Components/Core/addphone/addphone.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductDetailsComponent,
    CheckoutComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    CartComponent,
    CustomerOrderHistoryComponent,
    CustomerOrderDetailComponent,
    ReviewListComponent,
    ReviewWriteComponent,
    InventoryDashboardComponent,
    UsersListDashboardComponent,
    ProductsListDasboardComponent,
    ReviewsListDashboardComponent,
    WishlistUserDashboardComponent,
    FavoritesUserDashboardComponent,
    ShippingComponent,
    RecommendedProductsComponent,
    CrossSellComponent,
    NavbarComponent,
    FooterComponent,
    ContactusComponent,
    HomeComponent,
    HomeBannerComponent,
    HomeOffersComponent,
    HomeTopPicksComponent,
    HomeBrandsComponent,
    HomeReviewsComponent,
    BlogComponent,
    NotfoundComponent,
    GeneralInformationComponent,
    AddressComponent,
    AddAddressComponent,
    OrderListComponent,
    OrderdetailsComponent,
    ReviewRateComponent,
    DashhomeComponent,
    AdminasideComponent,
    ProductFormComponent,
    CategoryListDashboardComponent,
    BrandListDashboardComponent,
    UsersListAdminDashboardComponent,
    OrdersListDashboardComponent,
    ReviewsListAdminDashboardComponent,
    ContactAdminDashboardComponent,
    EditProductFormComponent,
    ChangepasswordComponent,
    AdminOrderDetailsComponent,
    AddUserComponent,
    AdminReportsComponent,
    PhonesComponent,
    AddphoneComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPayPalModule, // import ngx for payment paypal
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
