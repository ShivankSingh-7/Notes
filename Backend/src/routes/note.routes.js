import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addNote, deleteNote, getNote, getNotes, updateNote } from "../Controllers/note.controller.js";

const router = Router()

// some protected routes
router.route("/add-note").post(verifyJWT, addNote)
router.route("/get-notes").get(verifyJWT, getNotes)
router.route("/get-Note/:id").get(verifyJWT, getNote)
router.route("/delete-note/:id").delete(verifyJWT, deleteNote)
router.route("/update-note/:id").patch(verifyJWT, updateNote)

export default router