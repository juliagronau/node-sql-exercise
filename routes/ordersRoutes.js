import { Router } from "express";
import {
  getAllOrders,
  createOrder,
  getSingleOrder,
  deleteOrder,
  updateOrder,
} from "../controllers/ordersController.js";

const ordersRouter = Router();

ordersRouter.route("/").get(getAllOrders).post(createOrder);

ordersRouter
  .route("/:id")
  .get(getSingleOrder)
  .delete(deleteOrder)
  .put(updateOrder);

export default ordersRouter;
