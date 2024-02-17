import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export default class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 150,
    nullable: false,
  })
  name: string;

  @Column({
    length: 150,
    nullable: false,
  })
  contactName: string;

  @Column({
    length: 30,
    nullable: false,
  })
  contactPhone: string;

  @Column({
    length: 100,
    nullable: false,
  })
  contactEmail: string;

  @Column({
    length: 50,
    nullable: true,
  })
  crmId: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
