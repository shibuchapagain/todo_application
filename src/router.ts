import express from "express";

//
import todoRoute from "./modules/todo.router";

//
const appRouter = express.Router();

//
appRouter.use("/todo", todoRoute);

/**
 * Status check route
 */
appRouter.get("/status", (_req, res) => {
  return res.json({ success: true, message: "The api working fine!" });
});

/**
 * 404: not found
 */
appRouter.get("*", (req, res) => {
  return res.status(404).json({
    success: false,
    message: "This route doesn't exist on server",
  });
});

//
export default appRouter;
