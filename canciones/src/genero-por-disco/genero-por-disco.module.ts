import {Module} from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GeneroPorDiscoEntity } from "./genero-por-disco.entity";
import { GeneroPorDiscoController } from "./genero-por-disco.controller";
import { GeneroPorDiscoService } from "./genero-por-disco.service";

@Module({
    imports:[
        TypeOrmModule.forFeature(
            [
                GeneroPorDiscoEntity
            ]
    )
    ],
    controllers:[
        GeneroPorDiscoController
    ],
    providers:[
        GeneroPorDiscoService
    ],
    exports:[
        GeneroPorDiscoService
    ]
})
export class GeneroPorDiscoModule{}