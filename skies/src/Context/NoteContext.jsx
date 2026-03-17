import {  createContext, useContext, useEffect, useState } from "react";
import axios from "axios"

const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const[userName, setUserName] = useState()
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("")
  const [inNote, setInNote] = useState(true)


  const addNote = (title, note) => {
    setNotes((prev) => [...prev, { id: Date.now(), title, note }]);
  };

  const updateNote = (id, newTitle, newNote) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, title: newTitle, note: newNote } : note,
      ),
    );
  };

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };


  // fetching notes from the backend
  const getNote = async()=>{
    try {
      const res = await axios.get("http://localhost:8000/api/v1/get-notes", {withCredentials: true })

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
  },[isLoggedIn, inNote, inNote, notes])



  const cancelNote = () =>{
    localStorage.removeItem("draft-note")
  }

  return (
    <NoteContext.Provider
      value={{
        notes,
        setNotes,
        addNote,
        updateNote,
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
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export const useNote = () => {
  return useContext(NoteContext);
};
