import React from "react";
import Note from "../components/Note";
import "./Notes.css";
import NoteContext from "../NoteContext";
import AddNote from "../components/AddNote";
import PropTypes from 'prop-types';

class Notes extends React.Component {
  static contextType = NoteContext;

  state = {
    createNote: false,
  };

  handleDeleteNote = () => {
    this.props.history.push(`/`);
  };

  notesComponent = () => {
    const { folderId } = this.props.match.params 
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
        {this.notesComponent()}
        <button
          onClick={() => {
            this.setState({
              createNote: true,
            });
          }}
        >
          Add Note
        </button>
        {this.state.createNote && <AddNote folderId={this.props.folderId} />}
      </div>
    );
  }
}

Notes.propTypes ={
  folderId: PropTypes.string
}

export default Notes;
