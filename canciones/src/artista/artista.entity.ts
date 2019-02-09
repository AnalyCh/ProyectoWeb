import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {CancionEntity} from "../cancion/cancion.entity";
import {AutorEntity} from "../autor/autor.entity";
import {ArtistaPorBandaEntity} from "../artista-por-banda/artista-por-banda.entity";

@Entity('artista')
export class ArtistaEntity{
    @PrimaryGeneratedColumn()
    idArtista:number

    @Column({
        name:'nombre_artista',
        type: 'varchar'
    })
    nombreArtista: string;

    @Column({
        name: 'nacionalidad_artista',
        type: 'varchar'
    })
    nacionalidadArtista:string;

    @Column({
        name: 'fecha_nacimiento_artista',
        type: 'date'
    })
    fechaNacimientoArtista: Date;

    @OneToMany(
        type => AutorEntity,
        autor => autor.idAutor
    )
    autores: AutorEntity[];

    @OneToMany(
        type => ArtistaPorBandaEntity,
        artistasPorBanda => artistasPorBanda.idArtista
    )
    artistasPorBanda: AutorEntity[];
}