// usuario-crate.dto.ts

import {IsDate, IsDateString, IsEmail, IsEmpty, IsNotEmpty, IsString, Length} from "class-validator";

export class UsuarioLoginDto {
    @IsNotEmpty()
    @IsString()
    @Length(2,30)
    username:string;

    @IsNotEmpty()
    @IsString()
    password:string;

}