import {Module} from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GeneroPorDiscoEntity } from "./genero-por-disco.entity";
import { GeneroPorDiscoController } from "./genero-por-disco.controller";
import { GeneroPorDiscoService } from "./genero-por-disco.service";
import {GeneroEntity} from "../genero/genero.entity";
import {GeneroController} from "../genero/genero.controller";
import {GeneroService} from "../genero/genero.service";

@Module({
    imports:[
        TypeOrmModule.forFeature(
            [
                GeneroPorDiscoEntity,
                GeneroEntity
            ]
    )
    ],
    controllers:[
        GeneroPorDiscoController,
        GeneroController
    ],
    providers:[
        GeneroPorDiscoService,
        GeneroService
    ],
    exports:[
        GeneroPorDiscoService
    ]
})
export class GeneroPorDiscoModule{}