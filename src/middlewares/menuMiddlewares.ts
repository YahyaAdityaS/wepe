import { kategori } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { it } from "node:test";

const addDataSchema = Joi.object({
    nama: Joi.string().required(),
    harga: Joi.number().min(0).required(),
    kategori: Joi.string().valid('BAJU', 'GANTUNGAN', 'STIKER').required(), //.valid = validasi kategori menu (harus sesuai dengan enum)
    deskripsi: Joi.string().required(),
    foto: Joi.allow().optional(), //optional (Bisa diisi bisa tidak)
    stok: Joi.number().required()
})

const editDataSchema = Joi.object({
    nama: Joi.string().optional(),
    harga: Joi.number().min(0).optional(),
    kategori: Joi.string().valid('BAJU', 'GANTUNGAN', 'STIKER').optional(), //.valid = validasi kategori menu (harus sesuai dengan enum)
    deskrpsi: Joi.string().optional(),
    foto: Joi.allow().optional(), //optional (Bisa diisi bisa tidak)
    stok: Joi.number().required()
})

export const verifyAddMenu = (request: Request, response: Response, next: NextFunction) => {
    const { error } = addDataSchema.validate(request.body, {abortEarly: false})

    if (error) {
        return response.status(400).json({
            status: false,
            massage: error.details.map(it => it.message).join()
        })
    }
    return next()
}

export const verifyEditMenu = (request: Request, response: Response, next: NextFunction) => {
    const { error } = editDataSchema.validate(request.body, {abortEarly: false})

    if (error) {
        return response.status(400).json({
            status: false,
            massage: error.details.map(it => it.message).join()
        })
    }
    return next()
}