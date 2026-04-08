import express from "express";
import { PORT } from "./config/env.js";
import userRouter from "./routes/users.route.js";
import authRouter from "./routes/auth.route.js";
import subscriptionRouter from "./routes/subscriptions.route.js";
import connectToDb from "./database/mongodb.js";
import errorMiddleware from "./middleware/error.middleware.js";
import authorize from "./middleware/auth.middleware.js";
const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);

app.use(errorMiddleware);
// const PORT = 5003
app.get("/", (req, res) => {
  res.send(`<h2>Welcome to Subscription Tracker API</h2>`);
});

// app.listen(PORT, async() => {
//     await connectToDb();
//     console.log(`Server is running on port ${PORT}`);
// });

const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server has started on port ${PORT}`);
    });
    await connectToDb();
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();

export default app;
