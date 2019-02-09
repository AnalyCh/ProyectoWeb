import {Injectable} from "@nestjs/common";
import {GeneroEntity} from "./genero.entity";
import {FindManyOptions, Repository} from "typeorm";
import {CreateGeneroDto} from "./dto/create-genero.dto";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class GeneroService{
    constructor(
        @InjectRepository(GeneroEntity)
        private readonly _generoRepository: Repository<GeneroEntity>
    ){}

    buscar(parametrosBusqueda?: FindManyOptions<GeneroEntity>):Promise<GeneroEntity[]>{
        return this._generoRepository.find(parametrosBusqueda)
    }

    crear(genero: CreateGeneroDto): Promise<GeneroEntity>{
        // @ts-ignore
        const generoEntity: GeneroEntity = this._generoRepository.create(genero);
        return this._generoRepository.save(generoEntity)
    }
    eliminar(idGenero: number): Promise<GeneroEntity>{
        const generoAEliminar = this._generoRepository.create({idGenero: idGenero});
        return this._generoRepository.remove(generoAEliminar);

    }

    actualizar(nuevoGenero: GeneroEntity): Promise<GeneroEntity>{
        const generoEntity: GeneroEntity = this._generoRepository.create(nuevoGenero);
        return this._generoRepository.save(generoEntity);
    }

    buscarPorId(idGenero: number): Promise<GeneroEntity>{
        return this._generoRepository.findOne(idGenero);
    }

    buscarPorIdSession(idSession: number):Promise<GeneroEntity>{
        return this._generoRepository.findOne({where: {idUsuario: +idSession}})
    }
}