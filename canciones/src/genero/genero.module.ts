import {Module} from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GeneroEntity } from "./genero.entity";
import { GeneroController } from "./genero.controller";
import { GeneroService } from "./genero.service";

@Module({
    imports:[
        TypeOrmModule.forFeature(
            [
                GeneroEntity
            ]
    )
    ],
    controllers:[
        GeneroController
    ],
    providers:[
        GeneroService
    ],
    exports:[
        GeneroService
    ]
})
export class GeneroModule{}