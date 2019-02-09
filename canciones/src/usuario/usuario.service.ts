//usuario.service.ts

import {Injectable} from "@nestjs/common";
import {UsuarioEntity} from "./usuario.entity";
import {FindManyOptions, FindOneOptions, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {Usuario} from "../app.controller";

@Injectable()
export class UsuarioService{
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly _usuarioRepository:
            Repository<UsuarioEntity>
    ){
    }

    async autenticar(username: string,
                     password: string ): Promise<number>{
        const usuarioEncontrado = await this._usuarioRepository
            .findOne({
                where: {
                    nombreUsuario: username
                }
            });
        if (usuarioEncontrado){
            if (usuarioEncontrado.passwordUsuario === password){
                return usuarioEncontrado.idUsuario
            } else {
                return 0;
            }
        } else {
            return 0;
        }
    }

    buscar(parametrosBusqueda?: FindManyOptions<UsuarioEntity>)
        : Promise<UsuarioEntity[]> {
        return this._usuarioRepository.find(parametrosBusqueda)
    }

    eliminar(idUsuario: number): Promise<UsuarioEntity>{
        const usuarioAEliminar: UsuarioEntity = this._usuarioRepository
            .create({
                idUsuario: idUsuario
            });
        return this._usuarioRepository.remove(usuarioAEliminar);
    }

    actualizar(usuario: Usuario): Promise<UsuarioEntity> {
        const usuarioEntity: UsuarioEntity = this._usuarioRepository.create(usuario);
        return this._usuarioRepository.save(usuarioEntity);
    }

    buscarPorId(idUsuario: number): Promise<UsuarioEntity>{
        return this._usuarioRepository.findOne(idUsuario,{relations:["roles"]});
    }
    crear(usuario: Usuario): Promise<UsuarioEntity> {

        const usuarioEntity: UsuarioEntity = this._usuarioRepository.create(usuario);

        return this._usuarioRepository.save(usuarioEntity)
    }
}