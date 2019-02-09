import {Body, Controller, Get, Param, Post, Query, Res} from "@nestjs/common";
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

        if(accion && nombre){
            switch(accion){
                case 'borrar':
                    mensaje = `Registro ${nombre} eliminado`;
                    break;
                case 'actualizar':
                    mensaje = `Registro ${nombre} actualizado.`;
                    break;

                case 'crear':
                    mensaje = `Registro ${nombre} creado.`;
                    break;
            }
        }
        let canciones: CancionEntity[];
        
        if (busqueda){
            const consulta: FindManyOptions<CancionEntity> = {
                where:[
                    {
                        nombre: Like(`%${busqueda}`)
                    },
                    {
                        anio: Like(`%${busqueda}%`)
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
                mensaje: mensaje
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
        response.redirect('cancion/inicio'+ parametrosConsulta)
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
            objetoValidacionArtista.anioCancion = cancion.anioCancion;
            

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

                response.redirect('/cancion/crear-cancion'+parametrosConsulta)


            }else{
                const respuesta = this._cancionService.crear(cancion);
        const parametrosConsulta = `?accion=crear&titulo=${cancion.nombreCancion}`;

        response.redirect('cancion/inicio'+ parametrosConsulta)
            }
        
    }


    @Get('actualizar-cancion')
    actualizarcancionRuta(
        @Res() response,
        @Query('error') error,
    ){
        let mensaje = undefined;
            let clase = undefined;
            if(error ){
                mensaje = `Error en el compo ${error}`;
                clase = 'alert alert-danger';
            }
        response.render(
            'actualizar-cancion',
            {
                mensaje: mensaje,
                clase: clase
            }
            
        )
    }

    @Post('actualizar-cancion')
    async actualizrcancionFuncion(
        @Res() response,
        @Body() cancion:CreateCancionDto
    ){
        const objetoValidacionArtista = new CreateCancionDto();
            objetoValidacionArtista.nombreCancion= cancion.nombreCancion;
            objetoValidacionArtista.anioCancion = cancion.anioCancion;
            

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

                response.redirect('/cancion/actualizar-cancion'+parametrosConsulta)


            }else{
                const respuesta = this._cancionService.actualizar(cancion);
        const parametrosConsulta = `?accion=actualizar&titulo=${cancion.nombreCancion}`;

        response.redirect('cancion/inicio'+ parametrosConsulta)
            }
        
    }



}