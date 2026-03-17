import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Note } from "../models/notes.model.js";


const addNote = asyncHandler(async( req, res)=>{
    const {title, content} = req.body

    if(!content){
        throw new ApiError(400, "note can not created empty")
    }

    const note = await Note.create({
        title: title,
        content: content,
        owner: req.user._id
    })

    if(!note){
        throw new ApiError(500, "note can not created")
    }

    return res
    .status(201)
    .json(
        new ApiResponse(201, note, "note successfully created")
    )
})

const getNotes = asyncHandler(async(req, res)=>{
    const notes = await Note.find({owner: req.user._id})

    if(!notes){
        throw new ApiError(404, "No notes found")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200,
            notes, 
            "notes fetched"
        )
    )
})

const deleteNote = asyncHandler(async(req, res)=>{
    const noteId = req.params.id

    if(!noteId){
        throw new ApiError(400, "Invalid request")
    }

    const deletedNote = await Note.findByIdAndDelete(noteId)
    
    if(!deletedNote){
        throw new ApiError(500, "can not find note")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200, deletedNote, "note successfully deleted")
    )
})

const getNote = asyncHandler(async(req, res)=>{
    const noteId = req.params.id

    if(!noteId){
        throw new ApiError(404, "Note not found")
    }

    const note = await Note.findById(noteId)

    if(!note){
        throw new ApiError(500, "can not get the note")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, note, "successfully fetched the note")
    )
})

const updateNote = asyncHandler(async(req, res)=>{
    const noteId = req.params.id

    if(!noteId){
        throw new ApiError(404, "can not get the note")
    }

    const update = req.body

    const updatedNote = await Note.findOneAndUpdate(
        noteId,
        update,
        {
            new: true,
            runValidators: true
        }
    )

    if(!updatedNote){
        throw new ApiError(404, "can not find the note")
    }

    return res
    .status(201)
    .json(
        new ApiResponse(201, updatedNote, "note successfully updated")
    )
})


export {addNote, getNotes, deleteNote, getNote, updateNote}