function Sidebar({
  notes,
  findCurrentNote,
  setCurrentNoteId,
  createNewNote,
  deleteNote,
}) {
  const orderedNotes = notes.sort((a, b) => {
    let da = new Date(a.time),
      db = new Date(b.time);
    return db - da;
  });
  const noteElements = orderedNotes.map((note, index) => (
    <div key={note.id}>
      <div
        className={`title ${
          note.id === findCurrentNote.id ? "selected-note" : ""
        }`}
        onClick={() => setCurrentNoteId(note.id)}
      >
        <h4 className="text-snippet">{note.body.split("\n")[0]}</h4>
        <button
          className="delete-btn"
          onClick={(event) => deleteNote(event, note.id)}
        >
          <i className="gg-trash trash-icon"></i>
        </button>
      </div>
    </div>
  ));
  return (
    <section className="pane sidebar">
      <div className="sidebar--header">
        <h3>Notes</h3>
        <button className="new-note" onClick={createNewNote}>
          +
        </button>
      </div>
      {noteElements}
    </section>
  );
}

export default Sidebar;
