import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Sale } from "./sale.entity";
import { Product } from "src/product/entities/product.entity";

@Entity()
export class SaleDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Sale, (sale) => sale.details, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'saleId' })
  sale: Sale;


  @ManyToOne(() => Product, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column()
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  // 🔹 Campo virtual para total (no se guarda en la base de datos)
  get total(): number {
    return this.quantity * this.price;
  }
}
