import React from "react";
import { Link } from "react-router-dom";
import "./Note.css";
import NoteContext from '../NoteContext'

class Note extends React.Component {

  static contextType = NoteContext
  handleClickDelete = (ev) => {

    const noteId = this.props.id
    
    fetch(`http://localhost:9090/notes/${noteId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    }).then(res => {
      if (!res.ok)
        return res.json().then(e => Promise.reject(e))
      return res.json()
    })
    .then(() => {
      this.context.deleteNote(noteId)
      // allow parent to perform extra behaviour
      this.props.onDeleteNote(noteId)
    })
    .catch(error => {
      console.error({ error })
    })
  }

  render() {
    return (
      <div className="note-container">
        <Link to={`/note/${this.props.id}`}>{this.props.name}</Link>
        <div className="note-info">
          <p>{this.props.date}</p>
          <button onClick={(ev) => {this.handleClickDelete(ev)}}> Delete </button>
        </div>
      </div>
    );
  }
}
export default Note;
