import React from 'react'
var uniqid = require("uniqid");

class AddNote extends React.Component{
    state={
        noteName: '',
        noteContent: ''
    }

    inputChangeHanlder = (ev) => {
        this.setState({
            [ev.target.name]: ev.target.value
        })
        
    }
    saveNewNote = (ev) => {
        ev.preventDefault()
        let date = new Date()
        let createdTime = ( date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear()

        let folderId= window.location.pathname.substring(8)
        console.log(createdTime)

        fetch("http://localhost:9090/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: uniqid(),
          name: this.state.noteName,
          modified: createdTime,
          folderId: folderId,
          content: this.state.noteContent
        }),
      });
            
    }
    render(){
        return(
            <form>
                <p>
                    <label htmlFor='note-name'>Note Name: </label>
                    <input
                    required
                    type='text'
                    id='note-name'
                    placeholder='New note...'
                    name='noteName'
                    value={this.state.noteName}
                    onChange={(ev) => this.inputChangeHanlder(ev)}
                    />
                </p>
                <p>
                <label htmlFor='note-content'>Note content: </label>
                    <input
                    required
                    type='text'
                    id='note-content'
                    placeholder='New content...'
                    name='noteContent'
                    value={this.state.noteContent}
                    onChange={(ev) => this.inputChangeHanlder(ev)}
                    />
                </p>
                <button onClick={(ev) => this.saveNewNote(ev)} >Save</button>
            </form>
        )
    }
}

export default AddNote;