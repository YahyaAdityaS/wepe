import  express  from "express";
import { authentication, createCustomer, deleteCustomer, getAllCustomer, updateCustomer } from "../controllers/userController";
import { verifyAuthentication, verifyAddUser, verifyEditUser } from "../middlewares/userValidation";
import { changePicture } from "../controllers/userController";
import uploadFile from "../middlewares/userUpload";

const app = express();
app.use(express.json());

app.get(`/`, getAllCustomer)
app.post(`/create`, [verifyAddUser], createCustomer)
app.put(`/:id`,[verifyEditUser], updateCustomer)
app.post(`/login`,[verifyAuthentication], authentication)
app.put(`/pic/:id`,[uploadFile.single("foto")], changePicture)
app.delete(`/:id`, deleteCustomer)

export default app 