import {  createContext, useContext, useEffect, useState } from "react";

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

  useEffect(()=>{
    const notes = JSON.parse(localStorage.getItem("notes"))

    if(notes && notes.length>0){
        setNotes(notes)
    }
  },[])

  useEffect(()=>{
    localStorage.setItem("notes", JSON.stringify(notes))
  },[notes])


  const saveNote = (id, title, note) =>{
    if(id === "new"){
        addNote(title, note)
    }
    else{
        updateNote(id, title, note)
    }

    localStorage.removeItem("draft-note")
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
        saveNote,
        cancelNote
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export const useNote = () => {
  return useContext(NoteContext);
};
