import express from "express";
import helmet from "helmet";
import cors from 'cors'
import rateLimit from "express-rate-limit";
import { limit, PORT, windowsMs } from "./config/env";
import routes from './routes/index.js'
import errorHandler from "./middlewares/errorhandler.js";



const app= express();

//security
app.use(helmet())


//cors
app.use(cors())


//rate - limiting
const limiter  = rateLimit({
    windowMs: windowsMs,
    limit: limit,
    message: "Too many requests"
})
app.use('/api/', limiter)



//routes
app.use('/api', routes)



//404 handler
app.use('*', (req,res,next)=>{
    const error = new Error("Route not found")
    error.statusCode = 404
    next(error)
})



//global error handler
app.use(errorHandler)



//start server and init services
app.listen(PORT, ()=>{
    //init db

    console.log("Expense tracker is live")
    console.log("Server is running on", `http//localhost:${PORT}`)
})



//Graceful shutdowns

process.on("SIGINT",()=>{
    //close connections
    console.log("SIGINT received shutting down gracefully")

})

process.on("SIGTERM", ()=>{
    //close connections
    console.log("SIGTERM received shutting down gracefully")
})