import { IRole } from "employee/role";

export interface IEmployee {
    employeeId: number;
    name: string;
    surname: string;
    photo: string;
    role: IRole;
    photoPath: string;
}