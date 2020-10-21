import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeServiceService } from '../employee-service.service';
import { SpecialCharacterPipe } from '../specialCharacterPipe';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  createEmployeeForm: FormGroup;
  items: FormArray;

  constructor(private router: Router,
    private employeeServiceService: EmployeeServiceService,
    private pipe: SpecialCharacterPipe,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createEmployeeForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      displayDept: new FormControl(''),
      items: this.formBuilder.array([])
    });

    this.createEmployeeForm.get('displayDept').valueChanges.subscribe((value) => {
      this.onCheckboxChange(value)
    })
  }

  addItem(): void {
    this.items = this.createEmployeeForm.get('items') as FormArray;
    this.items.push(this.createItem());
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      dept: ''
    });
  }

  removeItem(i: number) {
    this.items.removeAt(i);
  }

  onCheckboxChange(value) {
    // If the checkbox is checked, display the dept div
    if (value) {
      this.addItem();
    } else {
      this.removeItem(0);
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    if (this.createEmployeeForm.valid) {
      let createEmployee = <any>{};

      if (this.createEmployeeForm.controls['id'].value != null) {
        createEmployee.id = this.createEmployeeForm.controls['id'].value;
      }

      if (this.createEmployeeForm.controls['name'].value != null) {
        createEmployee.name = this.pipe.transform(this.createEmployeeForm.controls['name'].value);
      }

      if (this.createEmployeeForm.controls['age'].value != null) {
        createEmployee.age = this.createEmployeeForm.controls['age'].value;
      }

      let deptValue = '';
      for (let i = 0; i < this.items.length; i++) {
        //   console.log(this.items.at(i).value);
        deptValue = this.items.at(i).value.dept;
      }

      if (deptValue != null) {
        createEmployee.dept = deptValue;
      }

      this.employeeServiceService.createEmployee(createEmployee).subscribe((response: any) => {
        if (response) {
          this.router.navigate(['/']);
        }
      }, (error) => {
        console.log('error');
      });

    }
  }

}
