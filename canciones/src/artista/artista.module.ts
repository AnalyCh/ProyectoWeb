import {Module} from "@nestjs/common";
import { ArtistaService } from "./artista.service";
import { ArtistaController } from "./artista. controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ArtistaEntity } from "./artista.entity";

@Module({
    imports:[
        TypeOrmModule.forFeature(
            [
                ArtistaEntity
            ]
    )
    ],
    controllers:[
        ArtistaController
    ],
    providers:[
        ArtistaService
    ],
    exports:[
        ArtistaService
    ]
})
export class ArtistaModule{}