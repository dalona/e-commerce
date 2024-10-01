import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { loginUserDto } from './dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users';


@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User) private readonly userRepository:Repository<User>,
        private readonly jwtService:JwtService,
        private readonly userService: UsersService
    ){}

    async register(createUserDto : CreateUserDto){
        try {
          const findUser = await this.userRepository.findOne({where: {email: createUserDto.email}})
          if(findUser){
              return "Email alredy exists"
          }
           const {password, ...userData} = createUserDto
          const user = await this.userRepository.create({
            ...userData,
            password: bcrypt.hashSync(password, 10) //encriptacion del password
          })
          await this.userRepository.save(user)
          delete user.password
          return {
            ...user,
            token:this.getJwtToken({email: user.email})
        }
        } catch (error) {
          return `Error creating User ${error}`
          
        }
    };


    async login(loginUserDto:loginUserDto){
        const {password, email} = loginUserDto

        const user = await this.userRepository.findOne({where:{email}, select: {email:true, password:true}})

        if(!user || !bcrypt.compareSync(password, user.password)) throw new UnauthorizedException('Credentials are not valid')

        return {
            ...user,
            token:this.getJwtToken({email: user.email})
        }
    }

    private getJwtToken(payload:JwtPayload){
        const token = this.jwtService.sign(payload);
        return token
    }


}