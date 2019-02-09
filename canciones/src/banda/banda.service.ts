import {Injectable} from "@nestjs/common";
import {FindManyOptions, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import { BandaEntity } from "./banda.entity";
import { CreateBandaDto } from "./dto/create-banda.dto";



@Injectable()
export class BandaService{
    constructor(
        @InjectRepository(BandaEntity)
        private readonly _bandaRepository: Repository<BandaEntity>
    ){}

    buscar(parametrosBusqueda?: FindManyOptions<BandaEntity>):Promise<BandaEntity[]>{
        return this._bandaRepository.find(parametrosBusqueda)
    }

    crear(banda: CreateBandaDto): Promise<BandaEntity>{
        // @ts-ignore
        const bandaEntity: BandaEntity = this._bandaRepository.create(banda);
        return this._bandaRepository.save(bandaEntity)
    }
    eliminar(idBanda: number): Promise<BandaEntity>{
        const bandaAEliminar = this._bandaRepository.create({idBanda});
        return this._bandaRepository.remove(bandaAEliminar);

    }

    actualizar(nuevaBanda: BandaEntity): Promise<BandaEntity>{
        const bandaEntity: BandaEntity = this._bandaRepository.create(nuevaBanda);
        return this._bandaRepository.save(bandaEntity);
    }

    buscarPorId(idBanda: number): Promise<BandaEntity>{
        return this._bandaRepository.findOne(idBanda);
    }

    buscarPorIdSession(idSession: number):Promise<BandaEntity>{
        return this._bandaRepository.findOne({where: {idUsuario: +idSession}})
    }
}