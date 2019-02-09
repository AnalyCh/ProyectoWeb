import {Controller, Get, Res, Query, Body, Post, Param, BadRequestException} from "@nestjs/common";
import { AutorService } from "./autor.service";
import { FindManyOptions, Like } from "typeorm";
import { AutorEntity } from "./autor.entity";
import { CreateAutorDto } from "./dto/create-autor.dto";
import { ValidationError, validate } from "class-validator";

@Controller('autor')
export class AutorController{

    constructor(
        private readonly _autorService: AutorService,
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
        let autor: AutorEntity[];
        if(busqueda){
            const consulta: FindManyOptions<AutorEntity>= {
                where:[
                    {
                        nombre: Like(`${busqueda}`)
                    },
                    {
                        nacionalidad: Like(`${busqueda}`)
                    }
                ]
            };
            autor = await this._autorService.buscar(consulta);
        } else{
            autor = await this._autorService.buscar();
        }
        res.render(
            'inicio-autor',
            {
                arreglo: autor,
                mensaje: mensaje,
                clase: clase
            }
        )
    };

    @Get('crear-autor')
    async crearautorRuta(
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


            let autor: AutorEntity[];
            autor = await this._autorService.buscar();
            response.render(
                'crear-autor',
                {
                    titulo: 'Crear autor',
                    mensaje: mensaje,
                    arreglo: autor,
                    clase: clase

                }
            )
        // }

    };


    @Post('crear-autor')
    async crearAutor(
        @Res() response,
        @Body() autor: Autor,
        
    ){
        // if(session.rol === "usuario"){
            const objetoValidacionautor = new CreateAutorDto();

            autor.idAutor = Number(autor.idAutor);
            autor.banda = Boolean(Number(autor.banda));
            objetoValidacionautor.banda = autor.banda
            

            const errores: ValidationError[] = await validate(objetoValidacionautor);
            const  hayErrores = errores.length >0;
            console.log("numero de errores en crear autor: "+errores.length);
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

                response.redirect('/autor/crear-autor'+parametrosConsulta)


            }else{
                //await this._AutorService.crear(autor);
                // const parametrosConsulta = `?accion=crear&nombreMarca=${
                    // autor.nombreMarca
                    // }`;

                // response.redirect('/autor/inicio'+parametrosConsulta)
            }
        // }

    };

    @Get('actualizar-autor/:idAutor')
    async actualizarAutoVista(
        @Res() response,
        @Param('idAutor') idautor: string,
        
    ){
        // if(session.rol === "usuario"){
            const autoEncontrado = await this._autorService
                .buscarPorId(+idautor);

            

            let autor: AutorEntity[];
            autor = await this._autorService.buscar();
            response.render(
                'crear-auto',
                {
                    auto: autoEncontrado,
                    arregloautor: autor
                }
            )
        //}
    };

    @Post('actualizar-autor/:idautor')
    async actualizarAutoMetodo(
        @Res() response,
        @Param('idautor') idautor: string,
        @Body() autor: Autor,
        
    ){
        // if(session.rol === 'usuario'){
            //
            
            const objetoValidacionautor = new CreateAutorDto();

            autor.idAutor = Number(autor.idAutor);
            autor.banda = Boolean(Number(autor.banda));
            objetoValidacionautor.banda = autor.banda
            

            const errores: ValidationError[] = await validate(objetoValidacionautor);
            const  hayErrores = errores.length >0;
            console.log("numero de errores en crear autor: "+errores.length);
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
                    autor.banda
                    }`;

                response.redirect('/autor/inicio'+parametrosConsulta)
            }
        // }

    };

    @Post('eliminar/:idAutor')
    async eliminar(
        @Res() response,
        @Param('idAutor') idautor: string,
        
    ){
        // if(session.rol  ==="usuario"){
            // const auto = await this._AutorService.buscarPorId(+idautor);
            // await this._AutorService
                // .eliminar(+idautor);

            const parametrosConsulta = `?accion=borrar&nombreautor=${idautor}`;
//autor.nombre
                
            response.redirect('/autor/inicio'+ parametrosConsulta)
        // }

        
};

}

export interface Autor {
    idAutor?: number,
    banda?: boolean,
    idautor?: number,
    idBanda?: number
}