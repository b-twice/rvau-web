// import { NgModule, ModuleWithProviders, provide } from '@angular/core';
// import { CommonModule }        from '@angular/common';
// import { HttpModule } from '@angular/http';
// import { Http } from '@angular/http';
// import { FormsModule }         from '@angular/forms';

// import { UserComponent } from './user';

// import { ApiService, AuthService } from './services';
// import { AuthConfig, AuthHttp } from 'angular2-jwt';


// @NgModule({
//     imports: [
//         CommonModule
//     ],
//     declarations: [ ],
//     exports: [
//         CommonModule, 
//         FormsModule,
//         HttpModule
//     ]
// })
// export class SharedModule {
//     static forRoot(): ModuleWithProviders {
//         return {
//             ngModule: SharedModule,
//             providers: [
//                 AuthService,
//                 ApiService,
//                 provide(AuthHttp, {
//                     useFactory: (http) => {
//                         return new AuthHttp(new AuthConfig({
//                             tokenName: 'jwt'
//                         }), http);
//                     },
//                     deps: [Http]
//                 })
//             ]
//         };
//     }
// }