import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicFormComponent } from '../../forms'
import { MapPipe } from '../dynamic-table.pipes';
import { TableService } from '../dynamic-table.service';
import { Subscription }   from 'rxjs/Subscription';

@Component({
    selector: 'dynamic-row',
    template: require('./dynamic-row.component.html'),
    styles: [require('./dynamic-row.component.scss')],
    directives: [DynamicFormComponent],
    pipes: [MapPipe],
})
export class DynamicRowComponent implements OnInit {
    private keys: any[];
    private activeEditSession: boolean = false;
    @Input() row: {};
    @Input() canEdit: boolean = false;
    @Input() formQuestions:any[];

    constructor(private router: Router,
                private tableService: TableService) {
    }

    ngOnInit() {
         this.keys = Object.keys(this.row).filter(k => k != 'id')
         this.setFormValues()
    }

    setFormValues(): void {
        this.keys.forEach(key => {
            this.formQuestions.forEach(question => {
                if (key === question.key) {
                    question.value = this.row[key]
                }
            })
        })
    }

    startEditing(row): void {
        this.activeEditSession = true;
    }

    cancelEditing(): void {
        this.activeEditSession = false;
    }

    formSubmit(event) {

        // value emited from form in child view

        // Add when API complete
        // let results:League = new League(form.league_type, form.league_year)
        console.log("hello");
        this.tableService.submitForm(event.value);
        // this.leagueService.addLeague(results)
        //   .subscribe((result) => {
        //     if (result) {
        //       this.router.navigate(['Home']);
        //     }
        // });
  }
}