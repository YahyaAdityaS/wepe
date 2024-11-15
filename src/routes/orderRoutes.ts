import express from "express"
import { getAllOrders, createOrder, updateStatusOrder, deleteOrder,upBuktiBayar } from "../controllers/orderController"
import { verifyAddOrder, verifyEditStatus } from "../middlewares/orderValidation"
import { verifyRole, verifyToken } from "../middlewares/authorization"
import uploadFile from "../middlewares/buktiUpload"

const app = express()
app.use(express.json())
app.get(`/`, [verifyToken, verifyRole(["CUSTOMER","ADMIN"])], getAllOrders)
app.post(`/`, [verifyToken, verifyRole(["CUSTOMER"]), verifyAddOrder], createOrder)
app.put(`/:id`, [verifyToken, verifyRole(["ADMIN"]), verifyEditStatus], updateStatusOrder)
app.delete(`/:id`, [verifyToken, verifyRole(["ADMIN"])], deleteOrder),
app.put(`/pic/:id`,[uploadFile.single("foto")], upBuktiBayar)


export default app