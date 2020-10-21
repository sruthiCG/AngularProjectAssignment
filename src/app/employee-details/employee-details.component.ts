import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  stateParams: any;
  employeeData: any = {};

  constructor(private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.stateParams = history.state.data;
    this.employeeData = this.stateParams
  }

  back() {
    this.router.navigate(['/']);
  }

}
