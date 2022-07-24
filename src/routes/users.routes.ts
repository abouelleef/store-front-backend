import { Router } from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
  authenticateUser,
} from "../controllers/users.controller";
import { protect } from "../middlewares/protect.middleware";
import {
  userValidation,
  loginValidation,
} from "../middlewares/validation/user.validation";
import { idValidation } from "../middlewares/validation/validator";

const userRouter = Router();

userRouter.post("/login", loginValidation, authenticateUser);
userRouter.post("/", userValidation, createUser);

userRouter.use(protect);
userRouter.route("/").get(getAllUsers);
userRouter
  .route("/:id")
  .get(idValidation, getUserById)
  .delete(idValidation, deleteUser)
  .put(idValidation, userValidation, updateUser);

export default userRouter;
