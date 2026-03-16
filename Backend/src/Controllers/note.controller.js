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

const getNote = asyncHandler(async(req, res)=>{
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


export {addNote, getNote}