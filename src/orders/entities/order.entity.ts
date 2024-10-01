import { Product } from "src/products/entities/product.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity("orders")
export class Order {
    @PrimaryGeneratedColumn('increment')
    id:number

    @Column()
    products: string

    @Column()
    totalPrice: number

    @ManyToOne(() => User)
    @JoinColumn({ name: 'roles_id' })
    userId: User;

    @ManyToMany(() => Product, product => product.orders)
    @JoinTable()  
    productsIds: Product[];
}
