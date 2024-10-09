import { NextFunction, Request, Response } from "express";
import { request } from "http";
import Joi from "joi";

const authSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).alphanum().required(),
});

const addDataSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().min(3).required(),
    role: Joi.string().valid('CASHIER', 'MANAGER',).required(), //.valid = validasi kategori menu (harus sesuai dengan enum)
    profile_picture: Joi.allow().optional() //optional (Bisa diisi bisa tidak)
})

const editDataSchema = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().optional(),
    password: Joi.string().min(3).optional(),
    role: Joi.string().valid('CASHIER', 'MANAGER',).optional(), //.valid = validasi kategori menu (harus sesuai dengan enum)
    profile_picture: Joi.allow().optional() //optional (Bisa diisi bisa tidak)
})

export const verifyAuthentication = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const {error} = authSchema.validate(request.body, {abortEarly: false});
    if(error) {
        return response.status(400).json({
            status: false,
            message: error.details.map((it) => it.message).join(),
        })
    }
    return next();  
}

export const verifyAddUser = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    //beh
    const {error} = addDataSchema.validate(request.body, {abortEarly: false});
    if(error) {
        return response.status(400).json({
            status: false,
            message: error.details.map((it) => it.message).join(),
        })
    }
    return next();
}
export const verifyEditUser = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    //beh
    const {error} = editDataSchema.validate(request.body, {abortEarly: false});
    if(error) {
        return response.status(400).json({
            status: false,
            message: error.details.map((it) => it.message).join(),
        })
    }
    return next();
}