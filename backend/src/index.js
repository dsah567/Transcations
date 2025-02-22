import dotenv from "dotenv"
import { app } from "./app.js";
import connectDB from "./db/index.js";
dotenv.config({
    path: './.env'
})

const port = process.env.PORT || 8080

//database connection
connectDB()
.then(()=>{
    app.on("errror", (error) => {
        console.log("ERRR: ", error);
        throw error
    })
    app.listen(port,()=>{
        console.log(`Server is listening at port ${port}`)})
})
.catch((err)=>{
    console.log("MongoDb Connection failed :", err);
});