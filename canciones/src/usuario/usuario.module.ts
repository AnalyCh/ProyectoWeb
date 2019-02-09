import {Module} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";
import {TypeOrmModule} from '@nestjs/typeorm'
import {UsuarioEntity} from "./usuario.entity";
import { UsuarioController } from "./usuario.controller";
import {RolEntity} from "../rol/rol.entity";
import {RolService} from "../rol/rol.service";

@Module({
    imports:[
        TypeOrmModule
            .forFeature([
                UsuarioEntity,
                RolEntity
            ])
    ],
    controllers:[
        UsuarioController
    ],
    providers:[
        UsuarioService,
        RolService
    ],
    exports: [
        UsuarioService
    ]
})
export class UsuarioModule{

}