import Order from "../models/order.model.js";

const detail = async (req, res) => {
    try {

        const {page}= req.params
        const pageNo= parseInt(page)
        
        const totalOrders = await Order.countDocuments()
        
        if(pageNo < 1 || pageNo > Math.ceil(totalOrders/10)){
            return res.status(400).send("Invalid page number")
        }
        const data = await Order.find().skip((pageNo-1)*10).limit(10)
        return res.status(200).json({data,pages : Math.ceil(totalOrders/10)})
    } catch (error) {
        return res.status(500).json({error: "Error in fetching data from the database"});
    }
}

const detailByMonth= async (req, res) => {    
    try {

        
        const {month,page}  =req.params
        const pageNo= parseInt(page)
        // console.log(month);
        
        const monthInNumber = parseInt(month)

        if(monthInNumber < 1 || monthInNumber > 12){
            return res.status(400).json({error: "Invalid month"})
        }

        let query = {
            $expr :{
                $eq : [{ $month: "$dateOfSale"}, monthInNumber]
            }
        }
        const totalOrders = await Order.countDocuments(query)
        if(pageNo < 1 || pageNo > Math.ceil(totalOrders/10)){
            return res.status(400).json({error: "Invalid page number"})
        }

        const data =await Order.find(query).skip((pageNo-1)*10).limit(10)

        return res.status(200).json({data,pages : Math.ceil(totalOrders/10)})
    } catch (error) {
        console.log("Error in fetching data from the database", error)
        return res.status(500).json({error: "Error in fetching data from the database"});
    }
}

const detailByMonthAndText= async (req, res) => {  
      
    try {
        const {month,text,page}  =req.params
        const pageNo= parseInt(page)
        const monthInNumber = parseInt(month)
        const textValue = isNaN(text) ? 0 : parseFloat(text)

        if(monthInNumber < 1 || monthInNumber > 12){
            return res.status(400).json({error: "Invalid month"})
        }

        const query = { $and :[{
            $expr :{
                $eq : [{ $month: "$dateOfSale"}, monthInNumber]
            }},
            {
            $or: [
                { title: { $regex : text  , $options: "i" } }, // Case-insensitive title search
                { description: { $regex: text, $options  : "i" } }, // Case-insensitive description search
                textValue ? {price: textValue} : { price:0 }, // Exact price match if query is a number
            ],
        },]
        }

        const totalOrders = await Order.countDocuments(query)
        if(pageNo < 1 || pageNo > Math.ceil(totalOrders/10)){
            return res.status(400).json({error: "Invalid page number"})
        }
        const data =await Order.find(query).skip((pageNo-1)*10).limit(10)
        return res.status(200).json({data,pages : Math.ceil(totalOrders/10)})
    } catch (error) {
        console.log("Error in fetching data from the database", error)
        return res.status(500).json({error: "Error in fetching data from the database"});
    }
}

const orderStatistics = async (req, res) => {
    try {

        
        const {month}  =req.params
        
        const monthInNumber = parseInt(month)

        if(monthInNumber < 1 || monthInNumber > 12){
            return res.status(400).json({error: "Invalid month"})
        }

        let query = {
            $expr :{
                $eq : [{ $month: "$dateOfSale"}, monthInNumber]
            }
        }
        const data =await Order.find(query)

        let totalSales = 0,soldNo=0,notSoldNo=0;
        data.forEach((order)=>{
            if(order.sold){
                totalSales+=  order.price
                soldNo++
            }else{
                notSoldNo++
            }
        })

        return res.status(200).json({totalSales,soldNo,notSoldNo})
    } catch (error) {
        console.log("Error in fetching data from the database", error)
        return res.status(500).json({error: "Error in fetching data from the database"});
    }
}

const barChat = async(req,res)=>{
    try {

        const {month}  =req.params
        
        const monthInNumber = parseInt(month)

        if(monthInNumber < 1 || monthInNumber > 12){
            return res.status(400).json({error: "Invalid month"})
        }

        let query = {
            $expr :{
                $eq : [{ $month: "$dateOfSale"}, monthInNumber]
            }
        }
        const data =await Order.find(query)
        let priceRangePerNoOfOrders={ "0-100":0,"101-200":0,"201-300":0,"301-400":0,"401-500":0,"501-600":0,"601-700":0,"701-800":0,"801-900":0,"901-above":0}

        data.forEach((order)=>{
            if(order.price >=0 && order.price <=100){
                priceRangePerNoOfOrders["0-100"]++
            }else if(order.price >=101 && order.price <=200)
                {
                priceRangePerNoOfOrders["101-200"]++
            }else if(order.price >=201 && order.price <=300){
                priceRangePerNoOfOrders["201-300"]++

            }else if(order.price >=301 && order.price <=400){
                priceRangePerNoOfOrders["301-400"]++
            }else if(order.price >=401 && order.price <=500){
                priceRangePerNoOfOrders["401-500"]++

            }else if(order.price >=501 && order.price <=600){
                priceRangePerNoOfOrders["501-600"]++
                
            }else if(order.price >=601 && order.price <=700){
                priceRangePerNoOfOrders["601-700"]++
            }else if(order.price >=701 && order.price <=800){
                priceRangePerNoOfOrders["701-800"]++
            }else if(order.price >=801 && order.price <=900){
                priceRangePerNoOfOrders["801-900"]++
            }else{
                priceRangePerNoOfOrders["901-above"]++
            }
        })

        return res.status(200).json(priceRangePerNoOfOrders)
    } catch (error) {
        console.log("Error in fetching data from the database", error)
        return res.status(500).json({error: "Error in fetching data from the database"});
    }
}

export {detail,detailByMonth,detailByMonthAndText,orderStatistics,barChat}