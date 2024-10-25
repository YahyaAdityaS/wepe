import express from "express"
import { changePicture, deleteMenu, getAllMenus, updateMenu } from "../controllers/menuControllers"
import {createMenu} from "../controllers/menuControllers"
import { verifyAddMenu, verifyEditMenu } from "../middlewares/verifyMenu"
import uploadFile from "../middlewares/menuUpload"
import { verifyRole, verifyToken } from "../middlewares/authorization"

const app = express()
app.use(express.json())

app.get('/', [verifyToken, verifyRole(["ADMIN", "CUSTOMER"])] ,getAllMenus)
app.post(`/`,[verifyToken, verifyRole(["ADMIN"]), verifyAddMenu], createMenu)
app.put(`/:id`, [verifyToken, verifyRole(["ADMIN"]), verifyEditMenu], updateMenu)
app.put(`/pic/:id`, [verifyToken, verifyRole(["ADMIN"]), uploadFile.single("foto")],changePicture)
app.delete(`/:id`,  [verifyToken, verifyRole(["ADMIN"])], deleteMenu)

export default app 