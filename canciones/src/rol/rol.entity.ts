import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";

import {AutorEntity} from "../autor/autor.entity";

@Entity()
export class RolEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nombre:string;
}