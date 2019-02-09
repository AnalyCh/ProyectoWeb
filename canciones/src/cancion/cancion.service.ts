import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {CancionEntity} from "./cancion.entity";
import {FindManyOptions, Repository} from "typeorm";
import {Cancion} from "../app.controller";
import {CreateCancionDto} from "./dto/create-cancion.dto";

@Injectable()
export class CancionService {
    constructor(
        @InjectRepository(CancionEntity)
        private readonly _cancionRepository: Repository<CancionEntity>
    ){}

    buscar(parametrosBusqueda?: FindManyOptions<CancionEntity>):
        Promise<CancionEntity[]>{
        return this._cancionRepository.find(parametrosBusqueda)
    }

    crear(cancion: CreateCancionDto): Promise<CancionEntity>{
        const cancionEntity: CancionEntity = this._cancionRepository
            .create(cancion);
        return this._cancionRepository.save(cancionEntity)
    }

    eliminar(idCancion: number): Promise<CancionEntity>{
        const cancionAEliminar: CancionEntity = this._cancionRepository
            .create({
                idCancion
            });
        return this._cancionRepository.remove(cancionAEliminar);
    }

    actualizar(nuevaCancion: CreateCancionDto): Promise<CancionEntity>{
        const cancionEntity: CancionEntity = this._cancionRepository
            .create(nuevaCancion);

        return this._cancionRepository.save(cancionEntity);
    }

    buscarPorId(idCancion: number): Promise<CancionEntity>{
        return this._cancionRepository.findOne(idCancion)
    }


}