import { Body, Controller, Post } from "@nestjs/common";
import { RolesService } from "./roles.services";


@Controller("Roles")
export class RoleControlller{
    constructor(private readonly roleService : RolesService){}

    @Post()
    async create(@Body('name') name: string) {
    const role = await this.roleService.create(name);
    return role;
  }
}