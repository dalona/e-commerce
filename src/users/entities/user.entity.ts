import { Role } from "src/roles/entities/role.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column('varchar', {
    unique: true,
    length: 150,
    nullable: false,
    name: 'email',
    })
    email:string

    @Column('varchar', { length: 255, select: false, nullable: false })
    password:string

    @ManyToOne(type => Role, Role => Role.id)
    roleId: Role[];

    @Column({ nullable: true })
    token?: string;

    @BeforeInsert()
    checkFieldsBeforeInsert(){
        this.email = this.email.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate(){
        this.checkFieldsBeforeInsert()
    }

}
