import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services';
import { DynamicTableComponent } from '../../dynamic-tables';
import { AdminNavComponent } from '../nav';
import { Tables } from '../';
import { AdminEditMetadata } from './admin-edit.metadata';
import { TableService } from '../../dynamic-tables';
import { FormPost, FormResponse } from '../../models';

@Component({
    selector: 'admin-panel',
    template: require('./admin-panel.component.html'),
    providers: [ApiService, AdminEditMetadata, TableService],
    directives: [DynamicTableComponent, AdminNavComponent],
    styles: []
})
export class AdminPanelComponent implements OnInit {

    private tableMap = Tables; // map for navigation
    private sub: any;
    private tableName: string; // name of active table
    private tableTheme: string = 'light-theme'; // dynamic table theme
    private activeEditing: boolean = true;
    private formQuestions: {}[];

    constructor(private route: ActivatedRoute,
        private apiService: ApiService,
        private metadata: AdminEditMetadata,
        private tableService: TableService
    ) { }
    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.tableName = params['table'];
            this.apiService.getData(this.tableName)
                .subscribe(data => this.tableService.addRows(data))
            if (this.activeEditing) {
                this.formQuestions = this.metadata.getQuestions(this.tableName);
            }
        });

        this.tableService.formPost$.subscribe(form => this.submitForm(form));
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    submitForm(form: FormPost ): void {
        if (form.editType === 'Add') {
            this.apiService.postData(form.value, this.tableName)
                .subscribe(
                    result => this.tableService.postResponse(new FormResponse({success: true, value: result})),
                    error =>  console.log(error)
                );
        }
        if (form.editType === 'Edit') {
            this.apiService.putData(form.value, this.tableName)
                .subscribe(
                    result => this.tableService.postResponse(new FormResponse({success: true, value: result})),
                    error =>  console.log(error)
                );
        }
    }
}
