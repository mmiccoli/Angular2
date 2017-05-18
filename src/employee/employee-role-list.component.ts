import { OnInit, Component,  EventEmitter } from "@angular/core";
import { EmployeeService } from "employee/employee.service";
import { IRole } from "employee/role";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Pipe } from "@angular/core";

@Component({
    templateUrl: 'employee-role-list.component.html'
})

export class EmployeeRoleComponent implements OnInit {

    roles: IRole[];
    errorMessage: string;
    roleForm: FormGroup;
    newRole: IRole;
    newRoles: IRole[];
    deletedRole: IRole;
    roleIdWidth:string='50';
    buttonsWith:string='160';    

    constructor(private _employeeService: EmployeeService,
                private fb: FormBuilder) { }    

    ngOnInit(): void {
        this._employeeService.getRoles()
            .subscribe(roles => this.roles = roles,
                      error =>  this.errorMessage = <any>error);

        this.roleForm = this.fb.group({
            description: ["", []]
        })
    }


    add(): void {
        if(this.newRoles){
            this.newRoles.push({"roleId":0, "description":"", "edit":false});
        }else{
            this.newRoles=[{roleId:0, description:"", "edit":false}];
        }
    }

   
    save(role: IRole): void { 
           if(role.roleId == 0) {        
                this._employeeService.editRole(role)
                    .subscribe(role => {this.roles.push({"roleId":role.roleId, "description":role.description, "edit":false})},
                            error => this.errorMessage = <any>error);
           }else{
               this._employeeService.editRole(role)
                    .subscribe(role =>   error => this.errorMessage = <any>error);
           }       
    }

    deleteRole(roleId: number): void {
        this._employeeService.deleteRole(roleId)
            .subscribe(role => this.deletedRole = role,
                    error => this.errorMessage = <any>error)
    }
}