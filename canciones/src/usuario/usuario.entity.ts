//usuario.entity.ts

import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ArtistaPorBandaEntity} from "../artista-por-banda/artista-por-banda.entity";
import {AutorEntity} from "../autor/autor.entity";
import {RolEntity} from "../rol/rol.entity";

@Entity('usuario')
export class UsuarioEntity{

    @PrimaryGeneratedColumn()
    idUsuario: number;

    @Column({
        name: 'nombre_usuario,',
        type: 'varchar'
    })
    nombreUsuario:string;

    @Column({
        name: 'password_usuario',
        type: 'varchar'
    })
    passwordUsuario:string;

    @ManyToMany(type => RolEntity)
    @JoinTable()
    roles: RolEntity[];

}