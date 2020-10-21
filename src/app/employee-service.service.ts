import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, debounceTime } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  constructor(private http: HttpClient) { }

  /*  getAllEmployees() {
     const reqUrl = 'http://localhost:8080/employee';
     return this.http.get(reqUrl, {});
   } */

  getAllEmployees(): Observable<any[]> {
    const reqUrl = 'http://localhost:8080/employee';
    return this.http.get<any[]>(reqUrl, {}).pipe(
      //     debounceTime(1000),
      map((data: any) => {
        if (data) {
          return data;
        } else {
          return [];
        }
      })
    );
  }

  /*  createEmployee(createEmployee) {
     const reqUrl = 'http://localhost:8080/create';
     return this.http.post(reqUrl, createEmployee);
   }
  */
  createEmployee(createEmployee) {
    const reqUrl = 'http://localhost:8080/create';
    return this.http.post(reqUrl, createEmployee, { observe: 'response' });
  }

  deleteEmployee(id) {
    const reqUrl = 'http://localhost:8080/delete/' + id;
    return this.http.delete(reqUrl);
  }
}
