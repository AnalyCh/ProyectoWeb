import {Injectable} from "@nestjs/common";
import {GeneroEntity} from "./genero.entity";
import {FindManyOptions, Repository} from "typeorm";
import {CreateGeneroDto} from "./dto/create-genero.dto";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class GeneroService{
    constructor(
        @InjectRepository(GeneroEntity)
        private readonly generoRepository: Repository<GeneroEntity>
    ){}

    buscar(parametrosBusqueda?: FindManyOptions<GeneroEntity>):Promise<GeneroEntity[]>{
        return this.generoRepository.find(parametrosBusqueda)
    }

    crear(genero: CreateGeneroDto): Promise<GeneroEntity>{
        // @ts-ignore
        const generoEntity: GeneroEntity = this.generoRepository.create(genero);
        return this.generoRepository.save(generoEntity)
    }
    eliminar(idGenero: number): Promise<GeneroEntity>{
        const generoAEliminar = this.generoRepository.create({idGenero: idGenero});
        return this.generoRepository.remove(generoAEliminar);

    }

    actualizar(nuevoGenero: GeneroEntity): Promise<GeneroEntity>{
        const generoEntity: GeneroEntity = this.generoRepository.create(nuevoGenero);
        return this.generoRepository.save(generoEntity);
    }

    buscarPorId(idGenero: number): Promise<GeneroEntity>{
        return this.generoRepository.findOne(idGenero);
    }

    buscarPorIdSession(idSession: number):Promise<GeneroEntity>{
        return this.generoRepository.findOne({where: {idUsuario: +idSession}})
    }
}