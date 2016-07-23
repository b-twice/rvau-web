import { Component, OnInit, OnDestroy, OnChanges, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { DynamicRowComponent } from './dynamic-row';
import { DynamicRowEditComponent } from './dynamic-row-edit';
import { TableService } from './dynamic-table.service';
import { FormRequest, TableRow } from '../models';
import { Subscription }   from 'rxjs/Subscription';
import { RowPipe } from './dynamic-table.pipes';
import { FilterMenuComponent } from './filter-menu';

@Component({
  selector: 'dynamic-table',
  template: require('./dynamic-table.component.html'),
  styles: [require('./dynamic-table.component.scss')],
  directives: [DynamicRowComponent, DynamicRowEditComponent, FilterMenuComponent],
  providers: [],
  pipes: [RowPipe],
  encapsulation: ViewEncapsulation.None,
})
export class DynamicTableComponent implements OnInit, OnDestroy {
  @Input() theme;
  @Input() editable: boolean = false;
  @Input() formQuestions: any[];
  @Input() rows: {}[];

  private columnNames: string[] = []; // for display
  private keys: string[] = []; // ordered object keys
  private filterKeys: string[] = []; // list of keys to filter by
  private addedRows: TableRow[] = []; // rows added while editing
  private responseMessage: string;

  formSub: Subscription;

  constructor(private tableService: TableService) { }

  ngOnInit() {
    // Not ideal but form questions has column order
    this.formQuestions.map(question => {
      this.keys.push(question.key);
      this.columnNames.push(question.label)
      if (question.filter) {
        this.filterKeys.push(question.key)
      }
    })
    this.formSub = this.tableService.postResponse$.subscribe(
      response => this.handleFormResponse(response));
  }

  ngOnDestroy() {
    this.formSub.unsubscribe();
  }

  addRow(): void {
    this.responseMessage = '';
    this.tableService.startTransaction({});
  }

  exportToCsv(): void {

  }

  handleFormResponse(response: FormRequest) {
    this.responseMessage = '';
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
