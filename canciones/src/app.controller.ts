import {Body, Controller, Get, HttpCode, Post, Query, Res, Session} from '@nestjs/common';
import { AppService } from './app.service';
import {UsuarioService} from "./usuario/usuario.service";
import {UsuarioLoginDto} from "./usuario/dto/usuario-login.dto";
import {validate, ValidationError} from "class-validator";
import {RolEntity} from "./rol/rol.entity";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService,
                private readonly _usuarioService: UsuarioService) {

    }


    @Get('login')
    mostrarLogin(
        @Res() res,
    ){

        res.render('login');
    }

    @Post('login')
    @HttpCode(200)
    async ejecutarLogin(
        @Res() res,
        @Body('username') username:string,
        @Body('password') password:string,
        @Session() sesion

    ){

        const usuarioValidado = new UsuarioLoginDto();
        usuarioValidado.nombre = username;
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

            console.log(usuario)

            if (usuario !== undefined) {

                sesion.usuario ={
                    id: usuario.idUsuario,
                    nombre: usuario.nombreUsuario,
                    esUsuario: usuario.roles.some((rol) => {
                        return rol.nombre === 'usuario';
                    }),
                    esAdministrador: usuario.roles.some((rol) => {
                        return rol.nombre === 'administrador';
                    })


                }
                console.log(sesion);
                const admin = sesion.usuario.esAdministrador;
                const nombre =  sesion.usuario.nombre;
                res .render('menu',
                    {
                        admin: admin,
                        nombre:nombre
                    });

            } else {
                const clase = 'alert alert-danger';
                res.render('login',
                    {
                        mensaje: 'Error de Validacion',
                        clase: clase
                    });
            }
        }
    }

    @Get('menu') // url
    mostrarMenu(
        @Res() res,
        @Session() sesion
    ){
        const admin =sesion.usuario.esAdministrador;
        const nombre = sesion.usuario.nombre;
        res.render('menu',
            {
                admin: admin,
                nombre: nombre
            })
    }

    @Get('logout')
    async logout(
        @Res() res,
        @Session() sesion
    ){
        sesion.usuario = undefined,
            sesion.destroy()
        res.redirect('login')
    }

    @Get('registro')
    async mostrarRegistro(
        @Res() response,
        @Session() sesion,
        @Query('errores') errores:string

    ){
        if(errores) {
            const clase = 'alert alert-danger';
            response.render('registro',
                {
                    mensaje: "Errores de validacion",
                    clase: clase
                })
        }else {
            sesion.usuario = undefined
            sesion.destroy()
            response.render('registro');
        }


    }

}

export interface Cancion {
    id?: number;
    nombre: string
}
export interface Usuario {
    id?: number;
    nombreUsuario: string;
    passwordUsuario: string;
    roles: RolEntity[]
}