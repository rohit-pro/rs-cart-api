import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { OneToMany, JoinColumn } from 'typeorm';
import { CartItem } from './cart-item.entity';

enum CartStatus {
    OPEN = 'OPEN',
    ORDERED = 'ORDERED',
}

@Entity()
export class Cart {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid', nullable: false })
    user_id: string;

    @Column({ type: 'date', nullable: false })
    created_at: Date;

    @Column({ type: 'date', nullable: false })
    updated_at: Date;

    @Column({ type: 'enum', enum: ['OPEN', 'ORDERED'] })
    status: CartStatus;

    @OneToMany(() => CartItem, cartItem => cartItem.cart)
    @JoinColumn({ name: 'id', referencedColumnName: 'cart_id' })
    items: CartItem[];
}