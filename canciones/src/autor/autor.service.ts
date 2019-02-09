import {Injectable} from "@nestjs/common";
import {FindManyOptions, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import { AutorEntity } from "./autor.entity";
import { CreateGeneroDto } from "src/genero/dto/create-genero.dto";


@Injectable()
export class AutorService{
    constructor(
        @InjectRepository(AutorEntity)
        private readonly _autorRepository: Repository<AutorEntity>
    ){}

    buscar(parametrosBusqueda?: FindManyOptions<AutorEntity>):Promise<AutorEntity[]>{
        return this._autorRepository.find(parametrosBusqueda)
    }

    crear(autor: CreateGeneroDto): Promise<AutorEntity>{
        // @ts-ignore
        const autorEntity: AutorEntity = this._autorRepository.create(autor);
        return this._autorRepository.save(autorEntity)
    }
    eliminar(idAutor: number): Promise<AutorEntity>{
        const autorAEliminar = this._autorRepository.create({idAutor});
        return this._autorRepository.remove(autorAEliminar);

    }

    actualizar(nuevoAutor: AutorEntity): Promise<AutorEntity>{
        const autorEntity: AutorEntity = this._autorRepository.create(nuevoAutor);
        return this._autorRepository.save(autorEntity);
    }

    buscarPorId(idAutor: number): Promise<AutorEntity>{
        return this._autorRepository.findOne(idAutor);
    }

    buscarPorIdSession(idSession: number):Promise<AutorEntity>{
        return this._autorRepository.findOne({where: {idUsuario: +idSession}})
    }
}