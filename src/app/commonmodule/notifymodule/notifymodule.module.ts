import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SimpleNotificationsComponent} from './components/simple-notifications/simple-notifications.component';
import {NotificationComponent} from './components/notification/notification.component';
import {NotificationsService} from './services/notifications.service';


export * from './components/notification/notification.component';
export * from './components/simple-notifications/simple-notifications.component';
export * from './services/notifications.service';
export * from './interfaces/icons';
export * from './interfaces/notification-event.type';
export * from './interfaces/notification.type';
export * from './interfaces/options.type';

//https://github.com/flauc/angular2-notifications
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SimpleNotificationsComponent,
    NotificationComponent
  ],
  exports: [SimpleNotificationsComponent],
  providers:[NotificationsService]
})
export class NotifymoduleModule { }
