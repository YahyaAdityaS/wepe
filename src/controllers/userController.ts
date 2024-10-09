import { Request, Response } from "express";
import { $Enums, PrismaClient, status} from "@prisma/client";
import { request } from "http";
const { v4: uuidv4 } = require("uuid");
import { BASE_URL, SECRET } from "../global";
import fs from "fs"
import { date, exist, number } from "joi";
import md5 from "md5"; //enskripsi password
import { sign } from "jsonwebtoken"; //buat mendapatkan token jsonwebtoken

const prisma = new PrismaClient({ errorFormat: "pretty" })
export const getAllCustomer = async (request: Request, response: Response) => {
    try {
        const { search } = request.query
        const allCustomer = await prisma.customer.findMany({
            where: { nama: { contains: search?.toString() || "" } }
        })
        return response.json({
            status: true,
            data: allCustomer,
            message: 'Iki Isi User E Cah'
        }).status(200)
    }
    catch (error) {
        return response
            .json({
                status: false,
                message: `Eror Sam ${error}`
            }).status(400)
    }
}

export const createCustomer = async (request: Request, response: Response) => {
    try {
        const { nama, email, password,} = request.body
        const uuid = uuidv4()
        const newCustomer = await prisma.customer.create({
            data: { uuid, nama, email, password: md5(password)}
        })
        return response.json({
            status: true,
            date: newCustomer,
            message: `Gawe User Iso Cah`
        })
    } catch (error) {
        return response
            .json({
                status: false,
                message: `Eror Gawe User E Cah ${error}`
            }).status(400);
    }
}

export const updateCustomer = async (request: Request, response: Response) => {
    try {
        const { id } = request.params
        const { nama, email, password} = request.body

        const findCustomer = await prisma.customer.findFirst({ where: { id: Number(id) } })
        if (!findCustomer) return response
            .status(200)
            .json({
                status: false,
                massage: 'Ra Enek User E Cah'
            })

        const updateCustomer = await prisma.customer.update({
            data: {
                nama: nama || findCustomer.nama, //or untuk perubahan (kalau ada yang kiri dijalankan, misal tidak ada dijalankan yang kanan)
                email: email || findCustomer.email, //operasi tenary (sebelah kiri ? = kondisi (price) jika kondisinya true (:) false )
                password: password || findCustomer.password,
            },
            where: { id: Number(id) }
        })

        return response.json({
            status: true,
            data: updateCustomer,
            massage: 'Update User Iso Cah'
        })

    } catch (error) {
        return response
            .json({
                status: false,
                massage: `Eror Sam ${error}`
            })
            .status(400)
    }
}

export const changePicture = async (request: Request, response: Response) => {
    try {
        const { id } = request.params
        const findCustomer = await prisma.customer.findFirst({ where: { id: Number(id) } })
        if (!findCustomer) return response
            .status(200)
            .json({ status: false, message: 'Ra Nemu User E Sam' })
        let filename = findCustomer.foto
        if (request.file) {
            filename = request.file.filename
            let path = `${BASE_URL}/../public/profile-picture/${findCustomer.foto}`
            let exists = fs.existsSync(path)
            if (exists && findCustomer.foto !== ``) fs.unlinkSync(path)
        }
        const updatePicture = await prisma.customer.update({
            data: { foto: filename },
            where: { id: Number(id) }
        })
        return response.json({
            status: true,
            data: updatePicture,
            message: `Ganti Foto E Iso Cah`
        }).status(200)
    }
    catch (error) {
        return response.json({
            status: false,
            message: `Ganti Foto Gagal Sam`
        }).status(400)
    }
}

export const deleteCustomer = async (request: Request, response: Response) => {
    try {
        const { id } = request.params
        const findCustomer = await prisma.customer.findFirst({ where: { id: Number(id) } })
        if (!findCustomer) return response
            .status(200)
            .json({ status: false, message: 'Ra Nemu Menu E Sam' })

            let path = `${BASE_URL}/../public/profile-picture/${findCustomer.foto}`
            let exists = fs.existsSync(path)
            if (exists && findCustomer.foto !== ``) fs.unlinkSync(path)

        const deleteCustomer = await prisma.customer.delete({
            where: { id: Number(id) }
        })
        return response.json({
            status: true,
            data: deleteCustomer,
            message: 'User E Iso Dihapus Sam'
        }).status(200)
    } catch (eror) {
        return response
            .json({
                status: false,
                message: `Eror Sam ${eror}`
            }).status(400)
    }
}

export const authentication = async (request: Request, response: Response) => {
    try {
        const { email, password } = request.body;
        const findCustomer = await prisma.customer.findFirst({
            where: { email, password: md5(password) },
        });
        if (!findCustomer) {
            return response
                .status(200)
                .json({
                    status: false,
                    logged: false,
                    massage: `Email Ro Password Salah`
                })
        }
        let data = {
            id: findCustomer.id,
            name: findCustomer.nama,
            email: findCustomer.email,
        }
        let payload = JSON.stringify(data); //mennyiapakan data untuk menjadikan token
        let token = sign(payload, SECRET || "token");

        return response
            .status(200)
            .json({
                status: true,
                logged: true,
                message: `Login Succes`, token
            })
    } catch (error) {
        return response
            .json({
                status: false,
                message: `Eror Ga Boong ${error}`
            }).status(400)
    }
}
