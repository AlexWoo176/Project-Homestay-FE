import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/feature/login/login.component';
import {HomepageComponent} from './components/core/homepage/homepage.component';
import {HouseDetailComponent} from './components/feature/house-detail/house-detail.component';
import {RegisterComponent} from './components/feature/register/register.component';
import {RegisterHostComponent} from './components/feature/register-host/register-host.component';
import {PageNotFoundComponent} from './components/shared/page-not-found/page-not-found.component';
import {PageForbiddenComponent} from './components/shared/page-forbidden/page-forbidden.component';
import {AuthGuard} from './services/auth.guard';
import {Role} from './model/role.enum';
import {ConfirmOrderComponent} from './components/feature/confirm-order/confirm-order.component';
import {HomeForHostComponent} from './components/core/home-for-host/home-for-host.component';
import {ListHouseHostComponent} from './components/feature/list-house-host/list-house-host.component';
import {CreateHouseComponent} from './components/feature/create-house/create-house.component';
import {HomeForGuestComponent} from './components/core/home-for-guest/home-for-guest.component';
import {ProfileUserComponent} from './components/feature/profile-user/profile-user.component';
import {BookingOfUserComponent} from './components/feature/booking-of-user/booking-of-user.component';
import {EditHouseComponent} from './components/feature/edit-house/edit-house.component';
import {EditStatusHouseComponent} from './components/feature/edit-status-house/edit-status-house.component';
import {ConfirmPasswordComponent} from './components/feature/confirm-password/confirm-password.component';
import {ListHouseOfHostComponent} from './components/feature/list-house-of-host/list-house-of-host.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'houses', component: HomepageComponent},
  {path: 'houses/:id', component: HouseDetailComponent},
  {path: 'registerUser', component: RegisterComponent},
  {path: 'registerHost', component: RegisterHostComponent},
  {path: '404', component: PageNotFoundComponent},
  {path: '403', component: PageForbiddenComponent},
  {path: '', redirectTo: 'houses', pathMatch: 'full'},
  {path: 'houses/:id/booking', component: ConfirmOrderComponent, canActivate: [AuthGuard], data: {roles: [Role.GUEST]}},
  {
    path: 'home-for-host', component: HomeForHostComponent, canActivate: [AuthGuard], data: {roles: [Role.HOST]},
    children: [
      {path: 'houses', component: ListHouseHostComponent, canActivate: [AuthGuard], data: {roles: [Role.HOST]}},
      {path: 'create-house', component: CreateHouseComponent, canActivate: [AuthGuard], data: {roles: [Role.HOST]}},
    ]
  },
  {path: 'me/orders', component: HomeForGuestComponent, canActivate: [AuthGuard], data: {roles: [Role.GUEST]}},
  {
    path: 'profileUser',
    component: ProfileUserComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.HOST, Role.GUEST, Role.ADMIN, Role.PM]}
  },
  {path: 'bookingOfUser', component: BookingOfUserComponent, canActivate: [AuthGuard], data: {roles: [Role.GUEST]}},
  {path: 'edit-house/:id', component: EditHouseComponent, canActivate: [AuthGuard], data: {roles: [Role.HOST]}},
  {path: 'edit-statusHouse/:houseId', component: EditStatusHouseComponent, canActivate: [AuthGuard], data: {roles: [Role.HOST]}},
  {path: 'home-for-host', component: HomeForHostComponent},
  {path: 'me/orders', component: HomeForGuestComponent},
  {path: 'create-house', component: CreateHouseComponent},
  {path: 'profileUser', component: ProfileUserComponent},
  {path: 'bookingOfUser/:id', component: BookingOfUserComponent},
  {
    path: 'confirmPassword',
    component: ConfirmPasswordComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.HOST, Role.GUEST, Role.PM, Role.ADMIN]}
  },
  {path: 'listHouseOfHost', component: ListHouseOfHostComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      scrollPositionRestoration: 'enabled', // Add options right here
    })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
