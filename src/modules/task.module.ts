import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from '../controllers/task.controller';
import { Task } from '../entities/task.entity';
import { TaskService } from '../services/task.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TaskDomain } from '../domains/task.domain';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [TaskController],
  providers: [TaskService, TaskDomain],
})
export class TaskModule {}
