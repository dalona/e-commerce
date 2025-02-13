import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';


@Module({
  imports:[ConfigModule ,TypeOrmModule.forFeature([User]), 
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:(configService:ConfigService)=>{      
        return {
          secret:configService.get('JWT_SECRET'),
          signOptions:{
          expiresIn:'2h'
        }
      }
    }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, JwtStrategy],
  exports:[TypeOrmModule, JwtStrategy, PassportModule, JwtModule]
})
export class AuthModule {}