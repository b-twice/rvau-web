import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapPipe } from './static-table.pipes';
import { StaticTableComponent } from './static-table.component';
import { SharedModule }  from '../../shared.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
    ],
    declarations: [
        StaticTableComponent,
        MapPipe
    ],
    exports: [
        StaticTableComponent
    ],
    providers: [
    ]
})
export class StaticTableModule { }
