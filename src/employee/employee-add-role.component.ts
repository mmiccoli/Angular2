
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { IRole } from "employee/role";
import { EmployeeService } from "employee/employee.service";
import { EmployeeRoleComponent } from "employee/employee-role-list.component";

@Component({
    selector: 'add-role',
    template:  `<table  class="table table-hover" style="margin-bottom: 0px;" >
                            <tbody>
                                <tr #compContainer>
                                    <td [ngStyle]="{'width.px': roleIdWidth}"></td>
                                    <td>
                                        <form class="form-horizontal"
                                            [formGroup]="roleForm" >
                                        <div class="form-group" style="margin-bottom:0px;">
                                            <div  class="col-sm-10">
                                                <input formControlName ="description" type="text" class="form-control" 
                                                    placeholder="Enter new role (Required)" required style=" width:300px;">
                                            </div>
                                        </div>
                                    
                                        </form>
                                    
                                    </td>
                                    <td [ngStyle]="{'width.px': buttonsWith}">                    
                                        <button type="button" class="btn btn-success" 
                                                    (click)='update()'
                                                    (click)="compContainer.innerHTML = ''">Save</button>
                                        <button type="button" class="btn btn-default" 
                                                    (click)="compContainer.innerHTML = ''">Cancel</button>
                                    </td>
                                </tr>
                            </tbody>
                </table>`
})

export class AddRoleComponent implements OnInit {
   
        @Input() role: IRole;
        @Input() roleIdWidth: string;
        @Input() buttonsWith: string;
        @Output() onSaved = new EventEmitter<IRole>();
        roleForm: FormGroup;        
        errorMessage: string;

        constructor(  private fb: FormBuilder,
                      private _employeeService: EmployeeService) { }

        ngOnInit(): void {
            this.roleForm = this.fb.group({
                  description: ["", []]
              })
        }


        update(){

            this.updateRole();

            this.onSaved.emit(this.role);

        }


        updateRole(): void{
            this.role = {
                roleId: 0,
                description: this.roleForm.get('description').value,
                edit: false
            }
        }

     

        




}