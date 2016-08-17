import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services';

@Component({
  selector: 'dashboard-home',
  template: require('./home.component.html'),
  styles: [require('./home.component.scss')],
})
export class HomeComponent implements OnInit {

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    // this.apiService.getData("teams", true ).subscribe(data => console.log(data))
  }

}
