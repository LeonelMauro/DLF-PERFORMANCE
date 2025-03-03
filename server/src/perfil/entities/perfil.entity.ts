import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Perfil {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;
    
   @Column({ nullable:true})
   age: number;
}
