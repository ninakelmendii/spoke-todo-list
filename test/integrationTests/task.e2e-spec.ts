import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TaskModule } from '../../src/modules/task.module';
import { AuthenticatedGuard } from '../../src/guards/auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../../src/entities/task.entity';
import { User } from '../../src/entities/user.entity';
import { Repository } from 'typeorm';
import { Status } from '../../src/enums/status.enum';

describe('TaskController (e2e)', () => {
  let app: INestApplication;
  let taskRepository: Repository<Task>;
  const canActivate = jest.fn(() => true);

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TaskModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Task, User],
          logging: false,
          synchronize: true,
        }),
      ],
    })
      .overrideGuard(AuthenticatedGuard)
      .useValue({ canActivate })
      .compile();

    app = moduleFixture.createNestApplication();
    taskRepository = app.get('TaskRepository');
    await app.init();
  });

  it('should return empty if there are not any data', async () => {
    // GIVEN + WHEN
    const result = await request(app.getHttpServer()).get('/task/all');

    // THEN
    expect(result.body).toEqual([]);
  });

  it('should return 2 created tasks', async () => {
    // GIVEN
    await taskRepository.save({
      name: 'IOS 16',
      description: 'Check new software update of iphone',
      status: Status.Completed,
    });

    await taskRepository.save({
      name: 'Silicon Valley',
      description: 'Check rating of the series',
      status: Status.Completed,
    });

    // WHEN
    const result = await request(app.getHttpServer()).get('/task/all');

    // THEN
    expect(result.body.length).toEqual(2);
  });
});
