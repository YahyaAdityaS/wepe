import { Request, Response } from "express"; //impor ekspress
import { PrismaClient } from "@prisma/client"; //
import { request } from "http";
const { v4: uuidv4 } = require("uuid");
import fs from "fs"
import { date, exist, number } from "joi";
import md5 from "md5"; //enskripsi password
import { sign } from "jsonwebtoken"; //buat mendapatkan token jsonwebtoken
import { BASE_URL, SECRET } from "../global";

const prisma = new PrismaClient({ errorFormat: "pretty" })
export const getAllMenus = async (request: Request, response: Response) => { //endpoint perlu diganti ganti pakai const kalau tetap let
    //menyiapkan data input dulu(request) --> request
    try {
        //input
        const { search } = request.query //query boleh ada atau tidak params harus ada
        //main
        const allMenus = await prisma.produk.findMany({
            where: { nama: { contains: search?.toString() || "" } } //name buat mencari apa di seacrh, contains == like(mysql) [mengandung kata apa], OR/|| (Salah satu true semaunya all), ""untuk menampilkan kosong
        })
        //output
        return response.json({ //tampilkan juga statusnya(untuk inidkator)
            status: true,
            data: allMenus,
            massage: 'Iki Isi Menu E Cah'
        }).status(200) //100 200 Berhasil
    }
    catch (eror) {
        return response
            .json({
                status: false,
                massage: `Eror Sam ${eror}`
            })
            .status(400)
    }
}

export const createMenu = async (request: Request, response: Response) => {
    try {
        const { nama, harga, kategori, deskripsi, stok } = request.body
        const uuid = uuidv4()

        let filename = "" //untuk upload foto menu
        if (request.file) filename = request.file.filename

        const newMenu = await prisma.produk.create({ //await menunngu lalu dijalankan
            data: { uuid, nama, harga: Number(harga), kategori, deskripsi, stok, foto: filename }
        })
        return response.json({
            Status: true,
            data: newMenu,
            massage: `Gawe menu DONE`
        }).status(200);
    }
    catch (eror) {
        return response
            .json({
                status: false,
                massage: `Eror iii. $(eror)`
            }).status(400);
    }
}

export const updateMenu = async (request: Request, response: Response) => {
    try {
        const { id } = request.params
        const { nama, harga, kategori, deskripsi, stok } = request.body

        const findProduk = await prisma.produk.findFirst({ where: { id: Number(id) } })
        if (!findProduk) return response
            .status(200)
            .json({ status: false, massage: 'Ra Enek Menu E Cah' })

        let filename = findProduk.foto
        if (request.file) {
            filename = request.file.filename
            let path = `${BASE_URL}/../public/produk-picture/${findProduk.foto}`
            let exists = fs.existsSync(path)
            if (exists && findProduk.foto !== ``) fs.unlinkSync(path)
        }

        const updateMenu = await prisma.produk.update({
            data: {
                nama: nama || findProduk.nama, //or untuk perubahan (kalau ada yang kiri dijalankan, misal tidak ada dijalankan yang kanan)
                harga: harga ? Number(harga) : findProduk.harga, //operasi tenary (sebelah kiri ? = kondisi (price) jika kondisinya true (:) false )
                kategori: kategori || findProduk.kategori,
                deskripsi: deskripsi || findProduk.deskripsi,
                stok: stok || findProduk.stok
            },
            where: { id: Number(id) }
        })

        return response.json({
            status: true,
            data: updateMenu,
            massage: 'Update Menu Iso Cah'
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

export const deleteMenu = async (request: Request, response: Response) => {
    try {
        const { id } = request.params
        const findProduk = await prisma.produk.findFirst({ where: { id: Number(id) } })
        if (!findProduk) return response
            .status(200)
            .json({ status: false, message: 'Ra Nemu Sam' })

        const deletedMenu = await prisma.produk.delete({
            where: { id: Number(id) }
        })
        return response.json({
            status: true,
            data: deleteMenu,
            message: 'Menu E Iso Dihapus Sam'
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
        const findUser = await prisma.user.findFirst({
            where: { email, password: md5(password) },
        });
        if (!findUser) {
            return response
                .status(200)
                .json({
                    status: false,
                    logged: false,
                    massage: `Email Ro Password Salah`
                })
        }
        let data = {
            id: findUser.id,
            name: findUser.nama,
            email: findUser.email,
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