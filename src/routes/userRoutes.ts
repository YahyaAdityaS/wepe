import  express  from "express";
import { authentication, createUser, deleteUser, getAllUser, updateUser, register, updateCust } from "../controllers/userController";
import { verifyAuthentication, verifyAddUser, verifyEditUser } from "../middlewares/userValidation";
import { changePicture } from "../controllers/userController";
import uploadFile from "../middlewares/userUpload";
import { verifyToken, verifyRole } from "../middlewares/authorization"

const app = express();
app.use(express.json());

app.get(`/`,[verifyToken, verifyRole(["ADMIN"])], getAllUser)
app.post(`/create`, [verifyToken, verifyRole(["ADMIN"])], [verifyAddUser], createUser)
app.put(`/:id`, [verifyToken, verifyRole(["ADMIN"])], [verifyEditUser], updateUser)
app.put(`/editProfile/:id`, [verifyToken, verifyRole(["CUSTOMER"])], [verifyEditUser], updateCust)
app.post(`/login`,[verifyAuthentication], authentication)
app.post(`/register`,[verifyAddUser], register)
app.put(`/pic/:id`,[uploadFile.single("foto")], changePicture)
app.delete(`/:id`, [verifyToken, verifyRole(["ADMIN"])], deleteUser)
 
export default app  