import { enableProdMode, PLATFORM_DIRECTIVES, provide } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { Http, HTTP_PROVIDERS } from '@angular/http';
import { APP_ROUTER_PROVIDERS } from './app/';
import {AppComponent} from './app/app.component';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { AuthConfig, AuthHttp } from 'angular2-jwt';

const ENV_PROVIDERS = [];
// depending on the env mode, enable prod mode or add debugging modules
if (process.env.ENV === 'build') {
  enableProdMode();
}

bootstrap(AppComponent, [
  disableDeprecatedForms(),
  provideForms(),
  // These are dependencies of our App
  ...APP_ROUTER_PROVIDERS,
  ...HTTP_PROVIDERS,
  provide(PLATFORM_DIRECTIVES, { useValue: ROUTER_DIRECTIVES, multi: true }),
  ...ENV_PROVIDERS,
  { provide: LocationStrategy, useClass: HashLocationStrategy }, // use #/ routes, remove this for HTML5 mode
  provide(AuthHttp, {
    useFactory: (http) => {
      return new AuthHttp(new AuthConfig({
        tokenName: 'jwt'
      }), http);
    },
    deps: [Http]
  })
])
  .catch(err => console.error(err));
