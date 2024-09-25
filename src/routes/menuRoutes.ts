import express from "express"
import { getAllMenus, updateMenu } from "../controllers/menuControllers"
import {createMenu} from "../controllers/menuControllers"
import { verifyAddMenu, verifyEditMenu } from "../middlewares/menuMiddlewares"

const app = express()
app.use(express.json())

app.get('/', getAllMenus)
app.post(`/`,[verifyAddMenu], createMenu)
app.put(`/:id`, [verifyEditMenu], updateMenu)

export default app 