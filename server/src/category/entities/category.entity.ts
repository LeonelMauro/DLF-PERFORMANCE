import { Product } from "src/product/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  categoryName: string;

  // Relación inversa con Product
  @OneToMany(() => Product, (product) => product.category, { cascade: true })
  products: Product[];
}
