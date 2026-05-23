import { prisma } from "../lib/db.js";
import type { Request, Response } from "express";

// read all categories
export const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await prisma.category.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
        res.json(categories);
    } catch (error) {
        res.status(500).json({
            message: "Gagal mengambil data kategori",
            error,
        });
    }
};

// read category by id (beserta daftar event di dalamnya)
export const getCategoryById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const category = await prisma.category.findUnique({
            where: { id },
            // Menampilkan event apa saja yang ada di kategori ini
            include: {
                events: true 
            }
        });

        if (!category) {
            return res.status(404).json({
                message: "Kategori tidak ditemukan",
            });
        }
        res.json(category);
    } catch (error) {
        res.status(500).json({
            message: "Gagal mengambil detail kategori",
            error,
        });
    }
};

// create new category
export const createCategory = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                message: "Nama kategori wajib diisi",
            });
        }

        const newCategory = await prisma.category.create({
            data: { name },
        });

        res.status(201).json({
            message: "Kategori berhasil dibuat",
            data: newCategory,
        });
    } catch (error) {
        res.status(500).json({
            message: "Gagal membuat kategori",
            error,
        });
    }
};

// update category
export const updateCategory = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const { name } = req.body;

        const existingCategory = await prisma.category.findUnique({
            where: { id },
        });

        if (!existingCategory) {
            return res.status(404).json({
                message: "Kategori tidak ditemukan",
            });
        }

        const updatedCategory = await prisma.category.update({
            where: { id },
            data: {
                name: name ?? existingCategory.name,
            },
        });

        res.json({
            message: "Kategori berhasil diupdate",
            data: updatedCategory,
        });
    } catch (error) {
        res.status(500).json({
            message: "Gagal update kategori",
            error,
        });
    }
};

// delete category
export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        const existingCategory = await prisma.category.findUnique({
            where: { id },
        });

        if (!existingCategory) {
            return res.status(404).json({
                message: "Kategori tidak ditemukan",
            });
        }

        await prisma.category.delete({
            where: { id },
        });

        res.json({
            message: "Kategori berhasil dihapus",
        });
    } catch (error: any) {
        // Menangkap error jika kategori tidak bisa dihapus karena masih ada event yang menggunakannya (onDelete: Restrict)
        if (error.code === 'P2003') {
            return res.status(400).json({
                message: "Kategori tidak bisa dihapus karena masih digunakan oleh satu atau beberapa Event.",
            });
        }

        res.status(500).json({
            message: "Gagal menghapus kategori",
            error,
        });
    }
};