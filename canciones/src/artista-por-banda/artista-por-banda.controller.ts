import {Controller, Get, Res, Query, Param, Post} from "@nestjs/common";
import { BandaService } from "src/banda/banda.service";
import { ArtistaPorBandaService } from "./artista-por-banda.service";
import { ArtistaService } from "src/artista/artista.service";
import { BandaEntity } from "src/banda/banda.entity";
import { ArtistaEntity } from "src/artista/artista.entity";
import { FindManyOptions, Like } from "typeorm";
import { ArtistaPorBandaEntity } from "./artista-por-banda.entity";
import { CreateArtistaPorBandaDto } from "./dto/create-artista-por-banda.dto";
import { ValidationError, validate } from "class-validator";

@Controller('artista-por-banda')
export class ArtistaPorBandaController{

    constructor(
        private readonly _artistabandaService: ArtistaPorBandaService,
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

    @Get('add-artista-a-banda')
    async addArtistaRuta(
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


    @Get('add-artista/:idBanda')
    async addConductor(
        @Res() response,
        @Param('idBanda') idBanda: string,
        @Query('error') error
    ){
        let mensaje = undefined;
        let clase = undefined;
        if(error ){
            mensaje = `Error en el compos ${error}`;
            clase = 'alert alert-danger';
        }
        console.log(idBanda);
        let artistasActuales: ArtistaEntity[];

        if(idBanda) {
            const consulta: FindManyOptions<ArtistaPorBandaEntity> = {
                where: [
                    {
                        idArtista: Like(`${+idBanda}`)
                    }
                ]
            };
            const bandas = await this._artistabandaService.buscar(consulta);
            let idArtistas = [];

            bandas.forEach(
                (banda)=>{
                    idArtistas.push(banda.idArtista)
                }
            );
            artistasActuales = await this._artistaService.buscarPorIDS(idArtistas);
        }
        let artistas= await this._artistaService.buscar();

        response.render(
            'add-artistas-a-banda',{
                arreglo: artistas,
                conductores: artistasActuales,
                mensaje: mensaje,
                idBanda: idBanda,
                clase: clase,


            }
        )
    }

    @Get('add-artista/:idBanda/:idArtista')
    async addbandaArtista(
        @Res() response,
        @Param('idBanda') idBanda: string,
        @Param('idArtista') idArtista: string,
        @Query('error') error
    ){
        let mensaje = undefined;
        let clase = undefined;
        if(error ){
            mensaje = `Error en el compos ${error}`;
            clase = 'alert alert-danger';
        }

        console.log(idBanda);
        let artistasActuales: ArtistaEntity[];

        if(idBanda) {
            const consulta: FindManyOptions<ArtistaPorBandaEntity> = {
                where: [
                    {
                        idArtista: Like(`${+idBanda}`)
                    }
                ]
            };
            const bandas = await this._artistabandaService.buscar(consulta);
            let idArtistas = [];

            bandas.forEach(
                (banda)=>{
                    idArtistas.push(banda.idArtista)
                }
            );
            artistasActuales = await this._artistaService.buscarPorIDS(idArtistas);
        }
        let artistas= await this._artistaService.buscar();

        response.render(
            'add-artistas-a-banda',{
                arreglo: artistas,
                conductores: artistasActuales,
                mensaje: mensaje,
                idBanda: idBanda,
                clase: clase,


            }
        )
    }


    @Post('add-artista/:idBanda/:idArtista')
    async aniadirConductor(
        @Res() response,

        @Param('idArtista') idArtista: string,
        @Param('idBanda') idBanda: string
    ) {

        const validar = new CreateArtistaPorBandaDto();

        validar.idBanda = Number(idBanda);
        validar.idArtista = Number(idArtista);

        const errores: ValidationError[] = await validate(validar);
        const hayErrores = errores.length > 0;
        console.log("numeroerrores: " + errores.length);
        const listaError = [];
        console.log(errores);
        errores.forEach(
            (error) => {
                listaError.push(error.property);
                console.log(error)
            }
        );


        if (hayErrores) {
            const parametrosConsulta = `?error=${
                listaError.toString()
                }`;

            response.redirect('/artista-por-conductor/add-artista-a-banda/' + parametrosConsulta)
        } else {
            const bandaArtistaACrear =
                await this._artistabandaService.buscarSiExiste(Number(idArtista), Number(idBanda));



            if(bandaArtistaACrear){
                //console.log(bandaArtistaACrear.idConductor)
                console.log('Si existe');
                await this._artistabandaService.eliminar(Number(idArtista));
                const parametrosConsulta = `?accion=eliminar`;

                response.redirect(''+parametrosConsulta);
            }else {

                console.log('no existe');
                await this._artistabandaService.crearUnEventoIntermedio(Number(idArtista), Number(idBanda));
                const parametrosConsulta = `?accion=crear`;
                response.redirect(''+parametrosConsulta);
            }



        }


    }



}

export interface ArtistaBanda {
    idArtistaPorBanda?: number,
    idArtista?: number,
    idBanda?: number,
}