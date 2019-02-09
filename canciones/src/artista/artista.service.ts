import {Injectable} from "@nestjs/common";
import {FindManyOptions, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import { ArtistaEntity } from "./artista.entity";
import { CreateBandaDto } from "src/banda/dto/create-banda.dto";


@Injectable()
export class ArtistaService{
    constructor(
        @InjectRepository(ArtistaEntity)
        private readonly _artistaRepository: Repository<ArtistaEntity>
    ){}

    buscar(parametrosBusqueda?: FindManyOptions<ArtistaEntity>):Promise<ArtistaEntity[]>{
        return this._artistaRepository.find(parametrosBusqueda)
    }

    crear(artista: CreateBandaDto): Promise<ArtistaEntity>{
        // @ts-ignore
        const artistaEntity: ArtistaEntity = this._artistaRepository.create(artista);
        return this._artistaRepository.save(artistaEntity)
    }
    eliminar(idArtista: number): Promise<ArtistaEntity>{
        const artistaAEliminar = this._artistaRepository.create({idArtista});
        return this._artistaRepository.remove(artistaAEliminar);

    }

    actualizar(nuevoArtista: ArtistaEntity): Promise<ArtistaEntity>{
        const artistaEntity: ArtistaEntity = this._artistaRepository.create(nuevoArtista);
        return this._artistaRepository.save(artistaEntity);
    }

    buscarPorId(idArtista: number): Promise<ArtistaEntity>{
        return this._artistaRepository.findOne(idArtista);
    }

    buscarPorIdSession(idSession: number):Promise<ArtistaEntity>{
        return this._artistaRepository.findOne({where: {idUsuario: +idSession}})
    }
}