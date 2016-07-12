import { Component, OnInit, OnDestroy, OnChanges, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { DynamicRowComponent } from './dynamic-row';
import { DynamicRowEditComponent } from './dynamic-row-edit';
import { TableService } from './dynamic-table.service';
import { FormRequest, TableRow } from '../models';
import { Subscription }   from 'rxjs/Subscription';
import { LoadingComponent } from '../loading';
import { RowPipe } from './dynamic-table.pipes';
import { FilterMenuComponent } from './filter-menu';

var _ = require('lodash');

@Component({
  selector: 'dynamic-table',
  template: require('./dynamic-table.component.html'),
  styles: [require('./dynamic-table.component.scss')],
  directives: [DynamicRowComponent, DynamicRowEditComponent, FilterMenuComponent, LoadingComponent],
  providers: [],
  pipes: [RowPipe],
  encapsulation: ViewEncapsulation.None,
})
export class DynamicTableComponent implements OnInit, OnDestroy, OnChanges {
  @Input() theme;
  @Input() editable: boolean = false;
  @Input() formQuestions: any[];

  private columnNames: string[] = []; // for display
  private keys: string[] = []; // ordered object keys
  private filterKeys: string[] = []; // list of keys to filter by
  private rows: {}[] = []; // array of row values
  private addedRows: TableRow[] = []; // rows added while editing
  private responseMessage: string;

  rowsSub: Subscription;
  formSub: Subscription;

  constructor(private tableService: TableService) { }

  ngOnInit() {
    this.rowsSub = this.tableService.rowsAdded$.subscribe(
      rows => {
        // For questions that were not provided options
        let questionsToAddOptions = [];
        // Refresh component when query param passed
        this.clearComponent();
        // Not ideal but form questions has column order
        this.formQuestions.map(question => {
          this.keys.push(question.key);
          this.columnNames.push(question.label)
          if (question.filter) {
            this.filterKeys.push(question.key)
          }
        });
        this.rows = rows;
      });

    this.formSub = this.tableService.postResponse$.subscribe(
      response => this.handleFormResponse(response));
  }

  clearComponent() {
    this.keys = [];
    this.columnNames = [];
    this.addedRows = [];
    this.rows = [];
  }
  ngOnChanges() {
    // Cleanup arrays on table change
    this.clearComponent();
  }
  ngOnDestroy() {
    this.rowsSub.unsubscribe();
    this.formSub.unsubscribe();
  }

  addRow(): void {
    this.responseMessage = '';
    this.tableService.startTransaction({});
  }

  // filterRows(): void {
  //   // only generate when called and do it once
  //   if (_.isEmpty(this.filterValues)) {
  //     // not the prettiest implementation
  //     // since objects are references can't use set, map, need a key
  //     let foundValues = [];
  //     for (let r of this.rows) {
  //       let filterSelect = _.pick(r, this.filterKeys)
  //       let key = _.values(filterSelect).toString()
  //       if (foundValues.indexOf(key) == -1) {
  //         this.filterValues.push(filterSelect);
  //         foundValues.push(key);
  //       }
  //     }
  //   }
  // }

  exportToCsv(): void {

  }

  handleFormResponse(response: FormRequest) {
    this.responseMessage = '';
    console.log(response);
    if (!response.success) {
      this.responseMessage = response.message["errors"];
    }
    if (response.success && response.action === 'put') {
      this.tableService.changeRow(new TableRow({ state: 'put', value: response.value }));
    }
    else if (response.action === 'post') {
      console.log(response.value);
      this.addedRows.push(new TableRow({ state: 'post', value: response.value }));
    }
    else if (response.action === 'delete') {
      this.tableService.changeRow(new TableRow({ state: 'delete', value: response.value }));
    }
    this.tableService.closeTransaction(response.value["id"])
    return
  }

}
