import { Elysia } from "elysia";
import router from "./router";
import { cors } from "@elysiajs/cors";
import  errorhandler from "./middleware/errorhandler"

const app = new Elysia()
app.use(cors({
  origin : "http://localhost:5000",
  credentials : true
}))
router.TodoRouter(app)
app.use(errorhandler)


app.listen(3000,()=>{
  console.log("Server started at 3000")
})