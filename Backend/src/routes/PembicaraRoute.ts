import { Router } from "express";
import { getPembicara, getPembicaraById, createPembicara, updatePembicara, deletePembicara } from "../controller/PembicaraController.js";

const router = Router();
router.get("/", getPembicara);
router.get("/:id", getPembicaraById);
router.post("/", createPembicara);
router.put("/:id", updatePembicara);
router.delete("/:id", deletePembicara);

export default router;