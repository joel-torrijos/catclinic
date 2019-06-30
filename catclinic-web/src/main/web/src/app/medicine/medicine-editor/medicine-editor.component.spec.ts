import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineEditorComponent } from './medicine-editor.component';

describe('MedicineEditorComponent', () => {
  let component: MedicineEditorComponent;
  let fixture: ComponentFixture<MedicineEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicineEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicineEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
