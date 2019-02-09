import {Injectable} from "@nestjs/common";
import {FindManyOptions, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {DiscoEntity} from "./disco.entity";
import {CreateDiscoDto} from "./dto/create-disco.dto";

@Injectable()
export class DiscoService{
    constructor(
        @InjectRepository(DiscoEntity)
        private readonly _discoRepository: Repository<DiscoEntity>
    ){}

    buscar(parametrosBusqueda?: FindManyOptions<DiscoEntity>):Promise<DiscoEntity[]>{
        return this._discoRepository.find(parametrosBusqueda)
    }

    crear(disco: CreateDiscoDto): Promise<DiscoEntity>{
        // @ts-ignore
        const discoEntity: DiscoEntity = this._discoRepository.create(disco);
        return this._discoRepository.save(discoEntity)
    }
    eliminar(idDisco: number): Promise<DiscoEntity>{
        const discoAEliminar = this._discoRepository.create({idDisco});
        return this._discoRepository.remove(discoAEliminar);

    }

    actualizar(nuevoDisco: DiscoEntity): Promise<DiscoEntity>{
        const discoEntity: DiscoEntity = this._discoRepository.create(nuevoDisco);
        return this._discoRepository.save(discoEntity);
    }

    buscarPorId(idDisco: number): Promise<DiscoEntity>{
        return this._discoRepository.findOne(idDisco);
    }

    buscarPorIdSession(idSession: number):Promise<DiscoEntity>{
        return this._discoRepository.findOne({where: {idUsuario: +idSession}})
    }
}