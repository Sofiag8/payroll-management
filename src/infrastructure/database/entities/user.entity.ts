import { hashPassword } from '../../../utils/hash-password';
import {
  Column,
  Entity,
  BeforeInsert,
  BeforeUpdate,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, nullable: false })
  name: string;

  @Column({ length: 100, nullable: false })
  lastName: string;

  @Column({ length: 150, unique: true, nullable: false })
  email: string;

  @Column({ length: 150 })
  password: string;

  @Column({ length: 30, nullable: true })
  phoneNumber: string;

  @Column({ length: 200, nullable: true })
  address: string;

  @Column({ length: 50, nullable: true })
  crmId: string;

  // Entity listeners
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    this.password = await hashPassword(this.password);
  }
}
