import express from "express"
import { deleteMenu, getAllMenus, updateMenu,createMenu } from "../controllers/menuControllers"
import { verifyAddMenu, verifyEditMenu } from "../middlewares/verifyMenu"
import uploadFile from "../middlewares/menuUpload"
import { verifyRole, verifyToken } from "../middlewares/authorization"

const app = express()
app.use(express.json())

app.get(`/`, [verifyToken, verifyRole(["CUSTOMER","ADMIN"])], getAllMenus)
app.post(`/`, [verifyToken, verifyRole(["ADMIN"]), uploadFile.single("picture"), verifyAddMenu], createMenu)
app.put(`/:id`, [verifyToken, verifyRole(["ADMIN"]), uploadFile.single("picture"), verifyEditMenu], updateMenu)
app.delete(`/:id`, [verifyToken, verifyRole(["ADMIN"])], deleteMenu)

export default app 