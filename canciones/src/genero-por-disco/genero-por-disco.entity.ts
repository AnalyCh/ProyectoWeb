import {Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {GeneroEntity} from "../genero/genero.entity";
import {DiscoEntity} from "../disco/disco.entity";

@Entity('genero_por_disco')
export class GeneroPorDiscoEntity{
    @PrimaryGeneratedColumn()
    idGeneroPorDisco: number;

    @ManyToOne(
        type=> GeneroEntity,
        genero => genero.generoPorDiscos,
        {eager:true}
    )
    idGenero: number;

    @ManyToOne(
        type=> DiscoEntity,
        disco => disco.generoPorDiscos,
        {eager:true}
    )
    idDisco: number;
}