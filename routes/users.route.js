import Router from 'express'

const userRouter = Router()

userRouter.get("/", (req, res) => {
  res.send({ message: "Get all users" });
});

userRouter.get("/:id", (req, res) => {
    res.send({ message: `get ${req.params.id}` });
});

userRouter.post("/", (req, res) => {
  res.send({ message: "Get all users" });
});

userRouter.put("/:id", (req, res) => {
  res.send({ message: `change in user${req.id.params}` });
});

userRouter.delete("/:id", (req, res) => {
  res.send({ message:  `Delete user ${req.id.params}` });
});

export default userRouter