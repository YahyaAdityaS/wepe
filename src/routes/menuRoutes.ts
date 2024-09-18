import express from "express"
import { getAllProduk } from "../controllers/menuControllers"

const app = express()
app.use(express.json())

app.get('/', getAllProduk)

export default app 