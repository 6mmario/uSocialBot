import { Title } from '@angular/platform-browser';

export interface Usuario {
    id_usuario: string,
    nombre: string,
    urlimagen?: string,
    nickname: string,
    pass: string,
    rpassword: string,
    base64?: string,
    extension?: string,
    foto? : number
};