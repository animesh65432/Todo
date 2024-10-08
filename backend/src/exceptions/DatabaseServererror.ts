export class DatabaseServerError extends Error {
    code: number;
    constructor(message: string, code: number) {
      super(message);
      this.name = 'DatabaseServerError';
      this.code = code;
    }
  }