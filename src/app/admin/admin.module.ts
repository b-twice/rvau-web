import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { DynamicTableModule } from '../shared/dynamic-table';

import { AdminComponent }   from './admin.component';
import { AdminPanelComponent } from './panel/admin-panel.component';
import { AdminNavComponent } from './nav/admin-nav.component';
import { AdminHeaderComponent } from './header/admin-header.component';

import { adminRouting } from './admin.routes';

import { DynamicTableService } from '../shared/dynamic-table';


@NgModule({
    imports: [
        SharedModule,
        DynamicTableModule,
        adminRouting
    ],
    declarations: [
        AdminComponent,
        AdminPanelComponent,
        AdminNavComponent,
        AdminHeaderComponent
    ],
    providers: [
        DynamicTableService
    ]
})
export class AdminModule { }
