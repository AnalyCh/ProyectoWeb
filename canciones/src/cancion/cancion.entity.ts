import {Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {DiscoEntity} from "../disco/disco.entity";
import {AutorEntity} from "../autor/autor.entity";

@Entity('cancion')
export class CancionEntity {
    @PrimaryGeneratedColumn()
    idCancion: number;


    @Column({
        name: 'nombre-cancion'
    })
    nombreCancion: string;


    @Column({
        name: 'anio-cancion'
    })
    anioCancion: number;

    @ManyToOne(
        type => DiscoEntity,
        disco => disco.canciones
    )
    idDisco: number;

    @ManyToOne(
        type => AutorEntity,
        autor => autor.canciones
    )
    idAutor: number;


}