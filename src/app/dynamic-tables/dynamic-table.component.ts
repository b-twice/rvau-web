import { Component, OnInit, Input } from '@angular/core';
import { DynamicRowComponent } from './dynamic-row';
import { DynamicFormComponent } from '../forms';
import { TableService } from './dynamic-table.service';
import { FormPost, FormResponse } from '../models';
import { Subscription }   from 'rxjs/Subscription';


@Component({
  selector: 'dynamic-table',
  template: require('./dynamic-table.component.html'),
  styles: [require('./dynamic-table.component.scss')],
  directives: [DynamicRowComponent, DynamicFormComponent],
  providers: []
})
export class DynamicTableComponent implements OnInit {
  @Input() theme;
  @Input() editable: boolean = false;
  @Input() formQuestions: any[];

  private keys: any[]; // column names
  private rows: {}[] = []; // array of row values
  private addedRows: {}[] = []; // rows added while editing
  private editSession: boolean = false;
  private editSessionType: string; // Edit/Add/Delete
  private editId: number; // track row id when editing

  rowsSub: Subscription;
  formSub: Subscription;

  constructor(
    private tableService: TableService) {
  }

  ngOnInit() {

    this.rowsSub = this.tableService.rowsAdded$.subscribe(
      rows => {
        this.keys = Object.keys(rows[0]).filter(key => key !== 'id');
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

  handleFormResponse(response: FormResponse) {
    console.log(response);
    if (response.success) {
      if (this.editSessionType === 'Edit') {
        this.tableService.changeRow(response.value);
        this.editSession = false;
      }
      if (this.editSessionType === 'Add') {
        this.addedRows.push(response.value);
        this.editSession = false;
      }
    }
  }
  onSubmit(event): void {
    let value = event.value;
    if (this.editSessionType === 'Edit') {
      value['id'] = this.editId;
    }
    let form = new FormPost({ editType: this.editSessionType, value: event.value });
    // Edit session type logic
    this.tableService.postForm(form);

  }
}
