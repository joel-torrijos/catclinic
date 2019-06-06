import { Component, OnInit } from '@angular/core';
import { Condition, ConditionService } from 'src/app/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-condition-editor',
  templateUrl: './condition-editor.component.html',
  styleUrls: ['./condition-editor.component.css']
})
export class ConditionEditorComponent implements OnInit {
  condition: Condition = {} as Condition;
  editMode : boolean;
  conditionForm : FormGroup;
  submitted = false;

  constructor(private conditionService : ConditionService,
              private route : ActivatedRoute,
              private location: Location) { }
  
  ngOnInit() {
    this.conditionForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    });

    this.route.paramMap.pipe(switchMap((params) => {
      if(params.get('id') !== null) {
        const id = params.get('id');
        this.editMode = true;
        return this.conditionService.get(id);
      } else {
        this.editMode = false;
        return EMPTY;
      }})
    ).subscribe(patient => {
      this.condition = patient;
      this.conditionForm.setValue({
        name: this.condition.name, 
        description: this.condition.description});
    });
  }

  get f() { return this.conditionForm.controls; }
  
  onSubmit() {
    this.submitted = true;

    if(this.conditionForm.invalid) {
      return;
    }

    this.updateCondition(this.conditionForm.value);

    this.conditionService.save(this.condition).subscribe((response) => this.goBack());
  }

  updateCondition(values: Object) {
    Object.assign(this.condition, values);
  }

  goBack() {
    this.location.back();
  }

}
