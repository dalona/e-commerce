import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { EnvConfig } from "./env.config";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory {
    createTypeOrmOptions():TypeOrmModuleOptions {
        console.log({ envConfig: EnvConfig() });
        return{
            type:'mysql',
            host: EnvConfig().host,
            port: EnvConfig().port,
            database: EnvConfig().name,
            username: EnvConfig().username,
            password:EnvConfig().password,
            autoLoadEntities:true,
            synchronize:true
        }
    }
}