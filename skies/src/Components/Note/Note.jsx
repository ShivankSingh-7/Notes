import React, { useEffect, useState } from "react";
import { useNote } from "../../Context/NoteContext";
import { useParams } from "react-router-dom";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { FaCheck, FaTimes } from "react-icons/fa";

function Note() {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [originalTitle, setOriginalTitle] = useState("");
  const [originalContent, setOriginalContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const navigate = useNavigate();

  const { notes, setInNote, inNote, saveNote, cancelNote } = useNote();
  const { id } = useParams();

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("draft-note", JSON.stringify({ title, note }));
      setIsSaving(true);
      setTimeout(() => setIsSaving(false), 800);
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
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-amber-50 via-orange-50 to-pink-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-200/20 to-blue-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-pink-200/20 to-purple-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      {/* Auto-save indicator */}
      <div className="absolute top-4 left-4 z-10">
        <div
          className={`text-xs text-gray-500 transition-all duration-300 ${
            isSaving ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          }`}
        >
          <div className="flex items-center gap-2 glass-effect-strong px-3 py-1.5 rounded-full shadow-sm">
            <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse"></div>
            Saving...
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full h-full flex flex-col animate-fadeIn">
        {/* Header Section */}
        <div className="flex items-center border-b border-gray-200/50 glass-effect shadow-sm">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Untitled Note"
            className="w-full outline-none px-6 py-4 bg-transparent text-2xl font-semibold text-gray-800 placeholder:text-gray-400 transition-all duration-200 focus:placeholder:text-gray-300"
          />

          {/* Action Buttons */}
          {inNote && (
            <div className="flex gap-2 px-6 animate-slideInRight">
              <button
                onClick={() => handleCancel()}
                className="group relative p-3 rounded-xl bg-white hover:bg-red-50 border border-gray-200 hover:border-red-300 transition-all duration-300 hover:scale-110 hover:shadow-lg active:scale-95"
                title="Cancel"
              >
                <FaTimes className="text-gray-600 group-hover:text-red-500 transition-colors duration-300" />
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  Cancel
                </span>
              </button>

              <button
                onClick={() => handleSave()}
                className="group relative p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 border border-cyan-600 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-cyan-500/30 active:scale-95"
                title="Save"
              >
                <FaCheck className="text-white transition-transform duration-300 group-hover:scale-110" />
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  Save
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Note Content Area */}
        <div className="flex-1 flex flex-col p-6 overflow-hidden">
          <div className="flex-1 relative">
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Start writing your thoughts..."
              className="w-full h-full resize-none outline-none glass-effect rounded-2xl p-6 text-gray-700 text-lg leading-relaxed placeholder:text-gray-400 shadow-sm border border-gray-200/50 transition-all duration-300 focus:bg-white/80 focus:shadow-md focus:border-cyan-300/50 scrollbar-thin"
            ></textarea>

            {/* Character count */}
            <div className="absolute bottom-4 right-4 text-xs text-gray-400 glass-effect-strong px-3 py-1.5 rounded-full border border-gray-200/50">
              {note.length} characters
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Note;