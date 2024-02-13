//
import { parse } from "date-fns";
import mongoose, { Document } from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

//
import paginate from "../../utils/helpers";

//
import type { TodoModelType } from "../../backend/entity/todo.entity";

/**
 * Interface for Todo Document
 */
interface TodoDocument extends Document {
  name: string;
  description: string;
  date: Date;
  time: string;
}

//
import { throwError } from "../../utils/api/apiResponse";

//
import type { TTodoListDto } from "./dto/todoList.dto";
import type { TEditTodoDto } from "./dto/todoEdit.dto";
import type { TCreateTodoDto } from "./dto/todoCreate.dto";

//
class TodoService {
  #todoModel: TodoModelType;

  constructor(todoModel: TodoModelType) {
    this.#todoModel = todoModel;
  }

  async #findOneTodo(todoId: string): Promise<TodoDocument> {
    const todo = await this.#todoModel.findOne({ _id: new ObjectId(todoId) });

    //
    if (!todo?._id) {
      throw throwError(404, "Todo doesn't exist!");
    }

    //
    return todo;
  }

  /**
   * Create new Todo
   */
  async addNew(data: TCreateTodoDto): Promise<TodoDocument> {
    const date = parse(data?.date, "dd/MM/yyyy", new Date());

    //
    const todo = await this.#todoModel.create({
      name: data.name,
      description: data.description,
      date,
      time: data?.time,
    });

    //
    return todo as TodoDocument;
  }

  /**
   * Get one todo
   */
  async findOne(todoId: string): Promise<TodoDocument> {
    const todo = await this.#findOneTodo(todoId);

    //
    return todo;
  }

  /**
   * get all todo
   */
  async getAll(filters: TTodoListDto): Promise<TodoDocument[]> {
    //
    const queryFilters = this.#getFilters(filters);

    console.log(queryFilters, "check query filters");

    //
    const { skipDocuments, limitData } = paginate(filters);

    //
    const todos = await this.#todoModel
      .find(queryFilters)
      .find()
      .skip(skipDocuments)
      .limit(limitData)
      .sort({ _id: -1 });

    //
    return todos;
  }

  /**
   * Update one todo
   */
  async updateTodo(todoId: string, data: TEditTodoDto): Promise<TodoDocument> {
    const todo = await this.#findOneTodo(todoId);

    //
    if (data.hasOwnProperty("name")) {
      todo.name = data.name!;
    }

    if (data.hasOwnProperty("description")) {
      todo.description = data.description!;
    }

    if (data.hasOwnProperty("date")) {
      todo.date = new Date(data.date!);
    }

    if (data.hasOwnProperty("time")) {
      todo.time = data.time!;
    }

    //
    await todo.save();
    return todo;
  }

  /**
   * Delete one todo
   */
  async deleteTodo(todoId: string): Promise<void> {
    const todo = await this.#findOneTodo(todoId);

    //
    await todo.deleteOne();
    return;
  }

  /**
   * -------------- Private method for internal use ----------------
   *
   
   *
   * Get filters
   */
  #getFilters(filters: TTodoListDto) {
    const queryFilters = [];
    const currentDate = new Date();

    //
    if (filters.status === "done") {
      queryFilters.push({
        date: { $lt: currentDate },
      });
    }

    if (filters.status === "upcoming") {
      queryFilters.push({
        date: { $gte: currentDate },
      });
    }

    // return queryFilters;
    return queryFilters.length > 0 ? { $and: queryFilters } : {};
  }
}

export default TodoService;
