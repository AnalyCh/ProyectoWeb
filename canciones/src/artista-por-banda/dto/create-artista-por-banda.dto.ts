import { IsNumber } from "class-validator";

export class CreateArtistaPorBandaDto{
    
    @IsNumber()
    idArtistaPorBanda: number;

    @IsNumber()
    idArtista: number;

    @IsNumber()
    idBanda: number;
}