import {Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ArtistaEntity} from "../artista/artista.entity";
import {BandaEntity} from "../banda/banda.entity";

@Entity('artista_por_banda')
export class ArtistaPorBandaEntity{
    @PrimaryGeneratedColumn()
    idArtistaPorBanda: number;

    @ManyToOne(
        type => ArtistaEntity,
        artista => artista.autores
    )
    idArtista: ArtistaEntity;

    @ManyToOne(
        type => BandaEntity,
        banda => banda.autores
    )
    idBanda: BandaEntity;
}