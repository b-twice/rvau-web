import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module.ts';
import { DynamicFormModule } from '../forms/forms.module';

// Components
import { UserComponent }   from './user.component';
import { LoginComponent } from './login/login.component';
import { UserHeaderComponent } from './header/user-header.component';

// Routing
import { userRouting } from './user.routes';

import { UserMetadataService } from './user-metadata.service';

@NgModule({
    imports: [
        SharedModule,
        DynamicFormModule,
        userRouting
    ],
    declarations: [
        UserComponent,
        LoginComponent,
        UserHeaderComponent
    ],
    providers: [
        UserMetadataService
    ]
})
export class UserModule { }
