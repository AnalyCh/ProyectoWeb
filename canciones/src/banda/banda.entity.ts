import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {AutorEntity} from "../autor/autor.entity";
import {ArtistaPorBandaEntity} from "../artista-por-banda/artista-por-banda.entity";

@Entity('banda')
export class BandaEntity{
    @PrimaryGeneratedColumn()
    idBanda: number;

    @Column({
        name:'nombre_banda',
        type: 'varchar'
    })
    nombreBanda: string;

    @Column({
        name: 'nacionalidad_banda',
        type: 'varchar'
    })
    nacionalidadBanda:string;

    @Column({
        name: 'fecha_agrupacion_banda',
        type: 'date'
    })
    fechaAgrupacionBanda: Date;

    @OneToMany(
        type => AutorEntity,
        autor => autor.idBanda
    )
    autores: AutorEntity[];

    @OneToMany(
        type => ArtistaPorBandaEntity,
        artistasPorBanda => artistasPorBanda.idBanda
    )
    artistasPorBanda: ArtistaPorBandaEntity[];
}