import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateCancionDto{

    @IsNotEmpty({message: 'Campo Nombre Cancion no se puede dejar vacio'})
    @IsString({message: 'Campo Nombre Cancion debe ser un string'})
    nombreCancion: string;

    @IsNotEmpty({message: 'Campo Anio Cancion no se puede dejar vacio'})
    @IsNumber()
    anioCancion: number;
}