
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from "employee/employee.service";
import { IEmployee } from "employee/employee";

@Component({
       templateUrl: 'business-manager-list.component.html'
})

export class BusinessManagerComponent implements OnInit{
    constructor(private _employeeService: EmployeeService) { }

    employees: IEmployee[];
    employee: IEmployee;
    errorMessage: string;



    ngOnInit(): void{
        this._employeeService.getBusinessManager()
                .subscribe(employees => this.employees = employees,
                            error =>  this.errorMessage = <any>error);
    } 

    deleteBusinessManager(employeeId: number): void{
         this._employeeService.deleteBusinessManager(employeeId)
                 .subscribe(employee => this.employee = employee,
                            error =>  this.errorMessage = <any>error);
    }

   

}