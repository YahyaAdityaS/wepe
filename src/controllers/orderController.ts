import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { BASE_URL, SECRET } from "../global";
import fs from "fs"


const prisma = new PrismaClient({ errorFormat: "pretty" })

export const getAllOrders = async (request: Request, response: Response) => {
    try {
        /** get requested data (data has been sent from request) */
        const { search } = request.query

        /** process to get order, contains means search name or table number of customer's order based on sent keyword */
        const allOrders = await prisma.order.findMany({
            where: {
                OR: [
                    {user: { nama: { contains: search?.toString() || "" } } }
                ]
            },
            orderBy: { createdAt: "desc" }, /** sort by descending order date */
            include: { subOrder: true } /** include detail of order (item that sold) */
        })
        return response.json({
            status: true,
            data: allOrders,
            message: `Order list has retrieved`
        }).status(200)
    } catch (error) {
        return response
            .json({
                status: false,
                message: `There is an error. ${error}`
            })
            .status(400)
    }
}

export const createOrder = async (request: Request, response: Response) => {
    try {
        /** get requested data (data has been sent from request) */
        const { customer, metodeBayar, status, subOrder } = request.body
        const user = request.body.user
        const uuid = uuidv4()
        /**
         * assume that "orderlists" is an array of object that has keys:
         * menuId, quantity, note
         * *
        /** loop details of order to check menu and count the total price */
        let totalBayar = 0
        for (let index = 0; index < subOrder.length; index++) {
            const { idMenu } = subOrder[index]
            const detailMenu = await prisma.produk.findFirst({
                where: {
                    id: idMenu
                }
            })
            if (!detailMenu) return response
                .status(200).json({ status: false, message: `Menu with id ${idMenu} is not found` })
            totalBayar += (detailMenu.harga * subOrder[index].quantity)
        }


        /** process to save new order */
        const newOrder = await prisma.order.create({
            data: { uuid, customer, totalBayar, metodeBayar, status, idUser: user.id }
        })


        /** loop details of Order to save in database */
        for (let index = 0; index < subOrder.length; index++) {
            const uuid = uuidv4()
            const { idMenu, quantity, note, alamat } = subOrder[index]
            await prisma.subOrder.create({
                data: {
                    uuid, idOrder: newOrder.id, idProduk: Number(idMenu), quantity: Number(quantity), note, alamat
                }
            })
        }
        return response.json({
            status: true,
            data: newOrder,
            message: `New Order has created`
        }).status(200)
    } catch (error) {
        return response
            .json({
                status: false,
                message: `There is an error. ${error}`
            })
            .status(400)
    }
}

export const deleteOrder = async (request: Request, response: Response) => {
    try {
        /** get id of order's id that sent in parameter of URL */
        const { id } = request.params


        /** make sure that data is exists in database */
        const findOrder = await prisma.order.findFirst({ where: { id: Number(id) } })
        if (!findOrder) return response
            .status(200)
            .json({ status: false, message: `Order is not found` })


        /** process to delete details of order */
        let deleteSuborder = await prisma.subOrder.deleteMany({ where: { idOrder: Number(id) } })
        /** process to delete of Order */
        let deleteOrder = await prisma.order.delete({ where: { id: Number(id) } })


        return response.json({
            status: true,
            data: deleteOrder,
            message: `Order has deleted`
        }).status(200)
    } catch (error) {
        return response
            .json({
                status: false,
                message: `There is an error. ${error}`
            })
            .status(400)
    }
}

export const updateStatusOrder = async (request: Request, response: Response) => {
    try {
        /** get id of order's id that sent in parameter of URL */
        const { id } = request.params
        /** get requested data (data has been sent from request) */
        const { status } = request.body
        const user = request.body.user
 
 
        /** make sure that data is exists in database */
        const findOrder = await prisma.order.findFirst({ where: { id: Number(id) } })
        if (!findOrder) return response
            .status(200)
            .json({ status: false, message: `Order is not found` })
 
 
        /** process to update menu's data */
        const updatedStatus = await prisma.order.update({
            data: {
                status: status || findOrder.status,
                idUser: user.id ? user.id : findOrder.idUser
            },
            where: { id: Number(id) }
        })
 
 
        return response.json({
            status: true,
            data: updatedStatus,
            message: `Order has updated`
        }).status(200)
    } catch (error) {
        return response
            .json({
                status: false,
                message: `There is an error. ${error}`
            })
            .status(400)
    }
 }
 
 export const upBuktiBayar = async (request: Request, response: Response) => {
    try {
        const { id } = request.params
        const findOrder = await prisma.order.findFirst({ where: { id: Number(id) } })
        if (!findOrder) return response
            .status(200)
            .json({ status: false, message: 'Ra Nemu Order E Sam' })
        let filename = findOrder.buktiBayar
        if (request.file) {
            filename = request.file.filename
            let path = `${BASE_URL}/../../../profile-picture${findOrder.buktiBayar}`
            let exists = fs.existsSync(path)
            if (exists && findOrder.buktiBayar !== ``) fs.unlinkSync(path)
        }
        const updatePicture = await prisma.order.update({
            data: { buktiBayar: filename , status:'PAID'},
            where: { id: Number(id) }
        })
        return response.json({
            status: true,
            data: updatePicture,
            message: `Upload Bukti Bayar E Iso Cah`
        }).status(200)
    }
    catch (error) {
        return response.json({
            status: false,
            message: `Ganti Bukti Bayar Gagal Sam`
        }).status(400)
    }
}