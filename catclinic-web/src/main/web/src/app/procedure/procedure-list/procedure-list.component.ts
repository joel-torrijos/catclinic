import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { ProcedureService } from 'src/app/core';

@Component({
  selector: 'app-procedure-list',
  templateUrl: './procedure-list.component.html',
  styleUrls: ['./procedure-list.component.css']
})
export class ProcedureListComponent implements OnInit {
  searchName = '';
  sortOptions = [ {value: 'name', display: 'Name'}];
  sortBy = this.sortOptions[0];

  constructor(private procedureService : ProcedureService,
              private route : ActivatedRoute,
              private router : Router) { }

  response$ = this.route.queryParams
    .pipe(switchMap(
        (queryParams) => {
          let httpParams = new HttpParams({ fromObject: queryParams });
          return this.procedureService.getAll(httpParams);
    }));
  
  ngOnInit() {
    this.router.navigate(['/procedures'], { queryParams: { sort: this.sortBy.value }, queryParamsHandling: 'merge'  });
  }

  onRemoveFilter() {
    this.searchName = '';
  }

  onSearch() {
    this.router.navigate(['/procedures'], { queryParams: 
      { name: this.searchName,
        sort: this.sortBy.value }
      });
  }

  getPageFromService(page) {
    const currentPage = this.route.snapshot.queryParamMap.get('page') ? this.route.snapshot.queryParamMap.get('page') : 0;
    if(+page - 1 !== +currentPage) {
      this.router.navigate(['/procedures'], { queryParams: { page: +page - 1 }, queryParamsHandling: 'merge'  });
    }
  }

}
