import { Category } from "src/category/entities/category.entity";
import { Stock } from "src/stock/entities/stock.entity";
import { Photo } from 'src/photos/entities/photo.entity';
import { SaleDetail } from "src/sale/entities/sale-detail.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'decimal', nullable: false, default: 0 , precision: 10, scale: 2})
  price: number;


  @Column({ unique: true })
  code: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;

  @Column({ nullable: true }) // Permite que sea opcional
  categoryId: number;
  
  // Relación con Category
  @ManyToOne(() => Category, (category) => category.products,{ onDelete: 'CASCADE' })
  @JoinColumn({ name: 'categoryId' }) // Vincula la columna explícitamente
  category: Category;
  
  @OneToOne(() => Stock, (stock) => stock.product, { cascade: ['insert', 'update'],eager: true, })
  stock: Stock;


  // Relación con Photo (Uno a Muchos)
  @OneToMany(() => Photo, (photo) => photo.product, { cascade: true })
  photos: Photo[];

  @OneToMany(() => SaleDetail, (saleDetail) => saleDetail.product)
  saleDetails: SaleDetail[];

}
