import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  getOrdersByUsers,
  setInactiveIfNoOrder,
} from "../controllers/usersController.js";

const usersRouter = Router();

usersRouter.route("/").get(getAllUsers).post(createUser);

usersRouter
  .route("/:id")
  .get(getSingleUser)
  .delete(deleteUser)
  .put(updateUser);

//Bonus:
usersRouter.get("/:id/orders", getOrdersByUsers);
//Bonus:
usersRouter.put("/:id/check-inactive", setInactiveIfNoOrder);

export default usersRouter;
