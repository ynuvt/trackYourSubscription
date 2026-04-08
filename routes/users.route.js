import Router from "express";
import { getAllUser, getUser } from "../controllers/user.controller.js";
import authorize from "../middleware/auth.middleware.js";

const userRouter = Router();

userRouter.get("/", getAllUser);

userRouter.get("/:id", authorize, getUser);

userRouter.post("/", (req, res) => {
  res.send({ message: "Get all users" });
});

userRouter.put("/:id", (req, res) => {
  res.send({ message: `change in user${req.id.params}` });
});

userRouter.delete("/:id", (req, res) => {
  res.send({ message: `Delete user ${req.id.params}` });
});

export default userRouter;
