import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {CancionEntity} from "../cancion/cancion.entity";
import {ArtistaEntity} from "../artista/artista.entity";
import {BandaEntity} from "../banda/banda.entity";

@Entity('autor')
export class AutorEntity{
    @PrimaryGeneratedColumn()
    idAutor: number;

    @Column({
        name: 'banda',
        type: 'boolean'
    })
    banda: boolean;

    @OneToMany(
        type => CancionEntity,
        cancion => cancion.idAutor
    )
    canciones: CancionEntity[];


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