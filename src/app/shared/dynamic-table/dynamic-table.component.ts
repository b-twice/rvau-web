import { Component, OnInit, OnDestroy, Input, ViewEncapsulation } from '@angular/core';
import { DynamicTableService } from './dynamic-table.service';
import { TableRow } from './dynamic-table.models';
import { FormRequest } from '../request-models';
import { Subscription }   from 'rxjs/Subscription';

@Component({
  selector: 'dynamic-table',
  template: require('./dynamic-table.component.html'),
  styles: [require('./dynamic-table.component.scss')],
  encapsulation: ViewEncapsulation.None,
})
export class DynamicTableComponent implements OnInit, OnDestroy {
  @Input() theme;
  @Input() editable: boolean = false;
  @Input() formQuestions: any[];
  @Input() rows: {}[];

  private columnNames: string[] = []; // for display
  private filterKeys: string[] = []; // list of keys to filter by
  private keys:string[] = [];
  private addedRows: TableRow[] = []; // rows added while editing
  private responseMessage: string;

  formSub: Subscription;

  constructor(private tableService: DynamicTableService) { }

  ngOnInit() {
    // Not ideal but form questions has column order
    this.formQuestions.map(question => {
      this.keys.push(question.key)
      this.columnNames.push(question.label);
      if (question.filter) {
        this.filterKeys.push(question.key);
      }
    });
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
      this.responseMessage = response.message['errors'];
    }
    if (response.success && response.action === 'put') {
      this.tableService.changeRow(new TableRow({ state: 'put', value: response.value }));
    }
    else if (response.action === 'post') {
      this.addedRows.push(new TableRow({ state: 'post', value: response.value[0] }));
    }
    else if (response.action === 'delete') {
      this.tableService.changeRow(new TableRow({ state: 'delete', value: response.value }));
    }
    this.tableService.closeTransaction(response.value['id']);
    return;
  }

}
