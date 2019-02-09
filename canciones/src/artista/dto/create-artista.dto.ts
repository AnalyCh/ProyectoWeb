import { IsNotEmpty, IsString, IsDate } from "class-validator";

export class CreateArtistaDto{
    @IsNotEmpty({message: 'Campo nombre Artista es requerido'})
    @IsString()
    nombreArtista: string;

    @IsNotEmpty({message: 'Campo nacionalidad Artista es requerido'})
    @IsString()
    nacionalidadArtista:string;

    @IsNotEmpty({message: 'Campo fecha de nacimiento es requerido'})
    @IsDate()
    fechaNacimientoArtista: Date;

}