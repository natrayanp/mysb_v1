import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LogincheckComponent } from './logincheck/logincheck.component';
import { LoginComponent } from './home/login/login.component';
import { PostloginComponent } from './postlogin/postlogin.component';
// import { OrdersComponent } from './postlogin/orders/orders.component';
// import { OrderComponent } from './postlogin/order/order.component';
import { DashboardComponent } from './postlogin/dashboard/dashboard.component';
import { UserCardComponent } from './postlogin/settings/userssetup/user-card/user-card.component';
import { UserListComponent } from './postlogin/settings/userssetup/user-list/user-list.component';
import { SettingsComponent } from './postlogin/settings/settings.component';
// import { PortfoliosetupComponent } from './postlogin/settings/portfoliosetup/portfoliosetup.component';
import { PortfolioCardComponent } from './postlogin/settings/portfoliosetup/portfolio-card/portfolio-card.component';
import { PortfolioListComponent } from './postlogin/settings/portfoliosetup/portfolio-list/portfolio-list.component';
import { ChartComponent } from './chart/chart.component';
import { PfserviceService } from './natservices/pfservice.service';
import { FundallocatComponent } from './postlogin/fundallocat/fundallocat.component';
import { mfpfwiseorderlistComponent } from './postlogin/order/mforder/mfpfwiseorderlist/mfpfwiseorderlist.component';
import { StkwiseorderComponent } from './postlogin/order/stkwiseorder/stkwiseorder.component';
import { mffundlistComponent } from './postlogin/order/mforder/mffundlist/mffundlist.component';
import { SignupComponent } from './home/signup/signup.component';
import { BsestarmfregistrationComponent } from './postlogin/settings/bsestarmfregistration/bsestarmfregistration.component';
import { ForgotpassComponent } from './home/forgotpass/forgotpass.component';
import { BseregsuccComponent } from './postlogin/settings/bseregsucc/bseregsucc.component';
import { BsereguploadComponent } from './postlogin/settings/bseregupload/bseregupload.component';
import { MforderconfpgComponent } from './postlogin/order/mforder/mforderconfpg/mforderconfpg.component';

export const ROUTES: Routes = [

  { path: 'home',  component: HomeComponent},
  { path: 'securedpg',  component: PostloginComponent, children: [
    { path: 'orders',  component: mfpfwiseorderlistComponent },
    { path: 'mfordcof',  component: MforderconfpgComponent },
  /*  {path: 'orders',  component: OrderComponent, children: [
      {path: 'pfwise',  component: PfwiseorderlistComponent},
      {path: 'stwise',  component: StkwiseorderComponent},
      {path: 'finalorder',  component: OrderfinalComponent}
    ]},    */
    {path: 'dashboard',  component: DashboardComponent},
    {path: 'fundalloc',  component: FundallocatComponent},
    {path: 'settings',  component: SettingsComponent, children: [
         {path: 'usersetup',  component: UserListComponent},
         {path: 'portfoliosetup',  component: PortfolioListComponent},
         {path: 'mfreg',  component: BsestarmfregistrationComponent},
         {path: 'mfregsu',  component: BseregsuccComponent},
         {path: 'mfregupload',  component: BsereguploadComponent}  
                   
    ]},     
  ]},  
  {path: 'authchk', component: LogincheckComponent},
  {path: 'login', component: LoginComponent},
  {path: 'forgot', component: ForgotpassComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'chart', component: ChartComponent},
  {path: 'data', component: PfserviceService},
  
  { path: '',  component: HomeComponent}
];

