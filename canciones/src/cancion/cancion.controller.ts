import {Body, Controller, Get, Param, Post, Query, Res, Session} from "@nestjs/common";
import {CancionService} from "./cancion.service";
import {CancionEntity} from "./cancion.entity";
import {FindManyOptions, Like} from "typeorm";
import {Cancion} from "../app.controller";
import { CreateCancionDto } from "./dto/create-cancion.dto";
import { ValidationError, validate } from "class-validator";

@Controller('cancion')
export class CancionController {
    constructor(private readonly _cancionService: CancionService){}

    @Get('inicio')
    async inicio(
        @Res() response,
        @Query('busqueda') busqueda: string,
        @Query('accion') accion: string,
        @Query('nombre') nombre: string
    ){
        let mensaje =  undefined;
        let clase = undefined;
        if(accion && nombre){
            switch(accion){
                case 'borrar':
                    mensaje = `Registro ${nombre} eliminado`;
                    clase = 'alert alert-danger';
                    break;
                case 'actualizar':
                    mensaje = `Registro ${nombre} actualizado.`;
                    clase = 'alert alert-info';
                    break;

                case 'crear':
                    mensaje = `Registro ${nombre} creado.`;
                    clase = 'alert alert-succes';
                    break;
            }
        }
        let canciones: CancionEntity[];
        
        if (busqueda){
            const consulta: FindManyOptions<CancionEntity> = {
                where:[
                    {
                        nombreCancion: Like(`%${busqueda}`)
                    },
                    {
                        anioCancion: Like(`%${busqueda}%`)
                    }
                ]
            };
            canciones = await this._cancionService.buscar(consulta);
        } else {
            canciones = await this._cancionService.buscar();
        }

        response.render(
            'inicio',
            {
                usuario: 'Analy',
                arreglo: canciones,
                booleano: false,
                mensaje: mensaje,
                clase:clase
            }
        );

    }

    @Post('eliminar/:idCancion')
    async eliminar(
        @Res() response,
        @Param('idCancion') idCancion: string
    ){
        const cancion = await this._cancionService.buscarPorId(+idCancion);

        await this._cancionService.eliminar(Number(idCancion));
        const parametrosConsulta = `?accion=borrar&titulo=${
            cancion.nombreCancion
            }`;
        response.redirect('/cancion/inicio'+ parametrosConsulta)
    }

    @Get('crear-cancion')
    crearcancionRuta(
        @Res() response,
        @Query('error') error
    ){
        let mensaje = undefined;
            let clase = undefined;
            if(error ){
                mensaje = `Error en el compo ${error}`;
                clase = 'alert alert-danger';
            }
        response.render(
            'crear-cancion',
            {
                mensaje: mensaje,
                clase: clase
            }
            
        )
    }

    @Post('crear-cancion')
    async crearcancionFuncion(
        @Res() response,
        @Body() cancion:CreateCancionDto
    ){
        const objetoValidacionArtista = new CreateCancionDto();
            objetoValidacionArtista.nombreCancion= cancion.nombreCancion;
            objetoValidacionArtista.anioCancion = +cancion.anioCancion;
            

            const errores: ValidationError[] = await validate(objetoValidacionArtista);
            const  hayErrores = errores.length >0;
            console.log("numero de errores en crear artista: "+errores.length);
            const mensajeError = errores[0];

            const listaError = [];
            console.log(errores)
            errores.forEach(
                (error) => {
                    listaError.push(error.property)
                }
            );

            if(hayErrores){
                //throw new BadRequestException({mensaje: 'Error de validación en crear', error: mensajeError})

                const parametrosConsulta = `?error=${
                    listaError.toString()
                    }`;

                response.redirect('/cancion/inicio'+parametrosConsulta)


            }else{
                const respuesta = this._cancionService.crear(cancion);
        const parametrosConsulta = `?accion=crear&nombre=${cancion.nombreCancion}`;

        response.redirect('/cancion/inicio'+ parametrosConsulta)
            }
        
    }


    @Get('actualizar-cancion/:idCancion')
    async actualizarcancionRuta(
        @Res() response,
        @Query('error') error,
        @Param('idCancion') idCancion:string,
        @Session() sesion
    ){
        if(!sesion.usuario){
            response.redirect('/login')
        }
        let mensaje = undefined;
        let clase = undefined;
            if(error ){
                mensaje = `Error en el compo ${error}`;
                clase = 'alert alert-danger';
            }
        const cancionEncontrada = await this._cancionService
            .buscarPorId(+idCancion);

        response.render(
            'crear-cancion',
            {
                mensaje: mensaje,
                clase: clase,
                cancion: cancionEncontrada
            }
            
        )
    }

    @Post('actualizar-cancion/:idCancion')
    async actualizrcancionFuncion(
        @Res() response,
        @Body() cancion:CreateCancionDto,
        @Param('idCancion') idCancion:string
    ){
        const objetoValidacionArtista = new CreateCancionDto();
            objetoValidacionArtista.nombreCancion= cancion.nombreCancion;
            objetoValidacionArtista.anioCancion = +cancion.anioCancion;
            

            const errores: ValidationError[] = await validate(objetoValidacionArtista);
            const  hayErrores = errores.length >0;
            console.log("numero de errores en crear artista: "+errores.length);
            const mensajeError = errores[0];

            const listaError = [];
            console.log(errores)
            errores.forEach(
                (error) => {
                    listaError.push(error.property)
                }
            );

            if(hayErrores){
                //throw new BadRequestException({mensaje: 'Error de validación en crear', error: mensajeError})

                const parametrosConsulta = `?error=${
                    listaError.toString()
                    }`;

                response.redirect('/cancion/inicio'+parametrosConsulta)


            }else{
                const respuesta = this._cancionService.actualizar(cancion);
        const parametrosConsulta = `?accion=actualizar&nombre=${cancion.nombreCancion}`;

        response.redirect('/cancion/inicio'+ parametrosConsulta)
            }
        
    }



}