import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('todos')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async addTodo(@Body() body: { desc: string }) {
    if (!body.desc || body.desc.trim() === '') {
      throw new HttpException('The Todo desc cannot be empty', HttpStatus.BAD_REQUEST);
    }

    return await this.appService.addTodo(body.desc);
  }

  @Delete(':id')
  async deleteTodo(@Param('id') id: number) {
    return await this.appService.deleteTodo(id);
  }

  @Put(':id/complete')
  async toggleComplete(@Param('id') id: number) {
    return await this.appService.toggleComplete(id);
  }

  @Get()
  async getAllTodos() {
    return await this.appService.getAllTodos();
  }
}
