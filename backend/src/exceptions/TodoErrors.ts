import { StatusCodes } from 'http-status-codes';

export class TodoError extends Error {
  status: number;
  constructor(message: string, status: number = StatusCodes.CONFLICT) {
    super(message);
    this.name = 'TodoError';
    this.status = status;
  }
}