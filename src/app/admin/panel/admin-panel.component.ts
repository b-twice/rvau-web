import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services';
import { Tables } from '../tables';
import { AdminEditMetadata } from './admin-edit.metadata';
import { DynamicTableService } from '../../shared/dynamic-table';
import { FormRequest, GetRequest } from '../../shared';
import { Subscription }   from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';


const _ = require('lodash');
@Component({
    selector: 'admin-panel',
    template: require('./admin-panel.component.html'),
    providers: [AdminEditMetadata],
    styles: [require('./admin-panel.component.scss')]
})
export class AdminPanelComponent implements OnInit, OnDestroy {

    private tableMap = Tables;
    private tableSubscription: Subscription;
    private tableName: string; // name of active table
    private tableTheme: string = 'light-theme'; // dynamic table theme
    private formQuestions: {}[];
    private tableData: {}[];

    constructor(
        private route: ActivatedRoute,
        private apiService: ApiService,
        private metadata: AdminEditMetadata,
        private dynamicTableService: DynamicTableService,
        private ref: ChangeDetectorRef
    ) { }
    ngOnInit() {
        // e.g. get leagues from admin/leagues (TODO: check for updates)
        this.tableName = this.route.snapshot.url[0].path;
        // Use /admin/[table name] as api query to query table for data
        this.tableSubscription = this.route.params.subscribe(params => {
            this.apiService.getData(this.tableName, params).subscribe(data => {
                this.tableData = data.data;
                // Add dropdown choices for questions
                this.addQuestionOptions(this.metadata.getQuestions(this.tableName));
            }
            );
        });

        this.dynamicTableService.formPost$.subscribe(form => this.submitForm(form));
        this.dynamicTableService.getRequest$.subscribe(request => this.getData(request));

    }
    ngOnDestroy() {
        this.tableSubscription.unsubscribe();
    }

    // Get question options sourced from other tables
    // i.e. PlayerLeague needs all league values from Leagues
    addQuestionOptions(questions): void {
        let questionOptions = [];
        let requests: Observable<any>[] = [];
        // Get relative questons and compose request string, ignore prepopulated questions
        questions.map(q => {
            if (q.source && 'options' in q && q.options.length === 0) {
                let request = new GetRequest({ table: q.source, params: { unique: [q.alias] } });
                requests.push(this.getRequestSingle(request));
                questionOptions.push(q);
            }
        });
        // If no additional requests to be made
        if (Object.keys(requests).length === 0) {
            this.formQuestions = questions;
            this.ref.detectChanges(); // Changes are not *always* being detected unless this is called
            return;
        }
        // 
        Observable.forkJoin.apply(this, requests).subscribe(responses => {
            let results = {};
            // requests holds at most one request for a table and one column from that table
            // response like {table: 'players', data:[{player_name:'Brian Brown'}]}
            responses.map(response =>
                results[response.table] = response.data.map(obj => _.values(obj)[0]));
            questionOptions.map(q => q.options = results[q.source]);
            this.formQuestions = questions; this.ref.detectChanges(); // Changes are not *always* being detected unless this is called
        });
    }

    getRequestSingle(request: GetRequest): any {
        return this.apiService.getRequest(request);
    }
    getData(request: GetRequest): void {
        this.apiService.getRequest(request).subscribe(
            result => this.dynamicTableService.getResponse(new GetRequest({ success: true, action: request.action, results: result.data })),
            error => this.dynamicTableService.getResponse(new GetRequest({ success: false, message: error }))
        );
    }
    // Send data through api service and post back to dynamic table
    submitForm(form: FormRequest): void {
        switch (form.action) {
            case 'post':
                this.apiService.postData(form.value, this.tableName)
                    .subscribe(
                    result => this.dynamicTableService.postResponse(
                        new FormRequest({ success: true, action: form.action, value: result.data })),
                    error => this.dynamicTableService.postResponse(
                        new FormRequest({ success: false, message: error }))
                    );
                    break;
            case 'put':
                this.apiService.putData(form.value, this.tableName)
                    .subscribe(
                    result => this.dynamicTableService.postResponse(
                        new FormRequest({ success: true, action: form.action, value: result.data })),
                    error => this.dynamicTableService.postResponse(
                        new FormRequest({ success: false, message: error }))
                    );
                    break;
            case 'delete':
                this.apiService.deleteData(form.value['id'], this.tableName)
                    .subscribe(
                    result => this.dynamicTableService.postResponse(
                        new FormRequest({ success: true, action: form.action, value: result.data })),
                    error => this.dynamicTableService.postResponse(
                        new FormRequest({ success: false, message: error }))
                    );
                    break;
        }
    }
}
