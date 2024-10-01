import { Order } from "src/orders/entities/order.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('products')
export class Product {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false})
  name: string;

  @Column({nullable: false})
  price: number;

  @Column()
  description: string;

  @ManyToMany(() => Order, order => order.products)
  orders: Order[];

}
