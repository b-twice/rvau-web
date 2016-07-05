import { Component, OnInit, OnDestroy, OnChanges, Input, ViewChild } from '@angular/core';
import { DynamicRowComponent } from './dynamic-row';
import { DynamicRowEditComponent } from './dynamic-row-edit';
import { TableService } from './dynamic-table.service';
import { FormRequest, TableRow } from '../models';
import { Subscription }   from 'rxjs/Subscription';
import { LoadingComponent } from '../loading';
import { RowPipe } from './dynamic-table.pipes';


@Component({
  selector: 'dynamic-table',
  template: require('./dynamic-table.component.html'),
  styles: [require('./dynamic-table.component.scss')],
  directives: [DynamicRowComponent, DynamicRowEditComponent, LoadingComponent],
  providers: [],
  pipes: [RowPipe]
})
export class DynamicTableComponent implements OnInit, OnDestroy, OnChanges {
  @Input() theme;
  @Input() editable: boolean = false;
  @Input() formQuestions: any[];

  private columnNames: any[] = []; // for display
  private keys: any[] = []; // ordered object keys
  private rows: {}[] = []; // array of row values
  private addedRows: TableRow[] = []; // rows added while editing
  private responseMessage: string;

  rowsSub: Subscription;
  formSub: Subscription;

  constructor( private tableService: TableService ) { }

  ngOnInit() {
    this.rowsSub = this.tableService.rowsAdded$.subscribe(
      rows => {
        // Not ideal but form questions has column order
        this.formQuestions.map(question => { 
          this.keys.push(question.key);
          this.columnNames.push(question.label)
        });
        this.rows = rows;
      });

    this.formSub = this.tableService.postResponse$.subscribe(
      response => this.handleFormResponse(response));
  }

  ngOnChanges() {
    // Cleanup arrays on table change
    this.keys = [];
    this.columnNames = [];
    this.addedRows = [];
    this.rows = [];
  }
  ngOnDestroy() {
    this.rowsSub.unsubscribe();
    this.formSub.unsubscribe();
  }

  addRow(): void {
    this.tableService.startTransaction({});
  }
  handleFormResponse(response: FormRequest) {
    console.log(response);
    if (!response.success) {
      this.responseMessage = response.message;
    }
    if (response.success && response.action === 'put') {
      this.tableService.changeRow(new TableRow({state: 'put', value:response.value}));
    }
    else if (response.action === 'post') {
      this.addedRows.push(new TableRow({state: 'post', value:response.value}));
    }
    else if (response.action === 'delete') {
      this.tableService.changeRow(new TableRow({state: 'delete', value:response.value}));
    }
    this.tableService.closeTransaction(response.value["id"])
    return
  }

}
