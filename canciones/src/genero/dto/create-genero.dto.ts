import {Column} from "typeorm";
import {IsNotEmpty, IsString} from "class-validator";

export class CreateGeneroDto{
    @IsNotEmpty({message: 'Campo nombre es requerido'})
    @IsString()
    nombre: string;
}