import {Module} from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BandaEntity } from "./banda.entity";
import { BandaController } from "./banda.controller";
import { BandaService } from "./banda.service";

@Module({
    imports:[
        TypeOrmModule.forFeature(
            [
                BandaEntity
            ]
    )
    ],
    controllers:[
        BandaController
    ],
    providers:[
        BandaService
    ],
    exports:[
        BandaService
    ]
})
export class BandaModule{}