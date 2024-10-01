import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>
  ){}

  async create(createProductDto: CreateProductDto):Promise<Product | string>{
    try {
      const product = this.productRepository.create(createProductDto)
      return await this.productRepository.save(createProductDto)
    } catch (error) {
      console.log(`Error is: ${error}`)
    }
  }

  async findAll():Promise<Product[]>{
    try {
      return await this.productRepository.find({
        select:{
          id:true,
          name:true,
          price:true,
          description:true
        }
      });
    } catch (error) {
      console.log(`Error is: ${error}`)
    }
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} product`;
  // }

  async update(id: number, updateProductDto: UpdateProductDto) {

    const findProduct = await this.productRepository.preload({
      id: id,
      ...updateProductDto
    })
    if(!findProduct) return `Product with id ${id} not found`

    try {
      await this.productRepository.save(updateProductDto);
      return updateProductDto;
    } catch (error) {
      console.log(`Error is: ${error}`)
    }


    return `This action updates a #${id} product`;
  }

  async remove(id: number) {
    const findProduct = await this.productRepository.find({where:{id: id}})
    if(!findProduct) return `Product with id ${id} not found`
    try {
      await this.productRepository.delete(id)
      return "Product deleted"
    } catch (error) {
      console.log(`Error is: ${error}`)
    }
  }
}
