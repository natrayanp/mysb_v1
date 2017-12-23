import {Component, AfterViewInit, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';

declare const gapi: any;

/*
export class GoogleSignInSuccess {
  public googleUser: gapi.auth2.GoogleUser;

  constructor(googleUser: gapi.auth2.GoogleUser) {
    this.googleUser = googleUser;
  }
}

export class GoogleSignInFailure {
}*/

@Component({
  selector: 'google-signin',
  templateUrl: './google-sign-in-component.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoogleSignInComponentComponent {
  private id: string = 'google-signin2';


  // Render options
  @Input() private scope: string;

  private _width: number;

  get width(): string {
    return this._width.toString();
  }

  @Input() set width(value: string) {
    this._width = Number(value);
  }

  private _height: number;

  get height(): string {
    return this._height.toString();
  }

  @Input() set height(value: string) {
    this._height = Number(value);
    gapi.load('', '');
  }

  private _longTitle: boolean;

  get longTitle(): string {
    return this._longTitle.toString();
  }

  @Input() set longTitle(value: string) {
    this._longTitle = Boolean(value);
  }

  @Input() private theme: string;

  // Init params
  @Input() private clientId: string;
  @Input() private cookiePolicy: string;

  private _fetchBasicProfile: boolean;

  get fetchBasicProfile(): string {
    return this._fetchBasicProfile.toString();
  }

  @Input() set fetchBasicProfile(s: string) {
    this._fetchBasicProfile = Boolean(s);
  }

  @Input() private hostedDomain: string;
  @Input() private openidRealm: string;

  @Output() googleSignInSuccess: EventEmitter<any> = new EventEmitter();

  @Output() googleSignInFailure: EventEmitter<any> = new EventEmitter();

  ngAfterViewInit() {
    
    this.auth2Init();
    this.renderButton();
  }

  private auth2Init() {
    if (this.clientId == null)
      throw new Error(
        'clientId property is necessary. (<google-signin [clientId]="..."></google-signin>)');
    
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: this.clientId,
        cookie_policy: this.cookiePolicy,
        fetch_basic_profile: this._fetchBasicProfile,
        hosted_domain: this.hostedDomain,
        openid_realm: this.openidRealm
      });
    });
  }

  private handleFailure() {
    //this.googleSignInFailure.next(new GoogleSignInFailure());    
    console.log("sing in failure");
  }

  private handleSuccess(googleUser) {
       
    let id: string = googleUser.getId();
    let profile = googleUser.getBasicProfile();
    console.log('ID: ' +
      profile
        .getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    this.googleSignInSuccess.emit(googleUser);
  }

  private renderButton() {
    gapi.signin2.render(
      this.id, {
        'scope': 'profile email',
        'width': 240,
        'height': 40,
        'longtitle': true,
        'theme': 'dark',
        onsuccess: (googleUser) => this.handleSuccess(googleUser),
        onfailure: () => this.handleFailure()
      });
  }
}