import { Product } from "src/product/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Stock {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int'})
    quantity: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @OneToOne(() => Product, (product) => product.stock, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'productId' }) // 🔹 Define la clave foránea explícitamente
    product: Product;

}
