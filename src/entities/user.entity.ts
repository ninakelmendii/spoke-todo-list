import { Column, Entity } from 'typeorm';
import { BaseEntity } from './baseEntity';

@Entity('users')
export class User extends BaseEntity<User> {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
