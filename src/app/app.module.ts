import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeForGuestComponent } from './components/core/home-for-guest/home-for-guest.component';
import { HomeForHostComponent } from './components/core/home-for-host/home-for-host.component';
import { HomepageComponent } from './components/core/homepage/homepage.component';
import { BannerComponent } from './components/shared/banner/banner.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HeaderForHostComponent } from './components/shared/header-for-host/header-for-host.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { PageForbiddenComponent } from './components/shared/page-forbidden/page-forbidden.component';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';
import { SearchComponent } from './components/shared/search/search.component';
import { UserMenuComponent } from './components/shared/user-menu/user-menu.component';
import { BookingOfUserComponent } from './components/feature/booking-of-user/booking-of-user.component';
import { ConfirmOrderComponent } from './components/feature/confirm-order/confirm-order.component';
import { ConfirmPasswordComponent } from './components/feature/confirm-password/confirm-password.component';
import { CreateHouseComponent } from './components/feature/create-house/create-house.component';
import { EditHouseComponent } from './components/feature/edit-house/edit-house.component';
import { EditStatusHouseComponent } from './components/feature/edit-status-house/edit-status-house.component';
import { HouseDetailComponent } from './components/feature/house-detail/house-detail.component';
import { ListHouseHostComponent } from './components/feature/list-house-host/list-house-host.component';
import { ListHouseOfHostComponent } from './components/feature/list-house-of-host/list-house-of-host.component';
import { ListHouseComponent } from './components/feature/list-house/list-house.component';
import { LoginComponent } from './components/feature/login/login.component';
import { NavbarProfileComponent } from './components/feature/navbar-profile/navbar-profile.component';
import { ProfileUserComponent } from './components/feature/profile-user/profile-user.component';
import { RegisterHostComponent } from './components/feature/register-host/register-host.component';
import { RegisterComponent } from './components/feature/register/register.component';
import { SlideShowComponent } from './components/feature/slide-show/slide-show.component';
import { UploadFileComponent } from './components/feature/upload-file/upload-file.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeForGuestComponent,
    HomeForHostComponent,
    HomepageComponent,
    BannerComponent,
    FooterComponent,
    HeaderForHostComponent,
    HeaderComponent,
    PageForbiddenComponent,
    PageNotFoundComponent,
    SearchComponent,
    UserMenuComponent,
    BookingOfUserComponent,
    ConfirmOrderComponent,
    ConfirmPasswordComponent,
    CreateHouseComponent,
    EditHouseComponent,
    EditStatusHouseComponent,
    HouseDetailComponent,
    ListHouseHostComponent,
    ListHouseOfHostComponent,
    ListHouseComponent,
    LoginComponent,
    NavbarProfileComponent,
    ProfileUserComponent,
    RegisterHostComponent,
    RegisterComponent,
    SlideShowComponent,
    UploadFileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
