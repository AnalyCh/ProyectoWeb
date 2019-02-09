import {Controller, Get, Res, Query, Post, Param, Body} from "@nestjs/common";
import { GeneroService } from "./genero.service";
import { GeneroEntity } from "./genero.entity";
import { FindManyOptions, Like } from "typeorm";
import { CreateGeneroDto } from "./dto/create-genero.dto";
import { ValidationError, validate } from "class-validator";

@Controller('genero')
export class GeneroController{

    constructor(private readonly _generoService: GeneroService){}

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
        let generos: GeneroEntity[];
        
        if (busqueda){
            const consulta: FindManyOptions<GeneroEntity> = {
                where:[
                    {
                        nombre: Like(`%${busqueda}`)
                    }
                ]
            };
            generos = await this._generoService.buscar(consulta);
        } else {
            generos = await this._generoService.buscar();
        }

        response.render(
                'inicio-generos',
            {
            usuario: 'Analy',
                arreglo: generos,
                booleano: false,
                mensaje: mensaje
            }
        );

    };


    @Post('eliminar/:idGenero')
    async eliminar(
        @Res() response,
        @Param('idGenero') idGenero: string
    ){
        const genero = await this._generoService.buscarPorId(+idGenero);

        await this._generoService.eliminar(Number(idGenero));
        const parametrosConsulta = `?accion=borrar&titulo=${
            idGenero
            }`;
        response.redirect('genero/inicio'+ parametrosConsulta)
    }

    @Get('crear-genero')
    creargeneroRuta(
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
            'crear-genero',
            {
                mensaje: mensaje,
                clase: clase
            }
            
        )
    }

    @Post('crear-genero')
    async creargeneroFuncion(
        @Res() response,
        @Body() genero:CreateGeneroDto
    ){
        const objetoValidacionArtista = new CreateGeneroDto()
            objetoValidacionArtista.nombre = genero.nombre;
            
            

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

                response.redirect('/genero/crear-genero'+parametrosConsulta)


            }else{
                const respuesta = this._generoService.crear(genero);
        const parametrosConsulta = `?accion=crear&titulo=${genero.nombre}`;

        response.redirect('genero/inicio'+ parametrosConsulta)
            }
        
    }


    @Get('actualizar-genero')
    actualizargeneroRuta(
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
            'actualizar-genero',
            {
                mensaje: mensaje,
                clase: clase
            }
            
        )
    }

    @Post('actualizar-genero')
    async actualizrgeneroFuncion(
        @Res() response,
        @Body() genero:CreateGeneroDto
    ){
        const objetoValidacionArtista = new CreateGeneroDto();
            objetoValidacionArtista.nombre= genero.nombre;
            
            

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

                response.redirect('/genero/actualizar-genero'+parametrosConsulta)


            }else{
                //const respuesta = this._generoService.actualizar(genero);
                const parametrosConsulta = `?accion=actualizar&titulo=${genero.nombre}`;

                response.redirect('genero/inicio'+ parametrosConsulta)
            }
        
    }

}