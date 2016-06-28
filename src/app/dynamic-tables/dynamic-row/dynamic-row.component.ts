import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicFormComponent } from '../../forms'
import { MapPipe } from '../dynamic-table.pipes';


@Component({
    selector: 'dynamic-row',
    template: require('./dynamic-row.component.html'),
    styles: [require('./dynamic-row.component.scss')],
    directives: [DynamicFormComponent],
    providers: [],
    pipes: [MapPipe],
})
export class DynamicRowComponent implements OnInit {
    private keys: any[];
    private activeEditSession: boolean = false;
    @Input() row: {};
    @Input() canEdit: boolean = false;
    @Input() formQuestions:any[];

    constructor(private router: Router) {
    }

    ngOnInit() {
         this.keys = Object.keys(this.row).filter(k => k != 'id')
         console.log(this.formQuestions);
         console.log(this.canEdit)
    }

    startEditing(row) {
        this.activeEditSession = true;
        return
    }
    cancelEditing() {
        this.activeEditSession = false;
    }

    formSubmit(event) {

    // value emited from form in child view
    let form = event.value;

    // Add when API complete
    // let results:League = new League(form.league_type, form.league_year)

    console.log(form.league_type);
    // this.leagueService.addLeague(results)
    //   .subscribe((result) => {
    //     if (result) {
    //       this.router.navigate(['Home']);
    //     }
    // });
  }
}