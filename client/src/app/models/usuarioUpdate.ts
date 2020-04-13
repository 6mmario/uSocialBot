import { Title } from '@angular/platform-browser';

export interface UsuarioUpdate {
    id_usuario: string,
    nombre?: string,
    nickname?: string,
    pass?: string,
    foto? : number,
    urlimagen?:string,
    base64?: string,
    extension?: string
    
};