import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './app.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Todo)
    private todoRepo: Repository<Todo>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async addTodo(desc: string): Promise<Todo> {
    const todo = this.todoRepo.create({ desc });
    return await this.todoRepo.save(todo);
  }

  async deleteTodo(id: number): Promise<void> {
    await this.todoRepo.delete(id);
  }

  async toggleComplete(id: number): Promise<Todo> {
    const todo = await this.todoRepo.findOne({ where: { id } });

    if (!todo) {
      throw new Error('Todo not fount');
    }

    todo.completed = !todo.completed;
    return await this.todoRepo.save(todo);
  }

  async getAllTodos(): Promise<Todo[]> {
    return await this.todoRepo.find();
  }
}
