import { Category } from "src/category/entities/category.entity";
import { Stock } from "src/stock/entities/stock.entity";
import { Photo } from 'src/photos/entities/photo.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'numeric' })
  price: number;

  @Column({ unique: true })
  code: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;

  @Column()
  quantity: number;
  
  @Column({ nullable: true }) // Permite que sea opcional
  categoryId: number;
  
  // Relación con Category
  @ManyToOne(() => Category, (category) => category.products,{ onDelete: 'CASCADE' })
  @JoinColumn({ name: 'categoryId' }) // Vincula la columna explícitamente
  category: Category;
  
  // Relación con Stock (Uno a Muchos)
  @OneToMany(() => Stock, (stock) => stock.product, { cascade: true })
  stocks: Stock[];

  // Relación con Photo (Uno a Muchos)
  @OneToMany(() => Photo, (photo) => photo.product, { cascade: true })
  photos: Photo[];
}
