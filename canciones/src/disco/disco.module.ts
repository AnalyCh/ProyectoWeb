import {Module} from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DiscoEntity } from "./disco.entity";
import { DiscoController } from "./disco.controller";
import { DiscoService } from "./disco.service";

@Module({
    imports:[
        TypeOrmModule.forFeature(
            [
                DiscoEntity
            ]
    )
    ],
    controllers:[
        DiscoController
    ],
    providers:[
        DiscoService
    ],
    exports:[
        DiscoService
    ]
})
export class DiscoModule{}