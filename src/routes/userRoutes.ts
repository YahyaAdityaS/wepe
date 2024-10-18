import  express  from "express";
import { authentication, createUser, deleteUser, getAllUser, updateUser } from "../controllers/userController";
import { verifyAuthentication, verifyAddUser, verifyEditUser } from "../middlewares/userValidation";
import { changePicture } from "../controllers/userController";
import uploadFile from "../middlewares/userUpload";

const app = express();
app.use(express.json());

app.get(`/`, getAllUser)
app.post(`/create`, [verifyAddUser], createUser)
app.put(`/:id`,[verifyEditUser], updateUser)
app.post(`/login`,[verifyAuthentication], authentication)
app.put(`/pic/:id`,[uploadFile.single("foto")], changePicture)
app.delete(`/:id`, deleteUser)

export default app 