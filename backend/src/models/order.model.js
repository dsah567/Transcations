import mongoose,{Schema} from "mongoose";

const orderSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    title :{
        type: String,
        required: true
    },
    price :{
        type: Number,
        required: true
    },
    description :{
        type: String,
        required: true
    } ,
    category :{
        type: String,
        required: true
    },
    image :{
        type: String,
        required: true
    },
    sold :{
        type: Boolean,
        required: true
    },
    dateOfSale :{
        type: Date,
        required: true
    } 
},{timestamps:true});

const Order = mongoose.model('Order', orderSchema);
export default Order;