import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Cart } from './entities/cart.entiy';
import { CartItem } from './entities/cart-item.entity';

@Module({
    imports:[
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: ["dist/**/*.entity.js"],
            namingStrategy: new SnakeNamingStrategy(),
            logging: true,
            ssl: {
                rejectUnauthorized: false,
            },
        }),
        TypeOrmModule.forFeature([Cart, CartItem]),
    ],
    exports: [TypeOrmModule]
})
export class DatabaseModule {} 