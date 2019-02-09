import {Injectable} from "@nestjs/common";
import {FindManyOptions, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {GeneroPorDiscoEntity} from "./genero-por-disco.entity";
import {CreateGeneroPorDiscoDto} from "./dto/create-genero-por-disco.dto";
import { GeneroPorDisco } from "./genero-por-disco.controller";

@Injectable()
export class GeneroPorDiscoService{
    constructor(
        @InjectRepository(GeneroPorDiscoEntity)
        private readonly _generoPorDiscoRepository: Repository<GeneroPorDiscoEntity>
    ){}

    buscar(parametrosBusqueda?: FindManyOptions<GeneroPorDiscoEntity>):Promise<GeneroPorDiscoEntity[]>{
        return this._generoPorDiscoRepository.find(parametrosBusqueda)
    }

    crear(generoPorDisco: CreateGeneroPorDiscoDto): Promise<GeneroPorDiscoEntity>{
        // @ts-ignore
        const generoPorDiscoEntity: GeneroPorDiscoEntity = this._generoPorDiscoRepository.create(generoPorDisco);
        return this._generoPorDiscoRepository.save(generoPorDiscoEntity)
    }
    eliminar(idGeneroPorDisco: number): Promise<GeneroPorDiscoEntity>{
        const generoPorDiscoAEliminar = this._generoPorDiscoRepository.create({idGeneroPorDisco: idGeneroPorDisco});
        return this._generoPorDiscoRepository.remove(generoPorDiscoAEliminar);

    }

    actualizar(nuevoGeneroPorDisco: GeneroPorDiscoEntity): Promise<GeneroPorDiscoEntity>{
        const generoPorDiscoEntity: GeneroPorDiscoEntity = this._generoPorDiscoRepository.create(nuevoGeneroPorDisco);
        return this._generoPorDiscoRepository.save(generoPorDiscoEntity);
    }

    buscarPorId(idGeneroPorDisco: number): Promise<GeneroPorDiscoEntity>{
        return this._generoPorDiscoRepository.findOne(idGeneroPorDisco);
    }

    buscarPorIdSession(idSession: number):Promise<GeneroPorDiscoEntity>{
        return this._generoPorDiscoRepository.findOne({where: {idUsuario: +idSession}})
    }

    buscarSiExiste(idDisco: number, idGenero:number): Promise<GeneroPorDiscoEntity>{
        return this._generoPorDiscoRepository.findOne({where:{idDisco: idDisco, idGenero: idGenero}})
}

crearUnDiscoIntermedio(idDisco, idGenero){
    let DiscoGenero: GeneroPorDisco = {idDisco: idDisco, idGenero: idGenero};
    const DiscoEntity: GeneroPorDiscoEntity = this._generoPorDiscoRepository.create(DiscoGenero);
    return this._generoPorDiscoRepository.save(DiscoEntity)
}

buscarPorIDS(idDiscos: number[]):Promise<GeneroPorDiscoEntity[]>{
    return this._generoPorDiscoRepository.findByIds(idDiscos);
}



}