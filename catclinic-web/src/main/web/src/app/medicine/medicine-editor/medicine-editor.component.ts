import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MedicineService, Medicine } from 'src/app/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-medicine-editor',
  templateUrl: './medicine-editor.component.html',
  styleUrls: ['./medicine-editor.component.css']
})
export class MedicineEditorComponent implements OnInit {
  medicine: Medicine = {} as Medicine;
  editMode : boolean;
  medicineForm : FormGroup;
  submitted = false;

  constructor(private medicineService : MedicineService,
              private route : ActivatedRoute,
              private location: Location) { }
  
  ngOnInit() {
    this.medicineForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('')
    });

    this.route.paramMap.pipe(switchMap((params) => {
      if(params.get('id') !== null) {
        const id = params.get('id');
        this.editMode = true;
        return this.medicineService.get(id);
      } else {
        this.editMode = false;
        return EMPTY;
      }})
    ).subscribe(patient => {
      this.medicine = patient;
      this.medicineForm.setValue({
        name: this.medicine.name, 
        description: this.medicine.description});
    });
  }

  get f() { return this.medicineForm.controls; }
  
  onSubmit() {
    this.submitted = true;

    if(this.medicineForm.invalid) {
      return;
    }

    this.updateCondition(this.medicineForm.value);

    this.medicineService.save(this.medicine).subscribe((response) => this.goBack());
  }

  updateCondition(values: Object) {
    Object.assign(this.medicine, values);
  }

  goBack() {
    this.location.back();
  }

}
