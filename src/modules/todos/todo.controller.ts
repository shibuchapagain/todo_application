import type { Request, Response, NextFunction } from "express";

//
import TodoModel from "../../backend/entity/todo.entity";

//
import TodoService from "./todo.service";

//
import { sendSuccessResponse } from "../../utils/api/apiResponse";

//
import type { TPostParamDto } from "./dto/param.dto";
import type { TTodoListDto } from "./dto/todoList.dto";
import type { TEditTodoDto } from "./dto/todoEdit.dto";
import type { TCreateTodoDto } from "./dto/todoCreate.dto";

//
const todoService = new TodoService(TodoModel);

class TodoController {
  /**
   * Create new todo
   */
  async addNew(
    req: Request<TCreateTodoDto>,
    res: Response,
    next: NextFunction
  ) {
    try {
      //
      const todo = await todoService.addNew(req.body);

      //
      sendSuccessResponse({
        data: todo,
        message: "Successfully created todo",
        res,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Find one todo
   */

  async findOne(
    req: Request<TPostParamDto>,
    res: Response,
    next: NextFunction
  ) {
    try {
      //
      const todo = await todoService.findOne(req.params.todoId);

      //
      sendSuccessResponse({
        data: todo,
        message: "Successfully created todo",
        res,
      });
    } catch (error) {
      next(error);
    }
  }

  // /**
  //  * Get all todos
  //  */
  async getAll(
    req: Request<unknown, unknown, unknown, TTodoListDto>,
    res: Response,
    next: NextFunction
  ) {
    try {
      //
      const todos = await todoService.getAll(req.query);

      //
      sendSuccessResponse({
        data: todos,
        message: "Fetch all todos successfully",
        res,
        pagination: {
          count: todos?.length,
          page: req.query?.page! ?? 1,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update one todo
   */
  async updateTodo(
    req: Request<TPostParamDto, TEditTodoDto>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const todoId = req.params.todoId;

      //
      const todo = await todoService.updateTodo(todoId, req.body);

      //
      sendSuccessResponse({
        data: todo,
        message: "Update todo successfully",
        res,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteTodo(
    req: Request<TPostParamDto>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const todoId = req.params.todoId;

      //
      await todoService.deleteTodo(todoId);

      //
      sendSuccessResponse({
        data: {},
        message: "Delete successfully",
        res,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default TodoController;
