import { Elysia } from "elysia";
import controller from "../../controllers";

const TodoRouter = (app: Elysia) => {
    app.post("/create", controller.Todo.Create);
    app.put("/doneTodo", controller.Todo.doneTodo);
    app.get("/Get",controller.Todo.Get)
    app.get("/GetTodosToday",controller.Todo.GetTodosToday)
    app.get("/GetTodosdays",controller.Todo.GetTodosdays)
};

export default TodoRouter;
