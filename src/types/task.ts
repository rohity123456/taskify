import { Task } from '@prisma/client';
import { IUser } from './user';

export interface ITask extends Task {
  assignedTo: IUser | null;
}
