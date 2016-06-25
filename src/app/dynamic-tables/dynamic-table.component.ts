import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicTable } from './';


@Component({
  selector: 'dynamic-table',
  template: require('./dynamic-table.component.html'),
  styles: [require('./dynamic-table.component.scss')],
  directives: [],
  providers: []
})
export class DynamicTableComponent implements OnInit {
  // @Input() table: DynamicTable;
  @Input() keys;
  @Input() values;
  @Input() theme;
  @Input() editable: boolean = true;

  routePath: string = ''; // get path

  constructor(private router: Router) {
  }

  ngOnInit() {
    console.log("In dynamic table")
    if (this.editable) {
      this.trackRoutePath()
    }

  }

  trackRoutePath(): void {
    this.router
      .events
      .subscribe(e => {this.routePath = e.url; console.log(e)})
  }
}