import {Injectable} from "@nestjs/common";
import {FindManyOptions, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import { ArtistaPorBandaEntity } from "./artista-por-banda.entity";
import { CreateArtistaPorBandaDto } from "./dto/create-artista-por-banda.dto";
import { ArtistaBanda } from "./artista-por-banda.controller";



@Injectable()
export class ArtistaPorBandaService{
    constructor(
        @InjectRepository(ArtistaPorBandaEntity)
        private readonly _artistaPorBandaRepository: Repository<ArtistaPorBandaEntity>
    ){}

    buscar(parametrosBusqueda?: FindManyOptions<ArtistaPorBandaEntity>):Promise<ArtistaPorBandaEntity[]>{
        return this._artistaPorBandaRepository.find(parametrosBusqueda)
    }

    crear(banda: CreateArtistaPorBandaDto): Promise<ArtistaPorBandaEntity>{
        // @ts-ignore
        const ArtistaPorBandaEntity: ArtistaPorBandaEntity = this._artistaPorBandaRepository.create(banda);
        return this._artistaPorBandaRepository.save(ArtistaPorBandaEntity)
    }
    eliminar(idArtistaPorBanda: number): Promise<ArtistaPorBandaEntity>{
        const ArtistaPorBandaAEliminar = this._artistaPorBandaRepository.create({idArtistaPorBanda});
        return this._artistaPorBandaRepository.remove(ArtistaPorBandaAEliminar);

    }

    actualizar(nuevaArtistaPorBanda: ArtistaPorBandaEntity): Promise<ArtistaPorBandaEntity>{
        const ArtistaPorBandaEntity: ArtistaPorBandaEntity = this._artistaPorBandaRepository.create(nuevaArtistaPorBanda);
        return this._artistaPorBandaRepository.save(ArtistaPorBandaEntity);
    }

    buscarPorId(idArtistaPorBanda: number): Promise<ArtistaPorBandaEntity>{
        return this._artistaPorBandaRepository.findOne(idArtistaPorBanda);
    }

    buscarPorIdSession(idSession: number):Promise<ArtistaPorBandaEntity>{
        return this._artistaPorBandaRepository.findOne({where: {idUsuario: +idSession}})
    }
    buscarSiExiste(idArtista: number, idBanda:number): Promise<ArtistaPorBandaEntity>{
        return this._artistaPorBandaRepository.findOne({where:{idArtista: idArtista, idBanda: idBanda}})
    }
    crearUnEventoIntermedio(idArtista, idBanda){
        let ArtistaBanda: ArtistaBanda = {idArtista: idArtista, idBanda: idBanda};
        const ArtistaEntity: ArtistaPorBandaEntity = this._artistaPorBandaRepository.create(ArtistaBanda);
        return this._artistaPorBandaRepository.save(ArtistaEntity)
}
}