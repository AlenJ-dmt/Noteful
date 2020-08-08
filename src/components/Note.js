import React from "react";
import { Link } from "react-router-dom";
import "./Note.css";
import NoteContext from '../NoteContext'
import PropTypes from "prop-types"

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
    })
    .catch(error => {
      console.error({ error })
    })
  }

  render() {
    return (
      <div className="note-container">
        <Link id='note-name' to={`/note/${this.props.id}`}>{this.props.name}</Link>
        <div className="note-info">
          <p id='date-modified' >Modified: {this.props.date.slice(0, 10)}</p>
          <button className='btn' onClick={(ev) => {this.handleClickDelete(ev)}}> Delete </button>
        </div>
      </div>
    );
  }
}

Note.propTypes = {
  date: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}

export default Note;
