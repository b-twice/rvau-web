import { Component, OnInit, Input } from '@angular/core';
import { DynamicRowComponent } from './dynamic-row';
import { DynamicFormComponent } from '../forms';
import { TableService } from './dynamic-table.service';
import { FormPost, FormResponse } from '../models';
import { Subscription }   from 'rxjs/Subscription';
import { LoadingComponent } from '../loading';


@Component({
  selector: 'dynamic-table',
  template: require('./dynamic-table.component.html'),
  styles: [require('./dynamic-table.component.scss')],
  directives: [DynamicRowComponent, DynamicFormComponent, LoadingComponent],
  providers: []
})
export class DynamicTableComponent implements OnInit {
  @Input() theme;
  @Input() editable: boolean = false;
  @Input() formQuestions: any[];

  private columnNames: any[]; // for display
  private keys: any[]; // ordered object keys
  private rows: {}[] = []; // array of row values
  private addedRows: {}[]; // rows added while editing
  private editSession: boolean = false;
  private editSessionType: string; // Edit/Add/Delete
  private editId: number; // track row id when editing
  private dataTransaction: boolean = false; // Data being sent down the wire
  private responseMessage: string;

  rowsSub: Subscription;
  formSub: Subscription;

  constructor(
    private tableService: TableService) {
  }

  ngOnInit() {
    this.rowsSub = this.tableService.rowsAdded$.subscribe(
      rows => {
        // only way to clean up arrays on route change....
        this.keys = [];
        this.columnNames = [];
        this.addedRows = [];
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

  ngOnDestroy() {
    this.rowsSub.unsubscribe();
    this.formSub.unsubscribe();
  }

  setFormValues(row, empty: boolean = false): void {
    if (empty) {
      this.formQuestions.forEach(question => question.value = '');
      return
    }
    // Set question value if key exists in keys
    this.formQuestions.forEach(question => {
      if (this.keys.indexOf(question.key) !== -1) {
        question.value = row[question.key];
      }
    })
  }

  startEditSession(row: {} = {}) {
    let rowEmpty = Object.keys(row).length === 0 ? true : false;
    this.editSessionType = rowEmpty ? 'Add' : 'Edit';
    this.setFormValues(row, rowEmpty);
    this.editSession = true;
    if (!rowEmpty) {
      this.editId = row['id'];
    }
  }

  stopEditSession(): void {
    if (!this.dataTransaction) {
      this.editSession = false;
    }
  }

  handleFormResponse(response: FormResponse) {
    if (!response.success) {
      this.responseMessage = response.message;
    }
    else if (this.editSessionType === 'Edit') {
      this.tableService.changeRow(response.value);
    }
    else if (this.editSessionType === 'Add') {
      this.addedRows.push(response.value);
    }
    this.dataTransaction = false;
    this.editSession = false;
    return
  }

  deleteRow() {
    this.editSessionType = "Delete"
    let form = new FormPost({ editType: this.editSessionType, value: {id: this.editId}})
    this.tableService.postForm(form);
  }
  
  onSubmit(event): void {
    let value = event.value;
    if (this.editSessionType === 'Edit') {
      value['id'] = this.editId;
    }
    let form = new FormPost({ editType: this.editSessionType, value: event.value });
    this.dataTransaction = true;
    this.tableService.postForm(form);

  }
}
