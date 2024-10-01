import { MaxLength } from "class-validator";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column('varchar', { unique: true, nullable: true })
    @MaxLength(50)
    name: string;
    
    @OneToMany(() => User, user => user.roleId)
    users: User[];
}