import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { RolesService } from './roles.services';
import { RoleControlller } from './roles.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [RoleControlller],
  providers: [RolesService],
  exports:[RolesService]
})
export class RolesModule {}