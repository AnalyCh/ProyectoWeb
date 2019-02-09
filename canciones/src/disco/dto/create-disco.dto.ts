import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateDiscoDto{

    @IsNotEmpty({message: 'Campo Nombre Disco no se puede dejar vacio'})
    @IsString({message: 'Campo Nombre Disco debe ser un string'})
    nombreDisco: string;

    @IsNotEmpty({message: 'Campo Anio Disco no se puede dejar vacio'})
    @IsNumber()
    anioDisco: number;
}