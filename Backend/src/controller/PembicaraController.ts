import { prisma } from "../lib/db.js";
import type { Request, Response } from "express";

// read all pembicara
export const getPembicara = async (req: Request, res: Response) => {
    try {
        const pembicara = await prisma.pembicara.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
        res.json(pembicara);
    } catch (error) {
        res.status(500).json({
            message: "Gagal mengambil data pembicara",
            error,
        });
    }
};

// read pembicara by id (beserta daftar event yang mereka isi)
export const getPembicaraById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const pembicara = await prisma.pembicara.findUnique({
            where: { id },
            // Menampilkan event apa saja yang diisi oleh pembicara ini
            include: {
                events: true
            }
        });

        if (!pembicara) {
            return res.status(404).json({
                message: "Pembicara tidak ditemukan",
            });
        }
        res.json(pembicara);
    } catch (error) {
        res.status(500).json({
            message: "Gagal mengambil detail pembicara",
            error,
        });
    }
};

// create new pembicara
export const createPembicara = async (req: Request, res: Response) => {
    try {
        const { name, role, image } = req.body;

        if (!name || !role) {
            return res.status(400).json({
                message: "Nama dan Role wajib diisi",
            });
        }

        const newPembicara = await prisma.pembicara.create({
            data: { 
                name,
                role,
                image: image || null // image bersifat opsional
            },
        });

        res.status(201).json({
            message: "Pembicara berhasil dibuat",
            data: newPembicara,
        });
    } catch (error) {
        res.status(500).json({
            message: "Gagal membuat pembicara",
            error,
        });
    }
};

// update pembicara
export const updatePembicara = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const { name, role, image } = req.body;

        const existingPembicara = await prisma.pembicara.findUnique({
            where: { id },
        });

        if (!existingPembicara) {
            return res.status(404).json({
                message: "Pembicara tidak ditemukan",
            });
        }

        const updatedPembicara = await prisma.pembicara.update({
            where: { id },
            data: {
                name: name ?? existingPembicara.name,
                role: role ?? existingPembicara.role,
                image: image !== undefined ? image : existingPembicara.image,
            },
        });

        res.json({
            message: "Pembicara berhasil diupdate",
            data: updatedPembicara,
        });
    } catch (error) {
        res.status(500).json({
            message: "Gagal update pembicara",
            error,
        });
    }
};

// delete pembicara
export const deletePembicara = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        const existingPembicara = await prisma.pembicara.findUnique({
            where: { id },
        });

        if (!existingPembicara) {
            return res.status(404).json({
                message: "Pembicara tidak ditemukan",
            });
        }

        await prisma.pembicara.delete({
            where: { id },
        });

        res.json({
            message: "Pembicara berhasil dihapus",
        });
    } catch (error) {
        res.status(500).json({
            message: "Gagal menghapus pembicara",
            error,
        });
    }
};