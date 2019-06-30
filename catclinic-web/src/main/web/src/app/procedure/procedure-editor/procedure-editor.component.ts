import { Component, OnInit } from '@angular/core';
import { ProcedureService, Procedure } from 'src/app/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-procedure-editor',
  templateUrl: './procedure-editor.component.html',
  styleUrls: ['./procedure-editor.component.css']
})
export class ProcedureEditorComponent implements OnInit {
  procedure: Procedure = {} as Procedure;
  editMode : boolean;
  procedureForm : FormGroup;
  submitted = false;

  constructor(private procedureService : ProcedureService,
              private route : ActivatedRoute,
              private location: Location) { }
  
  ngOnInit() {
    this.procedureForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('')
    });

    this.route.paramMap.pipe(switchMap((params) => {
      if(params.get('id') !== null) {
        const id = params.get('id');
        this.editMode = true;
        return this.procedureService.get(id);
      } else {
        this.editMode = false;
        return EMPTY;
      }})
    ).subscribe(patient => {
      this.procedure = patient;
      this.procedureForm.setValue({
        name: this.procedure.name, 
        description: this.procedure.description});
    });
  }

  get f() { return this.procedureForm.controls; }
  
  onSubmit() {
    this.submitted = true;

    if(this.procedureForm.invalid) {
      return;
    }

    this.updateCondition(this.procedureForm.value);

    this.procedureService.save(this.procedure).subscribe((response) => this.goBack());
  }

  updateCondition(values: Object) {
    Object.assign(this.procedure, values);
  }

  goBack() {
    this.location.back();
  }

}