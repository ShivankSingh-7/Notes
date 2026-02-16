import React, { useState } from "react";
import { useNote } from "../../Context/NoteContext";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";

function Home() {
  const { user, setInNote, notes, deleteNote } = useNote();

  const softColors = [
    "from-blue-100 to-blue-200",
    "from-purple-100 to-purple-200",
    "from-pink-100 to-pink-200",
    "from-green-100 to-green-200",
    "from-yellow-100 to-yellow-200",
    "from-indigo-100 to-indigo-200",
    "from-rose-100 to-rose-200",
    "from-teal-100 to-teal-200",
    "from-orange-100 to-orange-200",
    "from-cyan-100 to-cyan-200",
  ];

  const getColorForNote = (id) => {
    const index = id % softColors.length;
    return softColors[index];
  };

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const month = date.toLocaleString("en-US", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  }

  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50">
      {/* Header Section */}
      <div className="px-6 py-6 shrink-0 animate-fadeIn">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Message */}
          <div className="mb-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              Welcome back,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">
                {user}
              </span>
              ! 👋
            </h1>
            <p className="text-gray-600 mt-2 text-lg">
              {notes.length === 0
                ? "Start your journey by creating your first note"
                : `You have ${notes.length} ${notes.length === 1 ? "note" : "notes"}`}
            </p>
          </div>
        </div>
      </div>

      {/* Notes Grid Container */}
      <div className="flex-1 overflow-y-auto min-h-0 scrollbar-thin px-6 pb-6">
        <div className="max-w-7xl mx-auto">
          {notes.length === 0 ? (
            // Empty State
            <div className="flex flex-col items-center justify-center h-full py-20 animate-fadeIn">
              <div className="w-32 h-32 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-16 h-16 text-cyan-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                No notes yet
              </h3>
              <p className="text-gray-500 text-center max-w-md">
                Click the Create button to start capturing your ideas
              </p>
            </div>
          ) : (
            // Notes Grid
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fadeIn">
              {notes.map((note, index) => (
                <div
                  key={note.id}
                  className="group animate-scaleIn"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div
                    className={`relative h-64 p-5 flex flex-col bg-gradient-to-br ${getColorForNote(
                      note.id
                    )} rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-white/50`}
                  >
                    {/* Color indicator dot */}
                    <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-white/60 backdrop-blur-sm"></div>

                    {/* Note Title */}
                    <h3 className="text-xl font-bold pb-3 truncate text-gray-800 group-hover:text-gray-900 transition-colors">
                      {note.title || "Untitled"}
                    </h3>

                    {/* Note Content */}
                    <p className="flex-1 text-gray-700 text-sm leading-relaxed line-clamp-5 mb-3 overflow-hidden">
                      {note.note}
                    </p>

                    {/* Footer */}
                    <div className="flex justify-between items-center pt-3 border-t border-gray-800/10">
                      {/* Date */}
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="text-xs text-gray-700 font-medium">
                          {formatDate(note.id)}
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => deleteNote(note.id)}
                          className="p-2 rounded-lg bg-white/60 hover:bg-red-100 border border-white/80 hover:border-red-300 transition-all duration-200 hover:scale-110 active:scale-95 group/delete"
                          title="Delete note"
                        >
                          <FaTrash className="w-3.5 h-3.5 text-gray-600 group-hover/delete:text-red-600 transition-colors" />
                        </button>

                        <Link
                          to={`/note/${note.id}`}
                          onClick={() => setInNote(true)}
                        >
                          <button
                            className="p-2 rounded-lg bg-white/60 hover:bg-cyan-100 border border-white/80 hover:border-cyan-300 transition-all duration-200 hover:scale-110 active:scale-95 group/edit"
                            title="Edit note"
                          >
                            <FiEdit className="w-3.5 h-3.5 text-gray-600 group-hover/edit:text-cyan-600 transition-colors rotate-90" />
                          </button>
                        </Link>
                      </div>
                    </div>

                    {/* Hover overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;