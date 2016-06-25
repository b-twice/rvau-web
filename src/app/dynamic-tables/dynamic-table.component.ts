import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicTable } from './';
import { MapPipe } from './dynamic-table.pipe';


@Component({
  selector: 'dynamic-table',
  template: require('./dynamic-table.component.html'),
  styles: [require('./dynamic-table.component.scss')],
  directives: [],
  providers: [],
  pipes: [MapPipe]
})
export class DynamicTableComponent implements OnInit {
  @Input() theme;
  @Input() editable: boolean = true;
  private keys: any[]; // column names
  private collection: any[][] = []; // array of row values

  routePath: string = ''; // get path

  constructor(private router: Router) {
    if (this.editable) {
      this.trackRoutePath()
    }
  }

  ngOnInit() {
  }

  trackRoutePath(): void {
    this.router
      .events
      .subscribe(e => this.routePath = `${e.url}/edit/`)
  }

  setData(data) {
    // only assumption is data contains id field
    // TODO add id check
    this.keys = Object.keys(data[0]).filter(key => key != 'id');
    this.collection = data;
  }
}