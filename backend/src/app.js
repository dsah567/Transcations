import express from "express"
import Order from "./models/order.model.js"

const app = express()
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))

//importing routes
import detailRouter from "./routes/orderDetails.route.js"



//middleware to check if data exist or not in database, if not exist then insert data from https://s3.amazonaws.com/roxiler.com/product_transaction.json website in json format
app.use( async (req, res, next)=> {
    try {
        // console.log("Checking if order exists in the database");
        
        const orderExists = await Order.find( {id: 1})
        // console.log(orderExists);
        
        if(orderExists.length > 0){
             next()
            }
        else {
            let data = await fetch("https://s3.amazonaws.com/roxiler.com/product_transaction.json")
            let jsonData = await data.json()
            
            Order.insertMany(jsonData)
                .then((data)=>{             
                    console.log("Data inserted successfully")
                    next()
                })
                .catch((error)=>{
                    console.log("Error in inserting data", error)
                    res.status(500).send("Error in inserting data")
                })
        }
    } catch (error) {
        console.log("Error in fetching data from the database", error)
        res.status(500).send("Error in fetching data from the database")
    }
    
})

//default route for testing
app.get("/",(req, res) => {
    res.send('hello from transcation backend')
  })


//using routes
app.use("/order", detailRouter)


export {app}