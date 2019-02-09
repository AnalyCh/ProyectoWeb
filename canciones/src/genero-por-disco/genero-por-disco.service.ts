import {Injectable} from "@nestjs/common";
import {FindManyOptions, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {GeneroPorDiscoEntity} from "./genero-por-disco.entity";
import {CreateGeneroPorDiscoDto} from "./dto/create-genero-por-disco.dto";

@Injectable()
export class GeneroPorDiscoService{
    constructor(
        @InjectRepository(GeneroPorDiscoEntity)
        private readonly generoPorDiscoEntityRepository: Repository<GeneroPorDiscoEntity>
    ){}

    buscar(parametrosBusqueda?: FindManyOptions<GeneroPorDiscoEntity>):Promise<GeneroPorDiscoEntity[]>{
        return this.generoPorDiscoEntityRepository.find(parametrosBusqueda)
    }

    crear(generoPorDisco: CreateGeneroPorDiscoDto): Promise<GeneroPorDiscoEntity>{
        // @ts-ignore
        const generoPorDiscoEntity: GeneroPorDiscoEntity = this.generoPorDiscoEntityRepository.create(generoPorDisco);
        return this.generoPorDiscoEntityRepository.save(generoPorDiscoEntity)
    }
    eliminar(idGeneroPorDisco: number): Promise<GeneroPorDiscoEntity>{
        const generoPorDiscoAEliminar = this.generoPorDiscoEntityRepository.create({idGeneroPorDisco: idGeneroPorDisco});
        return this.generoPorDiscoEntityRepository.remove(generoPorDiscoAEliminar);

    }

    actualizar(nuevoGeneroPorDisco: GeneroPorDiscoEntity): Promise<GeneroPorDiscoEntity>{
        const generoPorDiscoEntity: GeneroPorDiscoEntity = this.generoPorDiscoEntityRepository.create(nuevoGeneroPorDisco);
        return this.generoPorDiscoEntityRepository.save(generoPorDiscoEntity);
    }

    buscarPorId(idGeneroPorDisco: number): Promise<GeneroPorDiscoEntity>{
        return this.generoPorDiscoEntityRepository.findOne(idGeneroPorDisco);
    }

    buscarPorIdSession(idSession: number):Promise<GeneroPorDiscoEntity>{
        return this.generoPorDiscoEntityRepository.findOne({where: {idUsuario: +idSession}})
    }
}