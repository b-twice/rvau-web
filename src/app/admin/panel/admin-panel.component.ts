import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services';
import { DynamicTableComponent } from '../../dynamic-tables';
import { AdminNavComponent } from '../nav';
import { Tables } from '../';
import { AdminEditMetadata } from './admin-edit.metadata';
import { TableService } from '../../dynamic-tables';
import { FormRequest} from '../../models';

@Component({
    selector: 'admin-panel',
    template: require('./admin-panel.component.html'),
    providers: [ApiService, AdminEditMetadata, TableService],
    directives: [DynamicTableComponent, AdminNavComponent],
    styles: [require('./admin-panel.component.scss')]
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

    submitForm(form: FormRequest ): void {
        if (form.action === 'post') {
            this.apiService.postData(form.value, this.tableName)
                .subscribe(
                    result => this.tableService.postResponse(new FormRequest({success: true, action:form.action, value: result})),
                    error =>  this.tableService.postResponse(new FormRequest({success: false, message: error}))
                );
        }
        if (form.action === 'put') {
            this.apiService.putData(form.value, this.tableName)
                .subscribe(
                    result => this.tableService.postResponse(new FormRequest({success: true, action:form.action, value: result})),
                    error =>  this.tableService.postResponse(new FormRequest({success: false, message: error}))
                );
        }
        if (form.action === 'delete') {

            this.apiService.deleteData(form.value['id'], this.tableName)
                .subscribe(
                    result => this.tableService.postResponse(new FormRequest({success: true, action:form.action, value: result})),
                    error =>  this.tableService.postResponse(new FormRequest({success: false, message: error}))
                );
        }
    }
}
