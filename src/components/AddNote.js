import React from "react";
import config from "../config";
import NoteContext from "../NoteContext";
import ValidationError from '../components/ValidationError'
var uniqid = require("uniqid");

class AddNote extends React.Component {
  static contextType = NoteContext;
  state = {
    Name: "",
    Content: "",
    Folder: "Select",
    folders: [],
    NameTouch: false,
    ContentTouch: false,
    FolderTouch: false,
    error: "",
  };

  inputChangeHanlder = (ev) => {
    this.setState(
      {
        [ev.target.name]: ev.target.value,
        [ev.target.name + "Touch"]: true,
      }
    );
  };

  UserInputHandler = (input, inputField) => {
    if (input === 0) {
      this.setState({
          error: "This Filed Can't be empty"
      })
    } else if (input < 4) {
      console.log(`${inputField} have to be longer than 3 letters`);
    }
  };
  saveNewNote = (ev) => {
    ev.preventDefault();
    this.UserInputHandler(this.state.Name.length, this.state.Name)
    console.log(ev.target)
    let date = new Date();
    let createdTime =
      date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();

    fetch(`${config.API_ENDPOINT}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: uniqid(),
        name: this.state.noteName,
        modified: createdTime,
        folderId: this.state.Folder,
        content: this.state.noteContent,
      }),
    });
    
  };
  render() {
    return (
      <form>
        <p>
          <label htmlFor="note-name">Note Name: </label>
          <input
            required
            type="text"
            id="note-name"
            placeholder="New note..."
            name="Name"
            value={this.state.Name}
            onChange={(ev) => this.inputChangeHanlder(ev)}
          />
        {this.state.NameTouch && 
          <ValidationError message={this.state.error} />
        }
        </p>
        <p>
          <label htmlFor="note-content">Note content: </label>
          <input
            required
            type="text"
            id="note-content"
            placeholder="New content..."
            name="Content"
            value={this.state.Content}
            onChange={(ev) => this.inputChangeHanlder(ev)}
          />
        {this.state.ContentTouch && (
          <ValidationError message={this.state.error} />
        )}
        </p>
        <label htmlFor="note-folder">folder: </label>
        <select name="Folder" onChange={(ev) => this.inputChangeHanlder(ev)} value={this.state.value}>
            <option value='...'>...</option>
          {this.context.folders.map((folder) => {
            return <option value={folder.id}>{folder.name}</option>;
          })}
        </select> 
        <br />
        <button onClick={(ev) => this.saveNewNote(ev)}>Save</button>
      </form>
    );
  }
}

export default AddNote;
