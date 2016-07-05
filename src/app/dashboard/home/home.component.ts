import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header';
import { ApiService } from '../../services';

@Component({
  selector: 'dashboard-home',
  directives: [HeaderComponent],
  template: require('./home.component.html'),
  styles: [require('./home.component.scss')],
  providers: [ApiService]
})
export class HomeComponent implements OnInit {

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
  }

}
