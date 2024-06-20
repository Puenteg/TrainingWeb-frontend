export class Empleado {
    _id?: number;
    nombre: string;
    contraseña: string;
    apellido: string;
    email: string;
    telefono: string;
    estatus: string;

    constructor(nombre: string,contraseña: string, apellido: string, email: string, telefono: string, estatus: string){
        this.nombre = nombre;
        this.contraseña = contraseña;
        this.apellido = apellido;
        this.email = email;
        this.telefono = telefono;
        this.estatus = estatus;
    }
}