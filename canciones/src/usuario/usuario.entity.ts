//usuario.entity.ts

import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ArtistaPorBandaEntity} from "../artista-por-banda/artista-por-banda.entity";
import {AutorEntity} from "../autor/autor.entity";
import {RolPorUsuarioEntity} from "../rol-por-usuario/rol-por-usuario.entity";

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

    @OneToMany(
        type => RolPorUsuarioEntity,
        rolesPorUsuario => rolesPorUsuario.idUsuario
    )
    rolesPorUsuario: RolPorUsuarioEntity[];

}