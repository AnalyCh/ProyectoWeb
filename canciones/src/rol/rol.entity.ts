import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {RolPorUsuarioEntity} from "../rol-por-usuario/rol-por-usuario.entity";
import {AutorEntity} from "../autor/autor.entity";

@Entity()
export class RolEntity{
    @PrimaryGeneratedColumn()
    idRol:number;

    @Column({
        name: 'nombre_rol',
        type: 'varchar'
    })
    nombre: string;

    @OneToMany(
        type => RolPorUsuarioEntity,
        rolesPorUsuario => rolesPorUsuario.idRol
    )
    rolesPorUsuario: RolPorUsuarioEntity[];
}