import mongoose from "mongoose";
const Schema = mongoose.Schema;

//
const TodoSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const TodoModel = mongoose.model("Todo", TodoSchema);

//
export type TodoModelType = typeof TodoModel;
export default TodoModel;
