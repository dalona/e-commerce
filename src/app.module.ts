import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { DatabaseModule } from './database.module';
import { Role } from './roles/entities/role.entity';


@Module({
  imports: [
    DatabaseModule,
    UsersModule, 
    AuthModule, 
    ProductsModule, 
    OrdersModule,
    Role],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
