import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services';
import { DynamicTableComponent } from '../../dynamic-tables';
import { AdminNavComponent } from '../nav';
import { Tables } from '../';
import { AdminEditMetadata } from './admin-edit.metadata';
import { TableService } from '../../dynamic-tables';

@Component({
  selector: 'admin-panel',
  template: require('./admin-panel.component.html'),
  providers: [ApiService, AdminEditMetadata, TableService],
  directives: [DynamicTableComponent, AdminNavComponent],
  styles: []
})
export class AdminPanelComponent implements OnInit{

    private tableMap = Tables; // map for navigation
    private sub: any;
    private tableName: string; // name of active table
    private tableTheme:string = "light-theme"; // dynamic table theme
    private activeEditing:boolean = true;
    private formQuestions: {}[];

    constructor(private route: ActivatedRoute, 
                private apiService: ApiService,
                private metadata: AdminEditMetadata,
                private tableService: TableService
    ) {}
    ngOnInit () {
        this.sub = this.route.params.subscribe(params => {
            this.tableName = params['table']; 
            this.apiService.getData(this.tableName)
                .subscribe(data => {
                    this.tableService.addRows(data);
                }
            )
            if (this.activeEditing) {
                this.formQuestions = this.metadata.getQuestions(this.tableName);
            }
        })

        this.tableService.formSubmitted$.subscribe(
            form => this.submitForm(form)
        )
    }
    ngOnDestroy() {
        this.sub.unsubscribe()
    }

    submitForm(form): void {
        console.log(form);
    }
}
