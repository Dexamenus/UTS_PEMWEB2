import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";

const prisma = new PrismaClient();
export const getEvents = async (req: Request, res: Response) => {
    try {
        const events = await prisma.event.findMany({
            orderBy: {
                createdAt: "desc",
            },
            include: {
                category: true,
                pembicara: true,
            },
        });
        res.json(events);
    } catch (error) {
        res.status(500).json({
            message: "Gagal mengambil data event",
            error,
        });
    }
};

// Ambil detail event berdasarkan ID
export const getEventById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const event = await prisma.event.findUnique({
            where: { id },
            include: {
                category: true,
                pembicara: true,
            },
        });

        if (!event) {
            return res.status(404).json({
                message: "Event tidak ditemukan",
            });
        }
        res.json(event);
    } catch (error) {
        res.status(500).json({
            message: "Gagal mengambil detail event",
            error,
        });
    }
};

// Buat event baru
export const createEvent = async (req: Request, res: Response) => {
    try {
        const { name, categoryId, location, dateEvent, description } = req.body;

        // Validasi input
        if (!name || !categoryId || !location || !dateEvent || !description) {
            return res.status(400).json({
                message: "Semua field wajib diisi",
            });
        }

        const newEvent = await prisma.event.create({
            data: {
                name,
                categoryId: Number(categoryId), // Konversi ke Number
                location,
                dateEvent: new Date(dateEvent), // Konversi ke Date object
                description,
            },
        });

        res.status(201).json({
            message: "Event berhasil dibuat",
            data: newEvent,
        });
    } catch (error) {
        res.status(500).json({
            message: "Gagal membuat event",
            error,
        });
    }
};

// Update event yang sudah ada
export const updateEvent = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const existingEvent = await prisma.event.findUnique({
            where: { id },
        });

        if (!existingEvent) {
            return res.status(404).json({
                message: "Event tidak ditemukan",
            });
        }

        const { name, categoryId, location, dateEvent, description } = req.body;

        const updatedEvent = await prisma.event.update({
            where: { id },
            data: {
                name: name ?? existingEvent.name,
                categoryId: categoryId ? Number(categoryId) : existingEvent.categoryId,
                location: location ?? existingEvent.location,
                dateEvent: dateEvent ? new Date(dateEvent) : existingEvent.dateEvent,
                description: description ?? existingEvent.description,
            },
        });

        res.json({
            message: "Event berhasil diupdate",
            data: updatedEvent,
        });
    } catch (error) {
        res.status(500).json({
            message: "Gagal update event",
            error,
        });
    }
};

// Hapus event
export const deleteEvent = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const existingEvent = await prisma.event.findUnique({
            where: { id },
        });

        if (!existingEvent) {
            return res.status(404).json({
                message: "Event tidak ditemukan",
            });
        }

        await prisma.event.delete({
            where: { id },
        });

        res.json({
            message: "Event berhasil dihapus",
        });
    } catch (error) {
        res.status(500).json({
            message: "Gagal menghapus event",
            error,
        });
    }
};