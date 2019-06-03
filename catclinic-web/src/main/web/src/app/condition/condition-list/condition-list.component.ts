import { Component, OnInit } from '@angular/core';
import { Condition, ConditionService, Conditions } from 'src/app/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-condition-list',
  templateUrl: './condition-list.component.html',
  styleUrls: ['./condition-list.component.css']
})
export class ConditionListComponent implements OnInit {
  response : Conditions;
  conditions : Condition[];
  pages: number[];

  constructor(private conditionService : ConditionService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.pipe(switchMap(param=> {
      let httpParams = new HttpParams({ fromObject: param });
      return this.conditionService.getAll(httpParams);
    })).subscribe((response : Conditions) => {
      this.response = response;
      this.conditions = response._embedded.conditions;
      this.pages = Array(response.page.totalPages).fill(0).map((x,i) => i);
    });
  }

}
