import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

const orderListSchema = Joi.object({
    idProduk: Joi.number().required(),
    quantity: Joi.number().required(),
    note: Joi.string().optional(),
})

const addDataSchema = Joi.object({
    customer: Joi.string().required(),
    metodeBayar: Joi.string().valid("CASH", "QRIS").uppercase().required(),
    buktiBayar: Joi.allow().optional(),
    idUser: Joi.number().optional(),
    alamat: Joi.string().required(), //TAMBAHKE ALAMAT
    subOrder: Joi.array().items(orderListSchema).min(1).required(),
    user: Joi.optional()
})

export const verifyAddOrder = (request: Request, response: Response, next: NextFunction) => {
    /** validate a request body and grab error if exist */
    const { error } = addDataSchema.validate(request.body, { abortEarly: false })
    if (error) {
        /** if there is an error, then give a response like this */
        return response.status(400).json({
            status: false,
            message: error.details.map(it => it.message).join()
        })
    }
    return next()
}

/** create schema when edit status order's data */
const editDataSchema = Joi.object({
    status: Joi.string().valid("DONE").uppercase().required(),
    buktiBayar: Joi.allow().optional(),
    user: Joi.optional()
})

export const verifyEditStatus = (request: Request, response: Response, next: NextFunction) => {
    /** validate a request body and grab error if exist */
    const { error } = editDataSchema.validate(request.body, { abortEarly: false })


    if (error) {
        /** if there is an error, then give a response like this */
        return response.status(400).json({
            status: false,
            message: error.details.map(it => it.message).join()
        })
    }
    return next()
}
