import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SaleDetail } from "./sale-detail.entity";
 @Entity()
 export class Sale {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    date:Date;

    @Column({type: 'decimal', precision: 10,scale:2})
    total: number;

    @OneToMany(() => SaleDetail, (detail) => detail.sale, { cascade: true, eager: true })
   details: SaleDetail[];

    
 }
    