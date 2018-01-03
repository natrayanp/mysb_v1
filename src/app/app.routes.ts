import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LogincheckComponent } from './logincheck/logincheck.component';
import { LoginComponent } from './home/login/login.component';
import { PostloginComponent } from './postlogin/postlogin.component';
import { OrdersComponent } from './postlogin/orders/orders.component';
import { OrderComponent } from './postlogin/order/order.component';
import { DashboardComponent } from './postlogin/dashboard/dashboard.component';
import { UserCardComponent } from './postlogin/settings/userssetup/user-card/user-card.component';
import { UserListComponent } from './postlogin/settings/userssetup/user-list/user-list.component';
import { SettingsComponent } from './postlogin/settings/settings.component';
import { PortfoliosetupComponent } from './postlogin/settings/portfoliosetup/portfoliosetup.component';
import { PortfolioCardComponent } from './postlogin/settings/portfoliosetup/portfolio-card/portfolio-card.component';
import { PortfolioListComponent } from './postlogin/settings/portfoliosetup/portfolio-list/portfolio-list.component';
import { ChartComponent } from './chart/chart.component';
import { PfserviceService } from './natservices/pfservice.service';
import { FundallocatComponent } from './postlogin/fundallocat/fundallocat.component';
import { PfwiseorderComponent } from './postlogin/order/pfwiseorder/pfwiseorder.component';
import { StkwiseorderComponent } from './postlogin/order/stkwiseorder/stkwiseorder.component';
import { OrderfinalComponent } from './postlogin/order/orderfinal/orderfinal.component';
import { SignupComponent } from './home/signup/signup.component';
import { BsestarmfregistrationComponent } from './postlogin/settings/bsestarmfregistration/bsestarmfregistration.component';


export const ROUTES: Routes = [
  
  { path: 'home',  component: HomeComponent},
  { path: 'securedpg',  component: PostloginComponent, children: [
   // {path: 'orders',  component: OrdersComponent},
    {path: 'orders',  component: OrderComponent, children: [
      {path: 'pfwise',  component: PfwiseorderComponent},
      {path: 'stwise',  component: StkwiseorderComponent},
      {path: 'finalorder',  component: OrderfinalComponent}
    ]},    
    {path: 'dashboard',  component: DashboardComponent},
    {path: 'fundalloc',  component: FundallocatComponent},
    {path: 'settings',  component: SettingsComponent, children: [
         {path: 'usersetup',  component: UserListComponent},
         {path: 'portfoliosetup',  component: PortfolioListComponent},
         {path: 'mfreg',  component: BsestarmfregistrationComponent}      
    ]},     
  ]},  
  {path: 'authchk', component: LogincheckComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'chart', component: ChartComponent},
  {path: 'data', component: PfserviceService},
  
  { path: '',  component: HomeComponent}
];

