import { Component, OnInit, OnDestroy, Input, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterMenuPipe } from '../dynamic-table.pipes';
import { TableService } from '../dynamic-table.service'
import { Subscription }   from 'rxjs/Subscription';
import { GetRequest } from '../../models'

@Component({
    selector: 'filter-menu',
    providers: [],
    directives: [],
    template: require('./filter-menu.component.html'),
    styles: [require('./filter-menu.component.scss')],
    pipes: [FilterMenuPipe],

})
export class FilterMenuComponent implements OnInit, OnDestroy {

    @Input() filterKeys: string[];
    private rows: any[];
    private filterActivated: boolean = false;
    private routePath: string;
    private routeSub: Subscription
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private tableService: TableService
    ) { }



    @HostListener('mouseenter') onMouseEnter() {
        this.filterActivated = true;
    }
    @HostListener('mouseleave') onMouseLeave() {
        this.filterActivated = false;
    }

    ngOnInit() {
        // e.g. get leagues from admin/leagues (seems ugly)
            // this.router.subscribe(currentUrl => )
        this.routePath = this.router.url;
        this.routeSub = this.route.params.subscribe(routeParams => {
            if (!routeParams || !this.rows ) {
            let req: GetRequest = new GetRequest(
                { table:this.route.snapshot.url[0].path, params: { unique: this.filterKeys.join(",") }, action: 'filter' }
            )
            this.tableService.getRequest(req)
            this.tableService.getFilterResponse$.subscribe(response => this.rows = response.results)
            }
        })
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
