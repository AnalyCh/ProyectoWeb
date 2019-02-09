import {Module} from "@nestjs/common";
import { ArtistaPorBandaEntity } from "./artista-por-banda.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ArtistaPorBandaController } from "./artista-por-banda.controller";
import { ArtistaPorBandaService } from "./artista-por-banda.service";

@Module({
    imports:[
        TypeOrmModule.forFeature(
            [
                ArtistaPorBandaEntity
            ]
    )
    ],
    controllers:[
        ArtistaPorBandaController
    ],
    providers:[
        ArtistaPorBandaService
    ],
    exports:[
        ArtistaPorBandaService
    ]
})
export class ArtistaPorBandaModule{}