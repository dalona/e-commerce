import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Role } from 'src/roles';

export default class CreateRoles implements Seeder{
    public async run(dataSource: DataSource): Promise<void> {
        const roleRepository = dataSource.getRepository(Role)

        const rolesData = [
            {
                name:'user'
            },
            {
                name: 'admin'
            }
        ];

        for (const role of rolesData){
            const roleExist = await roleRepository.findOneBy({name:role.name})
            if(!roleExist){
                const newRole = roleRepository.create(role)
                await roleRepository.save(newRole)
            }
        } 
        console.log('Seed Roles loaded');
    }
    
}
