import express from 'express';
import { PORT } from './config/env.js'
import userRouter from './routes/users.route.js'; 
import authRouter from "./routes/auth.route.js";
import subscriptionRouter from "./routes/subscriptions.route.js";
import connectToDb from './database/mongodb.js';
const app = express()

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/users', userRouter)
app.use("/api/v1/subscriptions", subscriptionRouter);
// const PORT = 5003
app.get('/', (req,res) => {
    res.send(`<h2>Welcome to Subscription Tracker API</h2>`)
})

app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`)
    connectToDb()
})


export default app