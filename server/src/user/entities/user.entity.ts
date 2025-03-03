import { join } from "path";
import { Perfil } from "src/perfil/entities/perfil.entity";
import { Post } from "src/post/entities/post.entity";
import { Column, Entity, JoinColumn,  OneToMany,  OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column({default: true})
    isActive: boolean;

    @Column({type:'timestamp',default: () => 'CURRENT_TIMESTAMP'})
    createAt: Date;
    

    @OneToOne(() =>Perfil,)
    @JoinColumn()
    perfil: Perfil;

    @OneToMany (() => Post, post => post.author )
    posts: Post[]
 
};
