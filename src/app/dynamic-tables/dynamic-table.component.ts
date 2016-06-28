import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicTable } from './';
import { DynamicRowComponent } from './dynamic-row';
import { TableService } from './dynamic-table.service';
import { Subscription }   from 'rxjs/Subscription';


@Component({
  selector: 'dynamic-table',
  template: require('./dynamic-table.component.html'),
  styles: [require('./dynamic-table.component.scss')],
  directives: [DynamicRowComponent],
  providers: [TableService]
})
export class DynamicTableComponent implements OnInit {
  @Input() theme;
  @Input() editable: boolean = false;
  @Input() questions: {}[];
  private keys: any[]; // column names
  private collection: any[][] = []; // array of row values

  subscription: Subscription;
  constructor(private router: Router,
    private tableService: TableService) {

    this.subscription = tableService.formSubmitted$.subscribe(
      form => {
      });
  }

  ngOnInit() {
  }

  ngOnDestryo() {
    this.subscription.unsubscribe();
  }

  setData(data) {

    this.keys = Object.keys(data[0]).filter(key => key !== 'id');
    this.collection = data
  }

}