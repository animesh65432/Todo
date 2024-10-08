export type  Todo = {
    title : string
}

export type deleteTodotypes = {
    id : string
}

export interface ApiResponse<T = any> {
    status: number;
    message?: string;
    success: boolean;
    data?: T;
    code: number;
  }