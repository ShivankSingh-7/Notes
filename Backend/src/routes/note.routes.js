import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addNote, getNote } from "../Controllers/note.controller.js";

const router = Router()

// some protected routes
router.route("/add-note").post(verifyJWT, addNote)
router.route("/get-notes").get(verifyJWT, getNote)

export default router