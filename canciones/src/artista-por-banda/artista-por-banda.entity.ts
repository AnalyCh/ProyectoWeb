import {Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ArtistaEntity} from "../artista/artista.entity";
import {BandaEntity} from "../banda/banda.entity";

@Entity('artista_por_banda')
export class ArtistaPorBandaEntity{
    @PrimaryGeneratedColumn()
    idArtistaPorBanda: number;

    @ManyToOne(
        type => ArtistaEntity,
        artista => artista.autores,{eager: true}
    )
    idArtista: ArtistaEntity | number;

    @ManyToOne(
        type => BandaEntity,
        banda => banda.autores,{eager: true}
    )
    idBanda: BandaEntity | number;
}