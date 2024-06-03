import { Injectable } from '@nestjs/common';

import { v4 } from 'uuid';

import { Cart } from '../models';
import { sendQuery } from 'src/shared/pg';

function getCurrentDate() {
  const date = new Date();
  const year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
  let day = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}

@Injectable()
export class CartService {

  async findByUserId(userId: string) {
    const query = `select * from carts left join cart_items on carts.id = cart_items.cart_id where user_id = '${userId}';`;
    const cart = await sendQuery(query);
    return cart.length > 0 ? cart.reduce((acc, val) => {
      acc.id = val.id
      acc.user_id = val.user_id
      acc.created_at = val.created_at
      acc.updated_at = val.updated_at
      acc.status = val.status
      if (!acc.items) {
        acc.items = []
      }
      if (val.cart_id) {
        acc.items = [{
          cart_id: val.cart_id,
          product_id: val.product_id,
          product: {
            price: 10
          },
          count: val.count
        }, ...acc.items]
      }
      return acc;
    }, {}) : null;
  }

  async createByUserId(userId: string) {
    const query = `INSERT INTO carts(id, user_id, created_at, updated_at, status) VALUES('${v4()}', '${userId}', '${getCurrentDate()}', '${getCurrentDate()}', 'OPEN');`;

    const userCart = await sendQuery(query);
    return userCart;
  }

  async findOrCreateByUserId(userId: string) {
    const userCart = await this.findByUserId(userId);
    if (userCart) {
      return userCart;
    }
    await this.createByUserId(userId);
    const userCartCreated = await this.findByUserId(userId);
    return userCartCreated;
  }

  async updateByUserId(userId: string, { items }: Cart) {
    const { id } = await this.findOrCreateByUserId(userId);

    const delQuery = `DELETE FROM cart_items WHERE cart_id = '${id}';`
    await sendQuery(delQuery);

    if (items.length > 0) {
      const query = `INSERT INTO cart_items (cart_id, product_id, count) VALUES ${items.map(item => "('" + id + "', '" + item.product + "',  " + item.count + ")").join(',')};`;
      await sendQuery(query);
    }

    return await this.findByUserId(userId);
  }

  async removeByUserId(userId) {
    const { id } = await this.findByUserId(userId);
    if (id) {
      const delCartItems = `DELETE FROM cart_items WHERE cart_id = '${id}';`;
      await sendQuery(delCartItems);
      const delCart = `DELETE FROM carts WHERE user_id = '${userId}';`;
      await sendQuery(delCart);
    }
  }
}