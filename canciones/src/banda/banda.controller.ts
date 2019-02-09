import {Controller, Post, Param, Get, Res, Query, Body, BadRequestException} from "@nestjs/common";
import { BandaService } from "./banda.service";
import { ArtistaEntity } from "src/artista/artista.entity";
import { BandaEntity } from "./banda.entity";
import { ArtistaService } from "src/artista/artista.service";
import { CreateBandaDto } from "./dto/create-banda.dto";
import { ValidationError, validate } from "class-validator";

@Controller('banda')
export class BandaController{

    constructor(
        private readonly _bandaService: BandaService,
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
        let bandas: BandaEntity[];
         
        bandas = await this._bandaService.buscar();
        
        res.render(
            'inicio-artistas',
            {
                arreglo: bandas,
                mensaje: mensaje,
                clase: clase
            }
        )
    };

    @Get('crear-banda')
    async crearBandaRuta(
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
                    arregloArtistas: artistas,
                    clase: clase

                }
            )
        // }

    };


    @Post('crear-banda')
    async crearArtista(
        @Res() response,
        @Body() banda: Banda,
        
    ){
        // if(session.rol === "usuario"){
            const objetoValidacionArtista = new CreateBandaDto();
            objetoValidacionArtista.nombreBanda= banda.nombreBanda;
            objetoValidacionArtista.nacionalidadBanda = banda.nacionalidad;
            const fec  =  new Date(banda.fechaAgrupacion).toISOString();
            objetoValidacionArtista.fechaAgrupacionBanda = fec;

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

                response.redirect('/banda/crear-banda'+parametrosConsulta)


            }else{
                //await this._bandaService.crear(artista);
                // const parametrosConsulta = `?accion=crear&nombreMarca=${
                    // artista.nombreMarca
                    // }`;

                // response.redirect('/artista/inicio'+parametrosConsulta)
            }
        // }

    };

    @Get('actualizar-banda/:idBanda')
    async actualizarBandaVista(
        @Res() response,
        @Param('idBanda') idBanda: string,
        
    ){
        // if(session.rol === "usuario"){
            const bandaEncontrado = await this._bandaService
                .buscarPorId(+idBanda);

            

            let artistas: ArtistaEntity[];
            artistas = await this._artistaService.buscar();
            response.render(
                'crear-auto',
                {
                    auto: bandaEncontrado,
                    arregloArtistas: artistas
                }
            )
        //}
    };

    @Post('actualizar-banda/:idBanda')
    async actualizarBandaMetodo(
        @Res() response,
        @Param('idBanda') idBanda: string,
        @Body() banda: Banda,
        
    ){
        // if(session.rol === 'usuario'){
            //
            
            const objetoValidacionArtista = new CreateBandaDto();
            objetoValidacionArtista.nombreBanda= banda.nombreBanda;
            objetoValidacionArtista.nacionalidadBanda = banda.nacionalidad;
            const fec  =  new Date(banda.fechaAgrupacion).toISOString();
            objetoValidacionArtista.fechaAgrupacionBanda = fec;
            

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
                    banda.nombreBanda
                    }`;

                response.redirect('/banda/inicio'+parametrosConsulta)
            }
        // }

    };

    @Post('eliminar/:idBanda')
    async eliminar(
        @Res() response,
        @Param('idBanda') idBanda: string,
        
    ){
        // if(session.rol  ==="usuario"){
            // const auto = await this._bandaService.buscarPorId(+idArtista);
            // await this._bandaService
                // .eliminar(+idArtista);

            const parametrosConsulta = `?accion=borrar&nombreArtista=${idBanda}`;
//artista.nombre
                
            response.redirect('/banda/inicio'+ parametrosConsulta)
        // }

    };
}

export interface Banda{
    idBanda?: number,
    nombreBanda: string,
    nacionalidad: string,
    fechaAgrupacion: Date,

}