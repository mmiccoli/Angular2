
import { Component, OnInit } from "@angular/core";
import { IEmployee } from "employee/employee";
import { EmployeeService } from "employee/employee.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { IRole } from "employee/role";
import { RequestOptions, Http, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";


@Component({
    templateUrl: 'employee-detail.component.html'
})

export class EmployeeDetailComponent implements OnInit {

    constructor(private _employeeService: EmployeeService,
                private _route: ActivatedRoute,
                private _router: Router,
                private fb: FormBuilder,
                private _http: Http)          { }

    employee: IEmployee;
    errorMessage: string;
    error;
    successMsg: string;
    employeeForm: FormGroup;
    roles: IRole[];
    baseEemployeeImgUrl: string = 'http://127.0.0.1:8080/employee/image';
    employeeImgUrl: string;
    file;


    title: string;


        ngOnInit(): void {
            this._route.params.
                subscribe(params =>  {
                    let id = params['id'];
                
                      this.getEmployeeById(id);
                    });

            this.employeeForm = this.fb.group({
                name: ['', []],
                surname: ['', []],
                role: ['', []]
            })


            this._employeeService.getRoles().subscribe(roles => this.roles = roles);


            this.employeeForm.get('name').valueChanges
                            .subscribe(value => this.employee.name = value);   
            this.employeeForm.get('surname').valueChanges
                            .subscribe(value => this.employee.surname = value);
            
            this.employee = {
                employeeId: 0,
                name: '',
                surname: '',
                photo: '',
                role: {
                    roleId: 0,
                    description: '',
                    edit:false
                },
                photoPath:''

            }

           
            
        
        }


        getEmployeeById(id: number){
             this._employeeService.getEmployeeById(id)
            .subscribe(employee => {this.employee = employee;
                                    this.initializeAttributes();},
                        error => this.errorMessage = <any>error);
        }

        initializeAttributes(): void {
            if(this.employee.employeeId == 0){

                this.employee = {
                    employeeId : 0,
                    name:'',
                    surname:'',
                    photo:'',
                    role:{
                        roleId:0,
                        description:'',
                        edit:false
                    },
                    photoPath:''
                }


                this.title = "New Employee";
            }else{
                 this.title = this.employee.name + ' ' + this.employee.surname;
                 this.employeeImgUrl = this.baseEemployeeImgUrl + '?employeeId=' + this.employee.employeeId;
                 this.populateForm();
            }
            
        }

        populateForm(): void{
            this.employeeForm.patchValue({
                name: this.employee.name,
                surname: this.employee.surname
            });
        }

        save(): void{
            this._employeeService.editEmployee(this.employee)
                .subscribe(employee => {
                            this._router.navigate(['/employee', employee.employeeId ]);},
                            error => this.errorMessage = <any>error);
        }

        onChange(roleId: number): void {
            this.employee.role.roleId = roleId
        }

        getFiles(files: any) {
            let empDataFiles: FileList = files.files;
            this.file = empDataFiles[0];

           

            }


        postfile() {
         if (this.file !== undefined) {

                this.employee.photo= this.file.name;

                this._employeeService.postFormData(this.file, this.employee)
                        .subscribe(responce => {
                            this.employee.photo = <string>responce;
                            this.employeeImgUrl = this.baseEemployeeImgUrl + '?uuid=' + this.employee.photo;
                    })
                        //.catch(error => this.error = error);
                        setTimeout(() => {
                            this.successMsg = "Successfully uploaded !!";
                        }, 10000);
                                
                }
        

    }

}