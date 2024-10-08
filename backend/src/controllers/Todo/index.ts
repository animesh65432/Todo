
import database from "../../Prismaclient";
import {Todo} from "../../types"
import {TodoError} from "../../exceptions/TodoErrors"
import {DatabaseServerError} from "../../exceptions/DatabaseServererror"
import {StatusCodes} from "http-status-codes"
import { Context } from "elysia";
const Create = async({body} : {body :Todo})=>{
    try {
        
        const { title } = body; 

        if(!title){
            throw new TodoError("Title is required", StatusCodes.BAD_REQUEST);
        }

        const todo = await database.todos.create({
            data : {
                title
            }
        })

        return todo

    } catch (error) {
        console.error(error, "Getting error From createing todo")
        throw new DatabaseServerError("Failed to create todo", StatusCodes.INTERNAL_SERVER_ERROR);
        
    }

}


const Get = async()=>{
    try {

        const Todos = await database.todos.findMany()
        return Todos
        
    } catch (error) {
        console.error("Error Getting Todos",error)
        throw new DatabaseServerError("Failed to update todo", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


const doneTodo = async({body} : {body :{id : string}}) => {
    const {id} = body
    try {
        if (!id) {  
            throw new TodoError("Id is required", StatusCodes.BAD_REQUEST);
        }

  

        let todo = await database.todos.update({
            where: {
                id
            },
            data: {
                done: true
            }
        });

        console.log("Sucessfully upate")

        return {
            message: "Todo updated successfully" ,
            todo
        };
        
    } catch (error) {
        console.error("Error updating todo");  
        throw new DatabaseServerError("Failed to update todo",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


const GetTodosToday = async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
  
    const Todos = await database.todos.findMany({
      where: {
        createdAt: {
          gte: today, 
        },
      },
    });
  
    return Todos.filter(todo => {
      const todoDate = new Date(todo.createdAt);
      return todoDate.toDateString() === today.toDateString();
    });
}

  
const GetTodosdays = async (req: Context) => {
    try {
        const { startDate, endDate ,skip ,take} = req.query;

     
        console.log('Query Parameters:', startDate, endDate);

        if(!startDate || !endDate || !skip || !take){
            throw new TodoError("Start and end dates are required", StatusCodes.BAD_REQUEST);
        }

       
        const queryStartDate = startDate ? new Date(`${startDate}T00:00:00Z`) : new Date(new Date().setHours(0, 0, 0, 0));
        const queryEndDate = endDate ? new Date(`${endDate}T23:59:59Z`) : new Date(new Date().setHours(23, 59, 59, 999));

        console.log('Query Start Date:', queryStartDate);
        console.log('Query End Date:', queryEndDate);

        if (isNaN(queryStartDate.getTime()) || isNaN(queryEndDate.getTime())) {
            throw new TodoError("Invalid date format", StatusCodes.BAD_REQUEST);
        }

      
        const todos = await database.todos.findMany({
            where: {
                createdAt: {
                    gte: queryStartDate,
                    lte: queryEndDate,
                },
            },
            skip :Number(skip),
            take : Number(take)
            
        });

        console.log('Todos Found:', todos);
        return { Todos: todos };
    } catch (error) {
        console.error("Error fetching todos from GetTodosdays:", error);
        throw new DatabaseServerError("Failed to retrieve todos", StatusCodes.INTERNAL_SERVER_ERROR);
    }
};


export {Get,Create,doneTodo,GetTodosToday,GetTodosdays}