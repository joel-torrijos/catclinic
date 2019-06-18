import { Component, OnInit } from '@angular/core';
import { Patients, Patient } from 'src/app/core';
import { PatientService } from 'src/app/core/services';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, combineLatest } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  searchFirstName = '';
  searchLastName = '';
  sortOptions = [ {value: 'firstName', display: 'First Name'},
                  {value: 'lastName', display: 'Last Name'}];
  sortBy = this.sortOptions[1];

  constructor(private patientService : PatientService,
              private route: ActivatedRoute,
              private router : Router) { }

  private readonly response$ = this.route.queryParams
    .pipe(switchMap(
        (queryParams) => {
          let httpParams = new HttpParams({ fromObject: queryParams });
          return this.patientService.getAll(httpParams);
    }));

  ngOnInit() {
    this.router.navigate(['/patients'], { queryParams: { sort: this.sortBy.value }, queryParamsHandling: 'merge'  });
  }

  onRemoveFilter() {
    this.searchFirstName = '';
    this.searchLastName = '';
    this.sortBy = this.sortOptions[1];
  }

  onSearch() {
    this.router.navigate(['/patients'], { queryParams: 
      { firstName: this.searchFirstName, 
        lastName:  this.searchLastName,
        sort: this.sortBy.value }
      });
  }

  getPageFromService(page) {
    this.router.navigate(['/patients'], { queryParams: { page: +page -1 }, queryParamsHandling: 'merge'  });
  }
}
