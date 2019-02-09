import { IsNotEmpty, IsString } from "class-validator";

export class CreateUsuarioDto{

    @IsNotEmpty({message: 'Campo nombre usuario es requerido'})
    @IsString()
    nombreUsuario:string;

    @IsNotEmpty({message: 'Campo nombre Banda es requerido'})
    @IsString()
    passwordUsuario:string;
}