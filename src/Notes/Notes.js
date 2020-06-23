import React from "react";
import Note from "../components/Note";
import "./Notes.css";

class Notes extends React.Component {
  notesComponent = () =>{
    if (this.props.folderId === undefined){
      return this.props.notes.map(note => 
        <Note id={note.id} name={note.name} date={note.modified} />
      )
    } else{
      let notes = this.props.notes.filter(note => note.folderId === this.props.folderId )
      return  notes.map(note => 
        <Note id={note.id} name={note.name} date={note.modified} /> )
    }
  }
  render() {
    let notesComponent = [];
    
    return (<div className="notes">{this.notesComponent()}</div>)
  }
}

export default Notes;
