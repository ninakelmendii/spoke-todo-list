import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ConfigModule } from '@nestjs/config';
import { TaskModule } from './task.module';
import { UserModule } from './user.module';

@Module({
  imports: [ConfigModule.forRoot({}), DatabaseModule, TaskModule, UserModule],
})
export class AppModule {}
