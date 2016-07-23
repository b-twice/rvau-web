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
import { Observable } from "rxjs/Observable";
import { LoadingComponent } from '../../loading'


var _ = require('lodash');
@Component({
    selector: 'admin-panel',
    template: require('./admin-panel.component.html'),
    providers: [ApiService, AdminEditMetadata, TableService],
    directives: [DynamicTableComponent, AdminNavComponent, LoadingComponent],
    styles: [require('./admin-panel.component.scss')]
})
export class AdminPanelComponent implements OnInit, OnDestroy {

    private tableMap = Tables;
    private tableSubscription: Subscription;
    private tableName: string; // name of active table
    private tableTheme: string = 'light-theme'; // dynamic table theme
    private activeEditing: boolean = true;
    private formQuestions: {}[];
    private tableData: {}[];

    constructor(
        private route: ActivatedRoute,
        private apiService: ApiService,
        private metadata: AdminEditMetadata,
        private tableService: TableService
    ) { }
    ngOnInit() {
        // e.g. get leagues from admin/leagues (seems ugly)
        this.tableName = this.route.snapshot.url[0].path;

        this.tableSubscription = this.route.params.subscribe(params => {
            this.apiService.getData(this.tableName, params).subscribe(data => {
                this.tableData = data.data
                if (this.activeEditing) {
                    this.addQuestionOptions(this.metadata.getQuestions(this.tableName))
                }
            }
            )
        });

        this.tableService.formPost$.subscribe(form => this.submitForm(form));
        this.tableService.getRequest$.subscribe(request => this.getData(request));

    }
    ngOnDestroy() {
        this.tableSubscription.unsubscribe();
    }

    addQuestionOptions(questions): void {
        let questionOptions = [];
        let requests: Observable<any>[] = [];
        questions.map(q => {
            if (q.source && 'options' in q && q.options.length === 0) {
                let columnName = q.alias ? q.alias : q.key
                let request = new GetRequest({ table: q.source, params: { unique: [columnName] } })
                requests.push(this.getRequestSingle(request))
                questionOptions.push(q);
            }
        })
        if (Object.keys(requests).length === 0) {
            this.formQuestions = questions
            return
        }
        console.log(requests);
        Observable.forkJoin.apply(this, requests).subscribe(responses => {
            let results = {}
            // requests holds at most one request for a table and one column from that table
            // response like {table: 'players', data:[{player_name:'Brian Brown'}]}
            responses.map(response => 
            results[response.table] = response.data.map(obj => _.values(obj)[0]));
            questionOptions.map(q => q.options = results[q.source]);
            this.formQuestions = questions;
        })
    }

    requestQuestionOptions(question): void {

    }
    addQuestionOptionsDeprecated(questions): void {
        // get an obj of all the tables and columns to query
        let questionsToAdd = {}; // 
        let tablesToSearch = {}; // e.g. {'Leagues': ['league_type', 'league_year']}
        for (let question of questions) {
            if ('options' in question && 'source' && question["options"].length === 0) {
                if (!(question['source'] in tablesToSearch)) {
                    tablesToSearch[question['source']] = [];
                }
                if (!(question['alias'] in questionsToAdd)) {
                    questionsToAdd[question['alias']] = []
                }
                tablesToSearch[question['source']].push(question["alias"]);
                questionsToAdd[question['alias']].push(question)
            }
        }
        if (Object.keys(questionsToAdd).length === 0) {
            this.formQuestions = questions;
            return
        }
        // collect observables of each request
        let requests: Observable<any>[] = [];
        for (let key of Object.keys(tablesToSearch)) {
            let uniqueColumns: string[] = []
            tablesToSearch[key].forEach(v => uniqueColumns.push(v));
            let request = new GetRequest({ table: key, params: { unique: uniqueColumns } })
            requests.push(this.getRequestSingle(request))
        }
        // apply the request observables and merge as a stream
        console.log(requests)
        Observable.forkJoin.apply(this, requests).subscribe(responses => {
            // go through responses from api
            responses.map(response =>
                // for each response is an array of data
                response.data.map(data =>
                    // use the keys to access quesiton, obj properties
                    Object.keys(data).map(key => {
                        // ignore id column or anything else brought by api
                        console.log(key);
                        console.log(questionsToAdd[key]);
                        if (key in questionsToAdd) {
                            questionsToAdd[key].map(question => {
                                console.log(questionsToAdd[key]);
                                if (question.options.indexOf(data[key]) === -1) {
                                    question.options.push(data[key])
                                }
                            }
                            )
                        }
                    }
                    )
                )
            );
            this.formQuestions = questions;
        }
        )
    }

    getRequestSingle(request: GetRequest): any {
        return this.apiService.getRequest(request)
    }
    getData(request: GetRequest): void {
        this.apiService.getRequest(request).subscribe(
            result => this.tableService.getResponse(new GetRequest({ success: true, action: request.action, results: result.data })),
            error => this.tableService.getResponse(new GetRequest({ success: false, message: error }))
        );
    }
    submitForm(form: FormRequest): void {
        if (form.action === 'post') {
            this.apiService.postData(form.value, this.tableName)
                .subscribe(
                result => this.tableService.postResponse(new FormRequest({ success: true, action: form.action, value: result.data })),
                error => this.tableService.postResponse(new FormRequest({ success: false, message: error }))
                );
        }
        if (form.action === 'put') {
            this.apiService.putData(form.value, this.tableName)
                .subscribe(
                result => this.tableService.postResponse(new FormRequest({ success: true, action: form.action, value: result.data })),
                error => this.tableService.postResponse(new FormRequest({ success: false, message: error }))
                );
        }
        if (form.action === 'delete') {

            this.apiService.deleteData(form.value['id'], this.tableName)
                .subscribe(
                result => this.tableService.postResponse(new FormRequest({ success: true, action: form.action, value: result.data })),
                error => this.tableService.postResponse(new FormRequest({ success: false, message: error }))
                );
        }
    }
}
