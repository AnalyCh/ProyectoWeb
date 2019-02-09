import {Column, Entity, Index, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {GeneroEntity} from "../genero/genero.entity";
import {CancionEntity} from "../cancion/cancion.entity";
import {GeneroPorDiscoEntity} from "../genero-por-disco/genero-por-disco.entity";

@Entity('disco')
export class DiscoEntity {
    @PrimaryGeneratedColumn()
    idDisco: number;


    @Column({
            name: 'nombre-disco',
            type: 'varchar'
    })
    nombreDisco: string;


    @Column({
        name: 'anio-disco'
    })
    anioDisco: number;

    @OneToMany(
        type => GeneroPorDiscoEntity,
        generoPorDisco => generoPorDisco.idDisco
    )
    generoPorDiscos: GeneroPorDiscoEntity[];

    @OneToMany(
        type => CancionEntity,
        cancion => cancion.idDisco
    )
    canciones: CancionEntity[];

}