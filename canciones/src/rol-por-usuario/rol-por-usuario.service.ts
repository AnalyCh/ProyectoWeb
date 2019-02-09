import {Injectable} from "@nestjs/common";
import {FindManyOptions, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import { RolPorUsuarioEntity } from "./rol-por-usuario.entity";
import { CreateRolPorUsuarioDto } from "./dto/create-rol-por-usuario.dto";


@Injectable()
export class RolPorUsuarioService{
    constructor(
        @InjectRepository(RolPorUsuarioEntity)
        private readonly _rolPorUsuarioRepository: Repository<RolPorUsuarioEntity>
    ){}

    buscar(parametrosBusqueda?: FindManyOptions<RolPorUsuarioEntity>):Promise<RolPorUsuarioEntity[]>{
        return this._rolPorUsuarioRepository.find(parametrosBusqueda)
    }

    crear(rolPorUsuario: CreateRolPorUsuarioDto): Promise<RolPorUsuarioEntity>{
        // @ts-ignore
        const rolPorUsuarioEntity: RolPorUsuarioEntity = this._rolPorUsuarioRepository.create(rolPorUsuario);
        return this._rolPorUsuarioRepository.save(rolPorUsuarioEntity)
    }
    eliminar(idRolPorUsuario: number): Promise<RolPorUsuarioEntity>{
        const rolPorUsuarioAEliminar = this._rolPorUsuarioRepository.create({idRolPorUsuario});
        return this._rolPorUsuarioRepository.remove(rolPorUsuarioAEliminar);

    }

    actualizar(nuevoRolPorUsuario: RolPorUsuarioEntity): Promise<RolPorUsuarioEntity>{
        const rolPorUsuarioEntity: RolPorUsuarioEntity = this._rolPorUsuarioRepository.create(nuevoRolPorUsuario);
        return this._rolPorUsuarioRepository.save(rolPorUsuarioEntity);
    }

    buscarPorId(idRolPorUsuario: number): Promise<RolPorUsuarioEntity>{
        return this._rolPorUsuarioRepository.findOne(idRolPorUsuario);
    }

    buscarPorIdSession(idSession: number):Promise<RolPorUsuarioEntity>{
        return this._rolPorUsuarioRepository.findOne({where: {idUsuario: +idSession}})
    }
}