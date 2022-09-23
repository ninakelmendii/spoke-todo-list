import { Task } from '../entities/task.entity';
import { Status } from '../enums/status.enum';

export class TaskDomain {
  avarageOfCompletedGivenTasks(tasks: Task[]) {
    let total = 0;
    let completed = 0;

    tasks.forEach((task) => {
      total++;
      if (task.status === Status.Completed) {
        completed++;
      }
    });

    return total ? (completed / total) * 100 : 0;
  }
}
