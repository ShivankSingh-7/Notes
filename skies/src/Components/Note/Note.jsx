import React, { useEffect, useState } from "react";
import { useNote } from "../../Context/NoteContext";
import { useParams } from "react-router-dom";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import { useNavigate } from "react-router-dom";

function Note() {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [originalTitle, setOriginalTitle] = useState("");
  const [originalContent, setOriginalContent] = useState("");

  const navigate = useNavigate();

  const { notes, setInNote, inNote, saveNote, cancelNote } = useNote();
  const { id } = useParams();

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("draft-note", JSON.stringify({ title, note }));
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [title, note]);

  useEffect(() => {
    if (id !== "new") {
      const draft = notes.find((note) => note.id === Number(id));
      console.log(draft);
      if (draft) {
        setTitle(draft.title);
        setNote(draft.note);
        setOriginalTitle(draft.title);
        setOriginalContent(draft.note);
      }
    }
  }, [id, notes]);

  const handleSave = () => {
    setInNote(false);
    if (title == "" && note != "") {
      if (id === "new") {
        saveNote(id, "Note Title", note);
      } else {
        saveNote(Number(id), title, note);
      }
    } else if (title != "" && note != "") {
      if (id === "new") {
        saveNote(id, title, note);
      } else {
        saveNote(Number(id), title, note);
      }
    }
    navigate("/home");
  };

  const handleCancel = () => {
    if (id != "new") {
      setTitle(originalTitle || "");
      setNote(originalContent || "");
      setInNote(false);
    }
    cancelNote();
    navigate("/home");
  };

  return (
    <div className="w-full bg-amber-300 h-full flex flex-col p-3">
      <div className="flex">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Title"
          className="border w-full outline-none "
        />

        <ul className="flex">
          {inNote && (
            <li className="">
              {/* PrimaryButton */}
              <PrimaryButton onClick={() => handleCancel()} text={"Cancel"} />
            </li>
          )}

          {inNote && (
            <li className="">
              {/* PrimaryButton */}
              <PrimaryButton
                className="duration-150"
                onClick={() => handleSave()}
                text={"Save"}
              />
            </li>
          )}
        </ul>
      </div>
      <div className="flex-1 flex flex-col mt-2">
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Note"
          className="flex-1 resize-none w-full border outline-none"
        ></textarea>
      </div>
    </div>
  );
}

export default Note;
