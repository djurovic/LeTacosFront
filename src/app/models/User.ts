import {Role} from "../enum/Role";

export class User {

    email: string;

    password: string;

    name: string;

    surname: string;

    ulica: string;

    broj: string;

    interfon: string;

    brojStana: string;

    sprat: string;
    
    phone: string;

    active: boolean;

    role: string;

    constructor(){
        this.active = true;
        this.role = Role.Customer;
    }
}
