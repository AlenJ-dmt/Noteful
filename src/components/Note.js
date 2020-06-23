import React from "react";
import { Link } from 'react-router-dom'
import "./Note.css";

class Note extends React.Component {
  render() {
    return (
      <div className="note-container">
        <Link to={`/note/${this.props.id}`} >{this.props.name}</Link>
        <div className="note-info">
          <p>{this.props.date}</p>
          <button>Delete</button>
        </div>
      </div>
    );
  }
}
export default Note;
