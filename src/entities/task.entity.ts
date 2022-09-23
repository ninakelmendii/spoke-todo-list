import { Entity, Column } from 'typeorm';
import { BaseEntity } from './baseEntity';

@Entity('tasks')
export class Task extends BaseEntity<Task> {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  status: number;
}
