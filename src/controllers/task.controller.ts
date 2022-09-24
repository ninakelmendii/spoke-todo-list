import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateTaskDto } from '../dtos/createTask.dto';
import { UpdateTaskDto } from '../dtos/updateTask.dto';
import { TaskService } from '../services/task.service';
import { AuthenticatedGuard } from '../guards/auth.guard';

@Controller('task')
@UseGuards(AuthenticatedGuard)
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post('/create')
  public async create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get('/all')
  public async getTasks() {
    return this.taskService.getTasks();
  }

  @Get('/all/:status')
  public async getTasksByStatus(@Param('status') status) {
    return this.taskService.getTasksByStatus(status);
  }

  @Put('/update/:id')
  public async update(@Param('id') id, @Body() updateTaskDto: UpdateTaskDto) {
    updateTaskDto.id = id;
    return this.taskService.update(updateTaskDto);
  }

  @Delete('/delete/:id')
  public async delete(@Param('id') id) {
    return this.taskService.delete(id);
  }

  @Get('/averageCompletedTasks')
  public async avarageOfCompletedGivenTasks() {
    return this.taskService.avarageOfCompletedGivenTasks();
  }
}
