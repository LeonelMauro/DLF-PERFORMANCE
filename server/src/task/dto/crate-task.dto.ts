import {  IsNotEmpty, IsString } from "class-validator"

export class createTaskDto{
    
    @IsString()
    title: string
    @IsString()
    @IsNotEmpty()
    description :string
}