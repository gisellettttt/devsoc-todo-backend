import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('todo_table')
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  desc: string;

  @Column({ default: false })
  completed: boolean;
}
