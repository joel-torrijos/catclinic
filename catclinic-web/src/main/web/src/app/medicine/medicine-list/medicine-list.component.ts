import { Component, OnInit } from '@angular/core';
import { MedicineService } from 'src/app/core/services/medicine.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-medicine-list',
  templateUrl: './medicine-list.component.html',
  styleUrls: ['./medicine-list.component.css']
})
export class MedicineListComponent implements OnInit {
  searchName = '';
  sortOptions = [ {value: 'name', display: 'Name'}];
  sortBy = this.sortOptions[0];

  constructor(private medicineService : MedicineService,
              private route : ActivatedRoute,
              private router : Router) { }

  response$ = this.route.queryParams
    .pipe(switchMap(
        (queryParams) => {
          let httpParams = new HttpParams({ fromObject: queryParams });
          return this.medicineService.getAll(httpParams);
    }));
  
  ngOnInit() {
    this.router.navigate(['/medicines'], { queryParams: { sort: this.sortBy.value }, queryParamsHandling: 'merge'  });
  }

  onRemoveFilter() {
    this.searchName = '';
  }

  onSearch() {
    this.router.navigate(['/medicines'], { queryParams: 
      { name: this.searchName,
        sort: this.sortBy.value }
      });
  }

  getPageFromService(page) {
    const currentPage = this.route.snapshot.queryParamMap.get('page') ? this.route.snapshot.queryParamMap.get('page') : 0;
    if(+page - 1 !== +currentPage) {
      this.router.navigate(['/medicines'], { queryParams: { page: +page - 1 }, queryParamsHandling: 'merge'  });
    }
  }

}
