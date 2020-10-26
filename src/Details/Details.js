import React from "react";
import AnimalCard from './AnimalCard'
import NoteContext from '../NoteContext'
import PropTypes from 'prop-types'

class Details extends React.Component {
  static contextType = NoteContext
  
  render() {
    const { noteId } = this.props.match.params
    const selectedNote =  this.context.notes.filter(note => String(note.id) === String(noteId))
    // const currentFolder = this.context.folders.filter(folder => String(folder.id) === String(selectedNote[0].folderId))
    
    return (
      <AnimalCard selectedNote={selectedNote} />
    );
  }
}

Details.propTypes = {
  noteId: PropTypes.string
}

export default Details;
