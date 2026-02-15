import React from "react";
import { useNote } from "../../Context/NoteContext";
import { Link } from "react-router-dom";

function Home() {
  const { user, setInNote, notes } = useNote();

  const softColors = [
      "bg-blue-200",
      "bg-purple-200",
      "bg-pink-200",
      "bg-green-200",
      "bg-yellow-200",
      "bg-indigo-200",
      "bg-rose-200",
      "bg-teal-200",
      "bg-orange-200",
      "bg-cyan-200",
    ];

  const randomColor = () => {
    const n = Math.floor(Math.random() * softColors.length)

    return softColors[n];
  };
  return (
    <div className="w-full h-full flex flex-col">
      <div className="px-3   rounded-2xl mx-2 mt-3">
        <h1 className="text-2xl">
          <span className="font-medium font-ephesis text-5xl text-cyan-500">
            {" "}
            {user} Notes
          </span>
        </h1>
      </div>

      {/* add  element */}
      <div className=" flex-1  flex flex-wrap p-3 overflow-scroll  scroll-smooth scrollbar-hide  rounded-2xl gap-5 " >
        {notes.map((note) => (
          <Link
            key={note.id}
            className={` w-50 h-50 flex flex-col ${randomColor()} rounded-2xl`}
            to={`/note/${note.id}`}
            onClick={() => setInNote(true)}
          >
            <h3 className="text-2xl px-2 pb-2 truncate">{note.title}</h3>
            <p className="flex-1 w-full mb-2 px-2 py-1 line-clamp-9 overflow-hidden whitespace-normal wrap-break-word">
              {note.note}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
