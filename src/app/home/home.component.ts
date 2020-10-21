import { Component, OnInit } from '@angular/core';
import { EmployeeServiceService } from '../employee-service.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { SortEvent } from 'primeng/api';
import { SpecialCharacterPipe } from '../specialCharacterPipe';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  employeeData: any = [];
  cols: any[];
  displayDialog: boolean;
  selectedEmployee: any[];

  constructor(private employeeServiceService: EmployeeServiceService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private pipe: SpecialCharacterPipe) { }

  ngOnInit() {

    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'name', header: 'Name' },
      { field: 'age', header: 'Age' },
      { field: 'dept', header: 'Dept' }
    ];

    this.getAllEmployees();


    //   s(cars => this.cars = cars);
    /* headers = ["ID", "Name", "Age", "Dept"]; 
    rows = [
      {
        "ID": "1",
        "Name": "Rahul",
        "Age": "21",
        "Dept": "sogeti"
      },
      {
        "ID": "2",
        "Name": "Ajay",
        "Age": "25",
        "Dept": "appsNA"
      }
    ] */
  }

  getAllEmployees() {
    this.employeeServiceService.getAllEmployees().subscribe((response: any) => {
      if (response && response.length > 0) {
        this.employeeData = response;
      }
    });
  }

  onRowSelect(event) {
    this.router.navigate(['/employeeDetails'], { state: { data: event.data } });
  }

  addEmployee() {
    this.router.navigate(['/employee']);
  }

  deleteEmployee(rowdata) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed with deleteing the employee record?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.delete(rowdata);
      },
      reject: () => { }
    });
  }

  delete(rowdata) {
    this.employeeServiceService.deleteEmployee(rowdata.id).subscribe((response: any) => {
      this.getAllEmployees();
    }, (error) => {
      console.log('error');
    });
  }

  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = null;

      if (value1 == null && value2 != null)
        result = -1;
      else if (value1 != null && value2 == null)
        result = 1;
      else if (value1 == null && value2 == null)
        result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string')
        result = value1.localeCompare(value2);
      else
        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

      return (event.order * result);
    });
  }


}
