import express from "express";

//
import TodoController from "./todos/todo.controller";

//
import { TodoParamDto } from "./todos/dto/param.dto";
import { EditTodoDto } from "./todos/dto/todoEdit.dto";
import { todoListDto } from "./todos/dto/todoList.dto";
import { CreateTodoDto } from "./todos/dto/todoCreate.dto";
//
import bodyValidator from "../middlewares/validators/body.validator";
import paramValidator from "../middlewares/validators/param.validator";
import queryValidator from "../middlewares/validators/query.validator";

//
const postController = new TodoController();

//
const router = express.Router();

//
router.route("/add").post(bodyValidator(CreateTodoDto), postController.addNew);

router
  .route("/:todoId")
  .get(paramValidator(TodoParamDto), postController.findOne);

router.route("/").get(queryValidator(todoListDto), postController.getAll);

router
  .route("/update/:todoId")
  .patch(
    paramValidator(TodoParamDto),
    bodyValidator(EditTodoDto),
    postController.updateTodo
  );

router
  .route("/delete/:todoId")
  .delete(paramValidator(TodoParamDto), postController.deleteTodo);

//
export default router;
