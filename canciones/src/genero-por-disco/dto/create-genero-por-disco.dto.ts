import { IsNumber } from "class-validator";

export class CreateGeneroPorDiscoDto{

    @IsNumber()
    idDisco: number;

    @IsNumber()
    idGenero: number;

}