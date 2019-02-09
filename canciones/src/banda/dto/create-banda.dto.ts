import { IsNotEmpty, IsString, IsDate, IsDateString } from "class-validator";

export class CreateBandaDto{

    @IsNotEmpty({message: 'Campo nombre Banda es requerido'})
    @IsString()
    nombreBanda: string;

    @IsNotEmpty({message: 'Campo nacionalidad Banda es requerido'})
    @IsString()
    nacionalidadBanda:string;

    @IsNotEmpty({message: 'Campo fecha de Agrupacion es requerido'})
    @IsDateString()
    fechaAgrupacionBanda: string;
}