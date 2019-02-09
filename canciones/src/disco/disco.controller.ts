import {Controller, Get, Res, Query, Post, Param, Body} from "@nestjs/common";
import { DiscoService } from "./disco.service";
import { DiscoEntity } from "./disco.entity";
import { FindManyOptions, Like } from "typeorm";
import { CreateDiscoDto } from "./dto/create-disco.dto";
import { ValidationError, validate } from "class-validator";

@Controller('disco')
export class DiscoController{

    constructor(private readonly _discoService: DiscoService){}

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
        let discos: DiscoEntity[];
        
        if (busqueda){
            const consulta: FindManyOptions<DiscoEntity> = {
                where:[
                    {
                        nombre: Like(`%${busqueda}`)
                    }
                ]
            };
            discos = await this._discoService.buscar(consulta);
        } else {
            discos = await this._discoService.buscar();
        }

        response.render(
                'inicio-discos',
            {
                usuario: 'Analy',
                arreglo: discos,
                booleano: false,
                mensaje: mensaje
            }
        );

    };


    @Post('eliminar/:idDisco')
    async eliminar(
        @Res() response,
        @Param('idDisco') idDisco: string
    ){
        const disco = await this._discoService.buscarPorId(+idDisco);

        await this._discoService.eliminar(Number(idDisco));
        const parametrosConsulta = `?accion=borrar&titulo=${
            idDisco
            }`;
        response.redirect('disco/inicio'+ parametrosConsulta)
    }

    @Get('crear-disco')
    creardiscoRuta(
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
            'crear-disco',
            {
                mensaje: mensaje,
                clase: clase
            }
            
        )
    }

    @Post('crear-disco')
    async creardiscoFuncion(
        @Res() response,
        @Body() disco:CreateDiscoDto
    ){
        const objetoValidacionArtista = new CreateDiscoDto()
            objetoValidacionArtista.nombreDisco = disco.nombreDisco;
            objetoValidacionArtista.anioDisco = disco.anioDisco;
            

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

                response.redirect('/disco/crear-disco'+parametrosConsulta)


            }else{
                const respuesta = this._discoService.crear(disco);
        const parametrosConsulta = `?accion=crear&titulo=${disco.nombreDisco}`;

        response.redirect('disco/inicio'+ parametrosConsulta)
            }
        
    }


    @Get('actualizar-disco')
    actualizardiscoRuta(
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
            'actualizar-disco',
            {
                mensaje: mensaje,
                clase: clase
            }
            
        )
    }

    @Post('actualizar-disco')
    async actualizrdiscoFuncion(
        @Res() response,
        @Body() disco:CreateDiscoDto
    ){
        const objetoValidacionArtista = new CreateDiscoDto();
            objetoValidacionArtista.nombreDisco= disco.nombreDisco;
            objetoValidacionArtista.anioDisco = disco.anioDisco;
            

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

                response.redirect('/disco/actualizar-disco'+parametrosConsulta)


            }else{
                //const respuesta = this._discoService.actualizar(disco);
                const parametrosConsulta = `?accion=actualizar&titulo=${disco.nombreDisco}`;

                response.redirect('disco/inicio'+ parametrosConsulta)
            }
        
    }

}