import { TaskDomain } from '../domains/task.domain';
import { Task } from '../entities/task.entity';
import { Status } from '../enums/status.enum';

describe('TaskDomain', () => {
  const taskDomain: TaskDomain = new TaskDomain();

  it('should return correct avarage of 2 completed tasks', async () => {
    // GIVEN
    const tasks = [
      new Task({
        name: 'First Task',
        status: Status.Completed,
      }),
      new Task({
        name: 'Second Task',
        status: Status.Completed,
      }),
      new Task({
        name: 'Third Task',
        status: Status.InProgress,
      }),
      new Task({
        name: 'Fourth Task',
        status: Status.InProgress,
      }),
    ];

    // WHEN
    const result = taskDomain.avarageOfCompletedGivenTasks(tasks);

    // THEN
    expect(result).toBe(50);
  });

  it('should return 0 when no tasks are given', async () => {
    // GIVEN
    const tasks = [];

    // WHEN
    const result = taskDomain.avarageOfCompletedGivenTasks(tasks);

    // THEN
    expect(result).toBe(0);
  });

  it('should return 0 when all tasks are not completed', async () => {
    // GIVEN
    const tasks = [
      new Task({
        name: 'First Task',
        status: Status.InProgress,
      }),
      new Task({
        name: 'Second Task',
        status: Status.InProgress,
      }),
      new Task({
        name: 'Third Task',
        status: Status.InProgress,
      }),
      new Task({
        name: 'Fourth Task',
        status: Status.InProgress,
      }),
    ];

    // WHEN
    const result = taskDomain.avarageOfCompletedGivenTasks(tasks);

    // THEN
    expect(result).toBe(0);
  });
});
