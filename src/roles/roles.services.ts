import { Repository } from "typeorm";
import { Role } from "./entities/role.entity";
import { InjectRepository } from "@nestjs/typeorm";


export class RolesService{
    constructor( @InjectRepository(Role) private readonly roleRepository:Repository<Role>){}

    async create(name:string){
        try {
            const newRole = this.roleRepository.create({name})
                await this.roleRepository.save(newRole)
            return newRole
        } catch (error) {
            return {message: "Error create role", Error: error}
        }
    }
}