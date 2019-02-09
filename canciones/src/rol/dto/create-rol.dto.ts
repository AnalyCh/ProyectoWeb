import { IsNotEmpty, IsString } from "class-validator";

export class CreateRolDto{
    @IsNotEmpty({message: 'Campo nombre rol es requerido'})
    @IsString()
    nombreRol: string;
}