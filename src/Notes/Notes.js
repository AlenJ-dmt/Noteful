import React from "react";
import Note from "../components/Note";
import "./Notes.css";
import NoteContext from "../NoteContext";
import PropTypes from "prop-types";
import ErrorMsg from "../components/ErrorMsg";

class Notes extends React.Component {
  static contextType = NoteContext;

  handleDeleteNote = () => {
    this.props.history.push(`/`);
  };

  notesComponent = () => {
    const { folderId } = this.props.match.params;
    if (folderId === undefined) {
      return this.context.notes.map((note, idx) => (
        <Note
          key={idx}
          id={note.id}
          onDeleteNote={this.handleDeleteNote}
          name={note.name}
          date={note.modified}
        />
      ));
    } else {
      let notes = this.context.notes.filter(
        (note) => note.folderId === folderId
      );
      return notes.map((note, idx) => (
        <Note
          key={idx}
          id={note.id}
          onDeleteNote={this.handleDeleteNote}
          name={note.name}
          date={note.modified}
        />
      ));
    }
  };

  render() {
    return (
      <div className="notes">
        {this.context.fetchError && <ErrorMsg>Somthing Went Wrong</ErrorMsg>}
        {this.notesComponent()}
        <button onClick={() => this.props.history.push(`/addNote`)}>
          Add Note
        </button>
      </div>
    );
  }
}

Notes.propTypes = {
  folderId: PropTypes.string,
};

export default Notes;
