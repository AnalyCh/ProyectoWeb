import {Controller, Res, Get, Param, Query, Post} from "@nestjs/common";
import { GeneroPorDiscoService } from "./genero-por-disco.service";
import { GeneroEntity } from "src/genero/genero.entity";
import { FindManyOptions, Like } from "typeorm";
import { GeneroPorDiscoEntity } from "./genero-por-disco.entity";
import { CreateGeneroPorDiscoDto } from "./dto/create-genero-por-disco.dto";
import { ValidationError, validate } from "class-validator";
import { GeneroService } from "src/genero/genero.service";

@Controller('genero-por-disco')
export class GeneroPorDiscoController{
    constructor(private readonly _generoDiscoService: GeneroPorDiscoService,
        private readonly _generoService: GeneroService
        ){}


    @Get('lista-discos/:idDisco')
    async addConductor(
        @Res() response,
        @Param('idDisco') idDisco: string,
        @Query('error') error
    ){
        let mensaje = undefined;
        let clase = undefined;
        if(error ){
            mensaje = `Error en el compos ${error}`;
            clase = 'alert alert-danger';
        }
        
        
        let generosDiscoActual: GeneroPorDiscoEntity[];

        if(idDisco) {
            const consulta: FindManyOptions<GeneroPorDiscoEntity> = {

                where: [
                    {
                        idDisco: Like(`${+idDisco}`)
                    }
                ]
            };
            const discos = await this._generoDiscoService.buscar(consulta);
            let idGeneros = [];

            discos.forEach(
                (disco)=>{
                    idGeneros.push(disco.idGenero)
                }
            );
            generosDiscoActual = await this._generoDiscoService.buscarPorIDS(idGeneros);
        }
        let generos= await this._generoService.buscar();

        response.render(
            'add-generos-a-disco',{
                arreglo: generos,
                generos: generosDiscoActual,
                mensaje: mensaje,
                idDisco: idDisco,
                clase: clase,
            }
        )
    }

    @Get('lista-generos/:idDisco/:idGenero')
    async addConductorEvento(
        @Res() response,
        @Param('idDisco') idDisco: string,
        @Query('error') error
    ){
        let mensaje = undefined;
        let clase = undefined;
        if(error ){
            mensaje = `Error en el compos ${error}`;
            clase = 'alert alert-danger';
        }
        
        let generosDiscoActual: GeneroPorDiscoEntity[];

        if(idDisco) {
            const consulta: FindManyOptions<GeneroPorDiscoEntity> = {

                where: [
                    {
                        idDisco: Like(`${+idDisco}`)
                    }
                ]
            };
            const discos = await this._generoDiscoService.buscar(consulta);
            let idGeneros = [];

            discos.forEach(
                (disco)=>{
                    idGeneros.push(disco.idGenero)
                }
            );
            generosDiscoActual = await this._generoDiscoService.buscarPorIDS(idGeneros);
        }
        let generos= await this._generoService.buscar();

        response.render(
            'add-generos-a-disco',{
                arreglo: generos,
                generos: generosDiscoActual,
                mensaje: mensaje,
                idDisco: idDisco,
                clase: clase,
            }
        )
    }


    @Post('lista-generos/:idDisco/:idGenero')
    async aniadirGenero(
        @Res() response,

        @Param('idDisco') idDisco: string,
        @Param('idGenero') idGenero: string
    ) {


        const validar = new CreateGeneroPorDiscoDto();

        validar.idDisco = Number(idDisco);
        validar.idGenero = Number(idGenero);

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

            response.redirect('lista-generos' + parametrosConsulta)
        } else {
            const conductorEventoACrear =
                await this._generoDiscoService.buscarSiExiste(Number(idDisco), Number(idGenero));



            if(conductorEventoACrear){
                
                console.log('Si existe');
                //await this._eventoPorConductor.eliminar(Number(idEvento));
                const parametrosConsulta = `?accion=eliminar`;

                response.redirect(''+parametrosConsulta);
            }else {

                console.log('no existe');
                //await this._eventoPorConductor.crearUnEventoIntermedio(Number(idEvento), Number(idConductor));
                const parametrosConsulta = `?accion=crear`;
                response.redirect(''+parametrosConsulta);
            }



        }


}
}

export  interface GeneroPorDisco  {
    ideneroPorDisco?: number,
    idDisco?: number, 
    idGenero?: number,
};