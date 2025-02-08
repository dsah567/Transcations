import { detail, detailByMonth,detailByMonthAndText,orderStatistics ,barChat} from "../controllers/orderDetails.controller.js";
import {Router} from "express";

const detailRouter = Router();

detailRouter.get("/:page", detail);//for  all orders
detailRouter.get("/m/:month/:page", detailByMonth);//for orders by month
detailRouter.get("/mt/:month/:text/:page", detailByMonthAndText);//for orders by month and text
detailRouter.get("/statistics/:month", orderStatistics);//for statistics orders by month
detailRouter.get("/barchat/:month", barChat);//for bar chart by month

export default detailRouter;