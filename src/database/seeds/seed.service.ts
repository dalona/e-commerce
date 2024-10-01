import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import CreateRoles from './roles.seed';
import CreateProducts from './products.seed';

@Injectable()
export class SeedService {
  constructor(private readonly dataSource: DataSource) {}

  async seed(){
    const roleSeeder = new CreateRoles()
    await roleSeeder.run(this.dataSource)

    const productSeeder = new CreateProducts()
    await productSeeder.run(this.dataSource)

  }

  


}