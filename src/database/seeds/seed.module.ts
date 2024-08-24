import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
// import { SeedService } from './seed.service';

@Module({
//   imports: [
//     TypeOrmModule.forFeature([]),
//   ],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}