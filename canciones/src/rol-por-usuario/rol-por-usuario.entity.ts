import {Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ArtistaEntity} from "../artista/artista.entity";
import {BandaEntity} from "../banda/banda.entity";
import {UsuarioEntity} from "../usuario/usuario.entity";
import {RolEntity} from "../rol/rol.entity";

@Entity('rol_por_usuario')
export class RolPorUsuarioEntity{

    @PrimaryGeneratedColumn()
    idRolPorUsuario:number;

    @ManyToOne(
        type => UsuarioEntity,
        usuario => usuario.rolesPorUsuario
    )
    idUsuario: UsuarioEntity;

    @ManyToOne(
        type => RolEntity,
        rol => rol.rolesPorUsuario
    )
    idRol: RolEntity;

}