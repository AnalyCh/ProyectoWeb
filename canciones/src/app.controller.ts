import {Body, Controller, Get, HttpCode, Post, Res, Session} from '@nestjs/common';
import { AppService } from './app.service';
import {UsuarioService} from "./usuario/usuario.service";
import {UsuarioLoginDto} from "./usuario/dto/usuario-login.dto";
import {validate, ValidationError} from "class-validator";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService,
                private readonly _usuarioService: UsuarioService) {

    }


    @Get('login')
    mostrarLogin(
        @Res() res
    ){
        res.render('login')
    }

    @Post('login')
    @HttpCode(200)
    async ejecutarLogin(
        @Body('username') username:string,
        @Body('password') password:string,
        @Session() sesion,
        @Res() res
    ){

        const usuarioValidado = new UsuarioLoginDto();
        usuarioValidado.username = username;
        usuarioValidado.password = password;
        const errores: ValidationError[] = await validate(usuarioValidado);

        const hayErrores = errores.length > 0;

        if(hayErrores){
            res.redirect('/login?errores=Hayerrores');

        }else {
            const respuesta = await this._usuarioService
                .autenticar(username, password);

            const usuario = await this._usuarioService
                .buscarPorId(respuesta);


            if (usuario !== undefined) {

                //res.send(sesion)
                if (usuario.tipo === "usuario") {
                    const parametroConsulta = `?idUsuario=${usuario.id}`
                    res.redirect('menu')
                } else if (sesion.usuario.esAdministrador) {
                    res.redirect('usuario/inicio')
                } else {
                    const clase = 'alert alert-danger';
                    res.render('menu',
                        {
                            mensaje: 'No tiene los accesos necesarios',
                            clase: clase
                        })
                }

            } else {
                const clase = 'alert alert-danger';
                res.render('login',
                    {
                        mensaje: 'No existe ususario',
                        clase: clase
                    });
            }
        }
    }

    @Get('menu') // url
    mostrarMenu(
        @Res() res
    ){
        res.render('menu')
    }

}

export interface Cancion {
    id?: number;
    nombre: string
}
export interface Usuario {
    id?: number;
    nombre: string;
    tipo: string
}