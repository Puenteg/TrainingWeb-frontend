export interface TablaDietas {
  lunes: Dia,
  martes: Dia;
  miercoles: Dia;
  jueves: Dia;
  viernes: Dia;
  sabado: Dia;
  domingo: Dia;
}

export interface Dia {
  desayuno: string;
  comida: string;
  cena: string;
}

export interface Dietas {
  _id?: number;
  nombre: string;
  descripcion: string;
  autor: string;
  contribucion: string;
  // tabla: TablaDietas|null
  lunesDesayuno: string;
  lunesComida: string;
  lunesCena: string;
  martesDesayuno: string;
  martesComida: string;
  martesCena: string;
  miercolesDesayuno: string;
  miercolesComida: string;
  miercolesCena: string;
  juevesDesayuno: string;
  juevesComida: string;
  juevesCena: string;
  viernesDesayuno: string;
  viernesComida: string;
  viernesCena: string;
  sabadoDesayuno: string;
  sabadoComida: string;
  sabadoCena: string;
  domingoDesayuno: string;
  domingoComida: string;
  domingoCena: string;

}

// export class Dietas {
//     _id?: number;
//     nombre: string;
//     descripcion: string;
//     autor: string;
//     contribucion: string;
//     tabla: TablaDietas|null


//     constructor(nombre: string,descripcion: string, autor: string, contribucion?: string, tablaDietas?: TablaDietas){
//         this.nombre = nombre;
//         this.descripcion = descripcion;
//         this.autor = autor;
//         this.contribucion = contribucion || '';
//         this.tabla = tablaDietas || null;
//     }
// }
