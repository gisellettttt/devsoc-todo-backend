import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  // Mock AppService
  const mockAppService = {
    addTodo: jest.fn(),
    deleteTodo: jest.fn(),
    toggleComplete: jest.fn(),
    getAllTodos: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: mockAppService,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addTodo', () => {
    it('should create a new todo successfully', async () => {
      const mockTodo = { id: 1, desc: 'Test todo', completed: false };
      mockAppService.addTodo.mockResolvedValue(mockTodo);

      const result = await appController.addTodo({ desc: 'Test todo' });

      expect(appService.addTodo).toHaveBeenCalledWith('Test todo');
      expect(result).toEqual(mockTodo);
    });

    it('should throw error when desc is empty', async () => {
      await expect(appController.addTodo({ desc: '' })).rejects.toThrow(
        new HttpException('The Todo desc cannot be empty', HttpStatus.BAD_REQUEST)
      );
    });

    it('should throw error when desc is only whitespace', async () => {
      await expect(appController.addTodo({ desc: '   ' })).rejects.toThrow(
        new HttpException('The Todo desc cannot be empty', HttpStatus.BAD_REQUEST)
      );
    });

    it('should throw error when desc is undefined', async () => {
      await expect(appController.addTodo({ desc: '' })).rejects.toThrow(
        new HttpException('The Todo desc cannot be empty', HttpStatus.BAD_REQUEST)
      );
    });
  });

  describe('deleteTodo', () => {
    it('should delete a todo successfully', async () => {
      mockAppService.deleteTodo.mockResolvedValue(undefined);

      const result = await appController.deleteTodo(1);

      expect(appService.deleteTodo).toHaveBeenCalledWith(1);
      expect(result).toBeUndefined();
    });
  });

  describe('toggleComplete', () => {
    it('should toggle todo completion status', async () => {
      const mockTodo = { id: 1, desc: 'Test todo', completed: true };
      mockAppService.toggleComplete.mockResolvedValue(mockTodo);

      const result = await appController.toggleComplete(1);

      expect(appService.toggleComplete).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockTodo);
    });
  });

  describe('getAllTodos', () => {
    it('should return all todos', async () => {
      const mockTodos = [
        { id: 1, desc: 'Todo 1', completed: false },
        { id: 2, desc: 'Todo 2', completed: true },
      ];
      mockAppService.getAllTodos.mockResolvedValue(mockTodos);

      const result = await appController.getAllTodos();

      expect(appService.getAllTodos).toHaveBeenCalled();
      expect(result).toEqual(mockTodos);
    });

    it('should return empty array when no todos exist', async () => {
      mockAppService.getAllTodos.mockResolvedValue([]);

      const result = await appController.getAllTodos();

      expect(appService.getAllTodos).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });
});
