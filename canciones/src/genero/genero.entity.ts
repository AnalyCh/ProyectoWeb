import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {DiscoEntity} from "../disco/disco.entity";
import {GeneroPorDiscoEntity} from "../genero-por-disco/genero-por-disco.entity";

@Entity('genero')
export class GeneroEntity {

    @PrimaryGeneratedColumn()
    idGenero: number;

    @Column({
    name: 'nombre-genero',
        type: 'varchar'
    })
    nombreGenero: string;

    @OneToMany(
        type => GeneroPorDiscoEntity,
        generoPorDisco => generoPorDisco.idGenero
    )
    generoPorDiscos: GeneroPorDiscoEntity[];

}