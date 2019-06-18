import { Component, OnInit } from '@angular/core';
import { Condition, ConditionService, Conditions } from 'src/app/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-condition-list',
  templateUrl: './condition-list.component.html',
  styleUrls: ['./condition-list.component.css']
})
export class ConditionListComponent implements OnInit {
  searchName = '';
  sortOptions = [ {value: 'name', display: 'Name'}];
  sortBy = this.sortOptions[0];

  constructor(private conditionService : ConditionService,
              private route : ActivatedRoute,
              private router : Router) { }

  private readonly response$ = this.route.queryParams
    .pipe(switchMap(
        (queryParams) => {
          let httpParams = new HttpParams({ fromObject: queryParams });
          return this.conditionService.getAll(httpParams);
    }));

  ngOnInit() {
    this.router.navigate(['/conditions'], { queryParams: { sort: this.sortBy.value }, queryParamsHandling: 'merge'  });
  }

  onRemoveFilter() {
    this.searchName = '';
  }

  onSearch() {
    this.router.navigate(['/conditions'], { queryParams: 
      { name: this.searchName,
        sort: this.sortBy.value }
      });
  }

  getPageFromService(page) {
    this.router.navigate(['/conditions'], { queryParams: { page: +page -1 }, queryParamsHandling: 'merge'  });
  }

}
