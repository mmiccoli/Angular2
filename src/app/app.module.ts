import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router'

import { AppComponent } from './app.component';
import { employeeComponent } from "employee/employee-list.component";
import { EmployeeService } from "employee/employee.service";
import { EmployeeDetailComponent } from "employee/employee-detail.component";
import { EmployeeRoleComponent } from "employee/employee-role-list.component";
import { AddRoleComponent } from "employee/employee-add-role.component";
import { BusinessManagerComponent } from "employee/business-manager-list.component";
import { DataTableModule } from "angular2-datatable";
import { DataFilterPipe } from "employee/data-filter.pipe";

@NgModule({
  declarations: [
    AppComponent, employeeComponent, EmployeeDetailComponent,
    EmployeeRoleComponent, BusinessManagerComponent, AddRoleComponent, 
    DataFilterPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    DataTableModule,
   RouterModule.forRoot([
      {path: 'employee', component: employeeComponent},
      {path: 'employee/:id', component: EmployeeDetailComponent},
      {path: 'role', component: EmployeeRoleComponent},
      {path: 'business_manager', component: BusinessManagerComponent},
      { path: '**', redirectTo: '#', pathMatch: 'full' }
    ])
  ],
  providers: [
      EmployeeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
