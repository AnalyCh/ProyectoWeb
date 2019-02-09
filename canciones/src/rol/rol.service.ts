import {Injectable} from "@nestjs/common";
import {FindManyOptions, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import { RolEntity } from "./rol.entity";
import { CreateRolDto } from "./dto/create-rol.dto";


@Injectable()
export class RolService{
    constructor(
        @InjectRepository(RolEntity)
        private readonly _rolRepository: Repository<RolEntity>
    ){}

    buscar(parametrosBusqueda?: FindManyOptions<RolEntity>):Promise<RolEntity[]>{
        return this._rolRepository.find(parametrosBusqueda)
    }

    crear(rol: CreateRolDto): Promise<RolEntity>{
        // @ts-ignore
        const RolEntity: RolEntity = this._rolRepository.create(rol);
        return this._rolRepository.save(RolEntity)
    }
    eliminar(idRol: number): Promise<RolEntity>{
        const rolAEliminar = this._rolRepository.create({idRol});
        return this._rolRepository.remove(rolAEliminar);

    }

    actualizar(nuevoRol: RolEntity): Promise<RolEntity>{
        const RolEntity: RolEntity = this._rolRepository.create(nuevoRol);
        return this._rolRepository.save(RolEntity);
    }

    buscarPorId(idRol: number): Promise<RolEntity>{
        return this._rolRepository.findOne(idRol);
    }

    buscarPorIdSession(idSession: number):Promise<RolEntity>{
        return this._rolRepository.findOne({where: {idUsuario: +idSession}})
    }
}