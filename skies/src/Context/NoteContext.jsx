import {  createContext, useContext, useEffect, useState } from "react";
import axios from "axios"

const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const baseUrl = import.meta.env.VITE_BASE_URI;
  const [notes, setNotes] = useState([]);
  const[userName, setUserName] = useState()
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("")
  const [inNote, setInNote] = useState(true)
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");


  const addNote = (title, note) => {
    setNotes((prev) => [...prev, { id: Date.now(), title, note }]);
  };


  const deleteNote = async(id) => {
    try {
      const response = await axios.delete(`${baseUrl}/api/v1/delete-note/${id}`, {withCredentials: true})

      console.log(response)
    } catch (error) {
      console.log(error)
    }
  };


  // fetching notes from the backend
  const getNote = async()=>{
    try {
      const res = await axios.get(`${baseUrl}/api/v1/get-notes`, {withCredentials: true })

      const notes = res.data.data
      if(notes.length === 0){
        setNotes([])
      }

      setNotes(notes)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    if(isLoggedIn){
      getNote()
    }
  },[isLoggedIn, inNote, notes])


  const openNote = async(id)=>{
    try {
      const response = await axios.get(`${baseUrl}/api/v1/get-note/${id}`, {withCredentials: true})

      const prevNote = response.data.data
  
      setTitle(prevNote.title)
      setContent(prevNote.content)
    } catch (error) {
      console.log(error)
    }
  }


  const cancelNote = () =>{
    localStorage.removeItem("draft-note")
  }

  return (
    <NoteContext.Provider
      value={{
        notes,
        setNotes,
        addNote,
        isLoggedIn,
        setIsLoggedIn,
        deleteNote,
        userName,
        setUserName,
        user,
        setUser,
        inNote,
        setInNote,
        cancelNote,
        title,
        content,
        setContent,
        setTitle, 
        openNote
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export const useNote = () => {
  return useContext(NoteContext);
};
