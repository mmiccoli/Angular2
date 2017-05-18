import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http'

import { Observable } from 'rxjs/Observable';
import { IEmployee } from "employee/employee";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/Rx';

import { Router, ActivatedRoute } from "@angular/router";
import { IRole } from "employee/role";

@Injectable()
export class EmployeeService {
    
    private url = 'http://127.0.0.1:8080/employee';
    private url_business_manager = 'http://127.0.0.1:8080/business_manager';
    private url_role = 'http://127.0.0.1:8080/role';

    constructor(private _http: Http, private _router: Router) { }

    getEmployees(): Observable<IEmployee[]> {
        return this._http.get(this.url)
            .map((response: Response)  => <IEmployee[]>response.json())        
            .do( data => console.log('employees: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }


    getEmployeeById(id: number): Observable<IEmployee> {
        return this._http.get(this.url + 'ById?id=' + id)
            .map((response: Response) => response.json() as IEmployee)
            .do( data => console.log('employeeDetail: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    deleteEmployee(employeeId: number): Observable<IEmployee>{
        return this._http.get(this.url + '/delete?employeeId=' + employeeId)
            .map((response: Response)  => <IEmployee[]>response.json())        
            .do( data => console.log('deleted: ' + JSON.stringify(data)))
            .catch(this.handleError);
         
    }


    editEmployee(employee: IEmployee): Observable<IEmployee>{
        return this._http.get(this.url + '/edit?id=' + employee.employeeId + '&name=' + employee.name + '&surname=' + employee.surname + 
                              '&photo=' + employee.photo + '&photoPath=' + employee.photoPath + '&roleId=' + employee.role.roleId)
                .map((response: Response) => employee = response.json() as IEmployee)
                .do( data => console.log('employee updated: ' + JSON.stringify(data)))
                .catch(this.handleError);
    }



    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError = function(error: Response){
        console.log(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    getRoles(): Observable<IRole[]> {
        return this._http.get(this.url_role)
            .map((response: Response)  => <IRole[]>response.json())        
            .do( data => console.log('roles: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    editRole(role: IRole): Observable<IRole>{
        return this._http.get(this.url_role + '/edit?id=' + role.roleId + '&description=' + role.description)
            .map((response: Response) => role = <IRole>response.json())
            .do( data => console.log('role updated/added: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    deleteRole(roleId: number): Observable<IRole>{
        return this._http.get(this.url_role + '/delete?id=' + roleId)
            .map((response: Response)  => <IRole[]>response.json())        
            .do( data => console.log('deleted: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }


    getBusinessManager(): Observable<IEmployee[]> {
        return this._http.get(this.url_business_manager)
            .map((response: Response)  => <IEmployee[]>response.json())        
            .do( data => console.log('employees: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }
    

    deleteBusinessManager(employeeId: number): Observable<IEmployee>{
        return this._http.get(this.url_business_manager + '/delete?employeeId=' + employeeId)
            .map((response: Response)  => <IEmployee[]>response.json())        
            .do( data => console.log('deleted: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }



    postFormData(file: File, employee: IEmployee) {
        return Observable.fromPromise(new Promise((resolve, reject) => {
        let formData: any = new FormData()
        let xhr = new XMLHttpRequest()

        formData.append("file", file, file.name)

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                resolve(xhr.response)
            } else {
                reject(xhr.response)
            }
            }
        }
        xhr.open("POST", this.url + '/upload/photo', true);
        xhr.send(formData)
    }));

    }


}
