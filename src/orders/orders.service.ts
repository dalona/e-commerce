import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { In, Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(User)  private userRepository: Repository<User>,
  ){}


  async create(createOrderDto: CreateOrderDto, userId: number):Promise<Order | string>{
    const { products, totalPrice, productIds } = createOrderDto;
    const productsEntities = await this.productRepository.find({
      where: { id: In(productIds) },
    });

    const productNames = productsEntities.map(product => product.name).join(', ')

    const user = await this.userRepository.findOne({ where: { id: userId } });
    const order = new Order();
    order.products = productNames; // Asignar la cadena de productos
    order.totalPrice = totalPrice;
    order.productsIds = productsEntities;
    order.userId = user;
    
    try {
      return this.orderRepository.save(order);
    } catch (error) {
      console.log(`Error is: ${error}`)
    }
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
