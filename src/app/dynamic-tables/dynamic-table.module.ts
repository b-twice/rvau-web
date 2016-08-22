import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DynamicFormModule } from '../forms/forms.module';

import { RowPipe, FilterMenuPipe, MapPipe } from './dynamic-table.pipes';
import { FilterMenuComponent } from './filter-menu';
import { DynamicRowComponent } from './dynamic-row';
import { DynamicRowEditComponent } from './dynamic-row-edit';
import { DynamicTableComponent } from './dynamic-table.component';
import { DynamicTableService } from './dynamic-table.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        DynamicFormModule
    ],
    declarations: [
        DynamicTableComponent,
        DynamicRowComponent,
        DynamicRowEditComponent,
        FilterMenuComponent,
        RowPipe,
        FilterMenuPipe,
        MapPipe
    ],
    exports: [
        DynamicTableComponent
    ],
    providers: [
        DynamicTableService
    ]
})
export class DynamicTableModule { }
