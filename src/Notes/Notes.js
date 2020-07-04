import React from "react";
import Note from "../components/Note";
import "./Notes.css";
import NoteContext from '../NoteContext'


class Notes extends React.Component {
  static contextType = NoteContext

  handleDeleteNote = noteId => {
    console.log(this.props)
    this.props.history.push(`/`)
  }

  notesComponent = () =>{
    if (this.props.folderId === undefined){
      return this.context.notes.map((note, idx) => 
        <Note key={idx} id={note.id} onDeleteNote={this.handleDeleteNote} name={note.name} date={note.modified} />
      )
    } else{
      let notes = this.context.notes.filter(note => note.folderId === this.props.folderId )
      return  notes.map((note, idx) => 
        <Note key={idx} id={note.id} onDeleteNote={this.handleDeleteNote} name={note.name} date={note.modified} /> )
    }
  }
  
  render() {
    let notesComponent = [];
    
    return (<div className="notes">{this.notesComponent()}</div>)
  }
}

export default Notes;
