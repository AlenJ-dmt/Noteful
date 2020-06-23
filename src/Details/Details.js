import React from "react";
import AnimalCard from './AnimalCard'

class Details extends React.Component {
    selectedNote =  this.props.notes.filter(note => note.id === this.props.noteId)
    currentFolder = this.props.folders.filter(folder => folder.id === this.selectedNote[0].folderId)
    
  render() {
    return (
      <AnimalCard selectedNote={this.selectedNote} currentFolder={this.currentFolder}/>
    );
  }
}

export default Details;
