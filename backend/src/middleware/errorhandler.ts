import { Elysia } from 'elysia';
import { StatusCodes } from 'http-status-codes'
import { TodoError } from '../exceptions/TodoErrors';
import {DatabaseServerError} from "../exceptions/DatabaseServererror"
import { ApiResponse } from '../types';


export default (app: Elysia) =>
    app.error({
      TodoError,
      DatabaseServerError,
    }).onError((handler): ApiResponse => {
      console.log(handler)
      console.error(handler.error);
  
      
    if (handler.error instanceof TodoError) {
        console.log("TodoError caught");
        handler.set.status = handler.error.status;
        return {
          status: handler.error.status,
          message: handler.error.message,
          success: false,
          code: handler.error.status
        };
      }
  
      if (handler.error instanceof DatabaseServerError) {
        console.log("DatabaseServerError caught");
        handler.set.status = StatusCodes.SERVICE_UNAVAILABLE;
        return {
          status: handler.set.status,
          message: 'Database Error',
          success: false,
          code: handler.error.code
        };
      }
  
      if (handler.code === 'NOT_FOUND') {
        handler.set.status = StatusCodes.NOT_FOUND;
        return {
          status: handler.set.status,
          message: 'Not Found!',
          success: false,
          code: handler.set.status
        };
      }
  
      if (handler.code === 'VALIDATION') {
        handler.set.status = StatusCodes.BAD_REQUEST;
        return {
          status: handler.set.status,
          message: 'Bad Request!',
          success: false,
          code: handler.set.status
        };
      }
  
      
      handler.set.status = StatusCodes.INTERNAL_SERVER_ERROR;
      return {
        status: handler.set.status,
        message: 'Server Error!',
        success: false,
        code: handler.set.status
      };
    });
  