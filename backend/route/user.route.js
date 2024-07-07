import express from "express";
import {
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} from "../controller/user.controller.js";

const userRoutes = express.Router();

userRoutes.route("/").get(getUsers).post(createUser);

userRoutes.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

export default userRoutes;

