import React from "react";
import AnimalCard from './AnimalCard'
import NoteContext from '../NoteContext'
import PropTypes from 'prop-types'

class Details extends React.Component {
  static contextType = NoteContext
    selectedNote =  this.context.notes.filter(note => note.id === this.props.noteId)
    currentFolder = this.context.folders.filter(folder => folder.id === this.selectedNote[0].folderId)
    
  render() {
    return (
      <AnimalCard selectedNote={this.selectedNote} currentFolder={this.currentFolder}/>
    );
  }
}

Details.propTypes = {
  noteId: PropTypes.string
}

export default Details;
