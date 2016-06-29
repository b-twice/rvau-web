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
  private collection: any[][] = []; // array of row values
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
        this.collection = rows;
      });

    this.formSub = this.tableService.postResponse$.subscribe(
      response => this.handleFormResponse(response))
  }

  ngOnDestroy() {
    this.rowsSub.unsubscribe();
    this.formSub.unsubscribe();
  }

  setFormValues(row, empty:boolean = false): void {
      if (empty) {
        this.formQuestions.forEach(question => question.value = '')
        return
      }
      this.keys.forEach(key => {
          this.formQuestions.forEach(question => {
              if (key === question.key) {
                  question.value = row[key]
              }
          })
      })
  }

  startEditSession(row: {} = {}) {
    let rowEmpty = Object.keys(row).length === 0 ? true : false;
    this.editSessionType = rowEmpty ? "Add": "Edit";
    this.setFormValues(row, rowEmpty);
    this.editSession = true;
    if (!rowEmpty) {
      this.editId =  row["id"]
    }
  }

  handleFormResponse(response: FormResponse) {
    if (response.editType === "Edit") {
        response.value["id"] = this.editId;
        this.tableService.changeRow(response.value);
    }
    if (response.editType === "Add") {
      // this.tableService.submitForm(event.value);
    }
  }
  onSubmit(event): void {
    let form = new FormPost({editType: this.editSessionType, value:event.value});
    // Edit session type logic
    this.tableService.postForm(event.value);

  }
}
