import { Injectable, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskDomain } from '../domains/task.domain';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateTaskDto } from '../dtos/createTask.dto';
import { UpdateTaskDto } from '../dtos/updateTask.dto';
import { Task } from '../entities/task.entity';

@Injectable()
export class TaskService {
  @InjectRepository(Task)
  private taskRepository: Repository<Task>;

  constructor(private taskDomain: TaskDomain) {}

  create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.save(createTaskDto);
  }

  getTasks(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  getTasksByStatus(status): Promise<Task[]> {
    return this.taskRepository.find({ where: { status: status } });
  }

  update(@Body() updateTaskDto: UpdateTaskDto): Promise<UpdateResult> {
    return this.taskRepository.update(updateTaskDto.id, updateTaskDto);
  }

  delete(id): Promise<DeleteResult> {
    return this.taskRepository.delete(id);
  }

  async avarageOfCompletedGivenTasks() {
    const tasks = await this.taskRepository.find();

    return this.taskDomain.avarageOfCompletedGivenTasks(tasks);
  }
}
