import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services';
import { DynamicTableComponent } from '../../dynamic-tables';
import { AdminNavComponent } from '../nav';
import { Tables } from '../';
import { AdminEditMetadata } from './admin-edit.metadata';
import { TableService } from '../../dynamic-tables';
import { FormRequest, GetRequest } from '../../models';
import { Subscription }   from 'rxjs/Subscription';

@Component({
    selector: 'admin-panel',
    template: require('./admin-panel.component.html'),
    providers: [ApiService, AdminEditMetadata, TableService],
    directives: [DynamicTableComponent, AdminNavComponent],
    styles: [require('./admin-panel.component.scss')]
})
export class AdminPanelComponent implements OnInit, OnDestroy {

    private tableMap = Tables; // map for navigation
    private sub: Subscription;
    private tableName: string; // name of active table
    private tableTheme: string = 'light-theme'; // dynamic table theme
    private activeEditing: boolean = true;
    private formQuestions: {}[];

    constructor(
        private route: ActivatedRoute,
        private apiService: ApiService,
        private metadata: AdminEditMetadata,
        private tableService: TableService
    ) { }
    ngOnInit() {
        // e.g. get leagues from admin/leagues (seems ugly)
        this.tableName = this.route.snapshot.url[0].path;
        this.sub = this.route
            .params
            .subscribe(params => {
                this.apiService.getData(this.tableName, params)
                    .subscribe(data => this.tableService.addRows(data))
                if (this.activeEditing) {
                    this.formQuestions = this.metadata.getQuestions(this.tableName);
                }

                this.tableService.formPost$.subscribe(form => this.submitForm(form));
                this.tableService.getRequest$.subscribe(request => this.getData(request));
            });
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    getData(request: GetRequest): void {
        this.apiService.getRequest(request).subscribe(
            result => this.tableService.getResponse(new GetRequest({ success: true, action: request.action, results: result })),
            error => this.tableService.getResponse(new GetRequest({ success: false, message: error }))
        );
    }
    submitForm(form: FormRequest): void {
        if (form.action === 'post') {
            this.apiService.postData(form.value, this.tableName)
                .subscribe(
                result => this.tableService.postResponse(new FormRequest({ success: true, action: form.action, value: result })),
                error => this.tableService.postResponse(new FormRequest({ success: false, message: error }))
                );
        }
        if (form.action === 'put') {
            this.apiService.putData(form.value, this.tableName)
                .subscribe(
                result => this.tableService.postResponse(new FormRequest({ success: true, action: form.action, value: result })),
                error => this.tableService.postResponse(new FormRequest({ success: false, message: error }))
                );
        }
        if (form.action === 'delete') {

            this.apiService.deleteData(form.value['id'], this.tableName)
                .subscribe(
                result => this.tableService.postResponse(new FormRequest({ success: true, action: form.action, value: result })),
                error => this.tableService.postResponse(new FormRequest({ success: false, message: error }))
                );
        }
    }
}
