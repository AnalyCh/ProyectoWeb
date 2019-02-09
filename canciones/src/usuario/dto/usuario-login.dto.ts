// usuario-crate.dto.ts

import {IsDate, IsDateString, IsEmail, IsEmpty, IsNotEmpty, IsString, Length} from "class-validator";

export class UsuarioLoginDto {

    @IsNotEmpty()
    @IsString()
    @Length(3,20)
    nombre:string;

    @IsNotEmpty()
    @IsString()
    password:string;

}