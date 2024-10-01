import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';

import { UsersController } from './users.controller';
import { Role } from 'src/roles/entities/role.entity';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role])
  ],
  controllers: [UsersController],
  providers: [
    { provide: 'IUsersService', useClass: UsersService }
    ,UsersService]
})
export class UsersModule {}
