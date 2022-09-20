import "./App.css";
import Editor from "./Editor";
import Sidebar from "./Sidebar";
import Split from "react-split";
import { nanoid } from "nanoid";
import { useState } from "react";

function App() {
  const [notes, setNotes] = useState([]);
  const [currentNoteId, setCurrentNoteId] = useState(
    (notes[0] && notes[0].id) || ""
  );

  const createNewNote = () => {
    const newNote = {
      id: nanoid(),
      body: "# Type your markdown notes title here",
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setCurrentNoteId(newNote.id);
  };

  function updateNote(text) {
    setNotes((oldNotes) =>
      oldNotes.map((oldNote) => {
        return oldNote.id === currentNoteId
          ? { ...oldNote, body: text }
          : oldNote;
      })
    );
  }

  const findCurrentNote = () => {
    return (
      notes.find((note) => {
        return note.id === currentNoteId;
      }) || notes[0]
    );
  };

  return (
    <main>
      {notes.length > 0 ? (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
          <Sidebar
            notes={notes}
            findCurrentNote={findCurrentNote()}
            setCurrentNoteId={setCurrentNoteId}
            createNewNote={createNewNote}
          />
          {currentNoteId && notes.length > 0 && (
            <Editor
              findCurrentNote={findCurrentNote()}
              updateNote={updateNote}
            />
          )}
        </Split>
      ) : (
        <div className="no-notes">
          <h1>You have no notes</h1>
          <button className="first-note" onClick={createNewNote}>
            Create one now
          </button>
        </div>
      )}
    </main>
  );
}

export default App;
