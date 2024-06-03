import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Cart } from './cart.entiy';

@Entity()
export class CartItem {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid' })
    cartId: string;

    @Column({ type: 'uuid' })
    productId: string;

    @Column({ type: 'integer' })
    count: number;

    @ManyToOne(() => Cart, (cart) => cart.items)
    cart: Cart;
}