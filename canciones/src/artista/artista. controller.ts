import {Controller, Get, Query, Res, Post, Body, Param, BadRequestException} from "@nestjs/common";
import { ArtistaService } from "./artista.service";
import { ArtistaEntity } from "./artista.entity";
import { FindManyOptions, Like } from "typeorm";
import { CreateArtistaDto } from "./dto/create-artista.dto";
import { ValidationError, validate } from "class-validator";

@Controller('artista')
export class ArtistaController{


    constructor(
        private readonly _artistaService: ArtistaService,
    ){}

    @Get('inicio')
    async inicio(
        @Res() res,
        @Query('busqueda') busqueda,
        @Query('accion') accion: string,
        @Query('marca') marca: string,

    ){
        let mensaje = undefined;
        let clase = undefined;
        if(accion && marca){
            switch(accion){
                case 'borrar':
                    mensaje = `Registro ${marca} eliminado`;
                    clase = 'alert alert-danger';
                    break;
                case 'actualizar':
                    mensaje = `Registro ${marca} actualizado`;
                    clase = 'alert alert-info';
                    break;
    
                case 'crear':
                    mensaje = `Registro ${marca} creado`;
                    clase = 'alert alert-success';
                    break;
            }
        }
        let artistas: ArtistaEntity[];
        if(busqueda){
            const consulta: FindManyOptions<ArtistaEntity>= {
                where:[
                    {
                        nombre: Like(`${busqueda}`)
                    },
                    {
                        nacionalidad: Like(`${busqueda}`)
                    }
                ]
            };
            artistas = await this._artistaService.buscar(consulta);
        } else{
            artistas = await this._artistaService.buscar();
        }
        res.render(
            'inicio-artistas',
            {
                arregloArtistas: artistas,
                mensaje: mensaje,
                clase: clase
            }
        )
    };

    @Get('crear-artista')
    async crearartistaRuta(
        @Res() response,
        @Query('error') error,
        //@Session() session,
    ){
        // if(session.rol === "usuario"){
            let mensaje = undefined;
            let clase = undefined;
            if(error ){
                mensaje = `Error en el compo ${error}`;
                clase = 'alert alert-danger';
            }


            let artistas: ArtistaEntity[];
            artistas = await this._artistaService.buscar();
            response.render(
                'crear-artista',
                {
                    titulo: 'Crear artista',
                    mensaje: mensaje,
                    arreglo: artistas,
                    clase: clase

                }
            )
        // }

    };


    @Post('crear-artista')
    async crearArtista(
        @Res() response,
        @Body() artista: Artista,
        
    ){
        // if(session.rol === "usuario"){
            const objetoValidacionArtista = new CreateArtistaDto();

            artista.idAutor = Number(artista.idAutor);

            objetoValidacionArtista.nombreArtista = artista.nombreArtista;
            objetoValidacionArtista.nacionalidadArtista = artista.nacionalidadArtista;
            

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

                response.redirect('/artista/crear-artista'+parametrosConsulta)


            }else{
                //await this._artistaService.crear(artista);
                // const parametrosConsulta = `?accion=crear&nombreMarca=${
                    // artista.nombreMarca
                    // }`;

                // response.redirect('/artista/inicio'+parametrosConsulta)
            }
        // }

    };

    @Get('actualizar-artista/:idArtista')
    async actualizarAutoVista(
        @Res() response,
        @Param('idArtista') idArtista: string,
        
    ){
        // if(session.rol === "usuario"){
            const autoEncontrado = await this._artistaService
                .buscarPorId(+idArtista);

            

            let artistas: ArtistaEntity[];
            artistas = await this._artistaService.buscar();
            response.render(
                'crear-auto',
                {
                    auto: autoEncontrado,
                    arregloArtistas: artistas
                }
            )
        //}
    };

    @Post('actualizar-artista/:idArtista')
    async actualizarAutoMetodo(
        @Res() response,
        @Param('idArtista') idArtista: string,
        @Body() artista: Artista,
        
    ){
        // if(session.rol === 'usuario'){
            //
            
            const objetoValidacionArtista = new CreateArtistaDto();

            artista.idAutor = Number(artista.idAutor);

            objetoValidacionArtista.nombreArtista = artista.nombreArtista;
            objetoValidacionArtista.nacionalidadArtista = artista.nacionalidadArtista;
            

            const errores: ValidationError[] = await validate(objetoValidacionArtista);
            const  hayErrores = errores.length >0;
            console.log("numero de errores en crear artista: "+errores.length);
            const mensajeError = errores[0];
            
            console.log("error: "+errores.length);
            const listaError = [];
            console.log(errores);
            errores.forEach(
                (error) => {
                    listaError.push(error.property)
                    console.log(error.property)
                }
            );

            if(hayErrores){
                throw new BadRequestException({mensaje: 'Error de validación en actualizar', error: mensajeError})
            }else{
                // @ts-ignore
                // await this._autoService.actualizar(auto);
                const parametrosConsulta = `?accion=actualizar&nombreMarca=${
                    artista.nombreArtista
                    }`;

                response.redirect('/artista/inicio'+parametrosConsulta)
            }
        // }

    };

    @Post('eliminar/:idArtista')
    async eliminar(
        @Res() response,
        @Param('idArtista') idArtista: string,
        
    ){
        // if(session.rol  ==="usuario"){
            // const auto = await this._artistaService.buscarPorId(+idArtista);
            // await this._artistaService
                // .eliminar(+idArtista);

            const parametrosConsulta = `?accion=borrar&nombreArtista=${idArtista}`;
//artista.nombre
                
            response.redirect('/artista/inicio'+ parametrosConsulta)
        // }

        
};









    
}


export interface Artista{
    idArtista?: number,
    idAutor?: number,
    nombreArtista: string,
    nacionalidadArtista: string,
    fechaNacimientoArtista: Date, 
}