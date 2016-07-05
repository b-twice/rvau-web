import { Component } from '@angular/core';
import { UserMetadataService } from './';
import { UserHeaderComponent } from './header';
@Component({
  selector: 'user',
  template: require('./user.component.html'),
  directives: [UserHeaderComponent],
  providers: [UserMetadataService]
})
export class UserComponent{ 
    constructor(){}
}