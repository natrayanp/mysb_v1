import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
//import { HttpModule }    from '@angular/http';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import { NotifymoduleModule } from './commonmodule/notifymodule/notifymodule.module';
import { environment } from '../environments/environment';

import { MatSidenavModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { MatAutocompleteModule } from '@angular/material';
import { MatCard } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MatSlideToggleModule } from '@angular/material';
import { MatStepperModule } from '@angular/material';
import { MatExpansionModule } from '@angular/material';
import { MatRadioModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';
import { MatChipsModule } from '@angular/material';
import { MatIconModule, MatIconRegistry } from '@angular/material';
import { MatTabsModule } from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material';
import { MatDatepickerModule,MatNativeDateModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material';
import { MatTableModule } from '@angular/material';
import { MatButtonToggleModule } from '@angular/material';
import {MatCheckboxModule} from '@angular/material/checkbox';



import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, PreloadAllModules } from '@angular/router';

import { ROUTES } from './app.routes';
import { ToolbarComponent } from './home/toolbar/toolbar.component';
import { LoginComponent } from './home/login/login.component';
//import { Dialog1 } from './home/login/login.component';
import { SetjwtService } from './natservices/setjwtservice.service';
import { LogincheckComponent } from './logincheck/logincheck.component';
import { PostloginComponent } from './postlogin/postlogin.component';
import { PostlogintoolbarComponent } from './postlogin/postlogintoolbar/postlogintoolbar.component';
import { DashboardComponent } from './postlogin/dashboard/dashboard.component';
import { OrdersComponent } from './postlogin/orders/orders.component';
import { PfqtypopupComponent } from './postlogin/orders/pfqtypopup/pfqtypopup.component';
import { SettingsComponent } from './postlogin/settings/settings.component';
import { UserssetupComponent } from './postlogin/settings/userssetup/userssetup.component';
import { UserListComponent } from './postlogin/settings/userssetup/user-list/user-list.component';
import { UserCardComponent } from './postlogin/settings/userssetup/user-card/user-card.component';
import { PortfoliosetupComponent } from './postlogin/settings/portfoliosetup/portfoliosetup.component';
import { PortfolioCardComponent } from './postlogin/settings/portfoliosetup/portfolio-card/portfolio-card.component';
import { PortfolioListComponent } from './postlogin/settings/portfoliosetup/portfolio-list/portfolio-list.component';
import { GooglePieChartService } from './googlechartservice/google-pie-chart.service';
import { ChartComponent } from './chart/chart.component';
import { PfserviceService } from './natservices/pfservice.service';
import { SettingspfService } from './natservices/settingspf.service';
import { NatInterceptor } from './natservices/natinterceptor';
import { FundallocatComponent } from './postlogin/fundallocat/fundallocat.component';
import { OrderComponent } from './postlogin/order/order.component';
import { OrderdbservService } from "./natservices/orderdbserv.service";
import { DbservicesService } from "./natservices/dbservices.service";
import { PfwiseorderComponent } from './postlogin/order/pfwiseorder/pfwiseorder.component';
import { StkwiseorderComponent } from './postlogin/order/stkwiseorder/stkwiseorder.component';
import { OrderfinalComponent } from './postlogin/order/orderfinal/orderfinal.component';




import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { SignupComponent } from './home/signup/signup.component';
import { AuthService } from './natservices/auth.service';
import { NotifyService } from './natservices/notify.service';
import { BsestarmfregistrationComponent } from './postlogin/settings/bsestarmfregistration/bsestarmfregistration.component';
import { BannerComponent } from './commonmodule/notificationmodule/banner/banner.component';
import { AlertsComponent } from './commonmodule/notificationmodule/alerts/alerts.component';
import { NotificationComponent } from './commonmodule/notificationmodule/notification/notification.component';
import { FileuploadComponent } from './fileupload/fileupload.component';
import { FileuploadService } from './natservices/fileupload.service';
import { ForgotpassComponent } from './home/forgotpass/forgotpass.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToolbarComponent,
    LoginComponent,
//    Dialog1,
    LogincheckComponent,
    PostloginComponent,
    PostlogintoolbarComponent,
    DashboardComponent,
    OrdersComponent,
    PfqtypopupComponent,
    SettingsComponent,
    UserssetupComponent,
    UserListComponent,
    UserCardComponent,
    PortfoliosetupComponent,
    PortfolioCardComponent,
    PortfolioListComponent,
    ChartComponent,
    PfserviceService,
    FundallocatComponent,
    OrderComponent,
    PfwiseorderComponent,
    StkwiseorderComponent,
    OrderfinalComponent,
    SignupComponent,
    BsestarmfregistrationComponent,
    BannerComponent,
    AlertsComponent,
    NotificationComponent,
    ForgotpassComponent
  ],
  imports: [
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,
      MatSidenavModule,
      MatToolbarModule,
      MatButtonModule,
      MatCardModule,
      FlexLayoutModule,
      MatInputModule,
      MatFormFieldModule,
      MatAutocompleteModule,    
      FormsModule,
      ReactiveFormsModule,
      MatSlideToggleModule,
      MatStepperModule,
      MatExpansionModule,
      MatRadioModule,
      MatSelectModule,
      MatChipsModule,
      MatIconModule,
      MatTabsModule,
      MatProgressSpinnerModule,
      MatDialogModule,
      MatSnackBarModule,      
      MatDatepickerModule,MatNativeDateModule,
      MatPaginatorModule,
      MatTableModule,
      MatButtonToggleModule,
      MatCheckboxModule,
    RouterModule.forRoot(ROUTES /*,{enableTracing: true }*/),
    NotifymoduleModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  entryComponents: [PfqtypopupComponent],
  providers: [SetjwtService,
              GooglePieChartService,
              SettingspfService,
              OrderdbservService,
              DbservicesService,
              {provide: HTTP_INTERCEPTORS,useClass: NatInterceptor, multi: true,},
              AuthService, 
              NotifyService,
              FileuploadService
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
