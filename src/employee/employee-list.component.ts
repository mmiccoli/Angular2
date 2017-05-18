
import { Component, OnInit, ViewChild, ElementRef, HostListener, HostBinding, AfterViewChecked } from '@angular/core';
import { EmployeeService } from "employee/employee.service";
import { IEmployee } from "employee/employee";

@Component({
       templateUrl: 'employee-list.component.html'
})

export class employeeComponent implements OnInit{


    constructor(private _employeeService: EmployeeService) { }

    employees: IEmployee[];
    employee: IEmployee;
    errorMessage: string;
    baseEemployeeImgUrl: string = 'http://127.0.0.1:8080/employee/image';
    togglePhotos:boolean = true;


  public data;
    public filterQuery = "";
    public rowsOnPage = 10;
    public sortBy = "email";
    public sortOrder = "asc";

    employeeIdWidth: number;
    firstNameWidth: number;
    lastNameWidth: number;
    roleWidth: number;
    photoWidth: number;
    buttonsWidth: number;

    
    @HostListener('window:resize', ['$event.target']) 
    onResize() {         
     this.resizeWorks()
    }

    

 resizeWorks(): void {
      this.employeeIdWidth = document.getElementById('employeeId').offsetWidth;
      this.firstNameWidth = document.getElementById('firstName').offsetWidth;
      this.lastNameWidth = document.getElementById('lastName').offsetWidth;
      this.roleWidth = document.getElementById('role').offsetWidth;
      this.buttonsWidth = document.getElementById('buttons').offsetWidth;
      if(document.getElementById('photo'))
         this.photoWidth = document.getElementById('photo').offsetWidth;
}
 


    ngOnInit(): void{
        
            this._employeeService.getEmployees()
                .subscribe(employees => this.employees = employees,
                            error =>  this.errorMessage = <any>error);

       setTimeout(() => {  
          this.resizeWorks()
        }, 500);
            
    }

    delayedResizeWork(): void{
         setTimeout(() => {  
          this.resizeWorks()
        }, 1);
    }

    deleteEmployee(employee: IEmployee): void{
        this.employees.splice( this.employees.lastIndexOf(employee), 1);

         this._employeeService.deleteEmployee(employee.employeeId)
                 .subscribe(employee => this.employee = employee,
                            error =>  this.errorMessage = <any>error);
    }
}