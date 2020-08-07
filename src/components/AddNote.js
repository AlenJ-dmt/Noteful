import React from "react";
import config from "../config";
import NoteContext from "../NoteContext";
import ValidationError from "../components/ValidationError";
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
    NameError: "",
    ContentError: "",
    FolderError: "",
    error: "",
    createNewNoteError: false,
  };

  inputChangeHanlder = (ev) => {
    this.setState({
      [ev.target.name]: ev.target.value,
      [ev.target.name + "Touch"]: true,
    });
  };

  UserInputHandler = (inputField, Touch, error) => {
    if (inputField.length === 0) {
      this.setState({
        [error]: "This Field Can't be empty",
        [Touch]: true,
      });
    } else if (inputField.length < 4) {
      this.setState({
        [error]: "This field must be grater than 4 letterss",
        [Touch]: true,
      });
    } else if (inputField === "Select") {
      this.setState({
        [error]: "Please select a valid folder",
        [Touch]: true,
      });
    } else {
      return true;
    }
  };
  saveNewNote = (ev) => {
    ev.preventDefault();
    let isNameValid = this.UserInputHandler(
      this.state.Name,
      "NameTouch",
      "NameError"
    );
    let isContentValid = this.UserInputHandler(
      this.state.Content,
      "ContentTouch",
      "ContentError"
    );
    let isFolderValid = this.UserInputHandler(
      this.state.Folder,
      "FolderTouch",
      "FolderError"
    );

    console.log(isFolderValid, isContentValid, isNameValid);

    if (isNameValid && isContentValid && isFolderValid) {
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
          name: this.state.Name,
          modified: createdTime,
          folderId: this.state.Folder,
          content: this.state.Content,
        }),
      })
        .then((response) => {
          if (response.status !== 201) {
            console.log(
              "Looks like there was a problem. Status Code: " + response.status
            );
            return;
          }
          response
            .json()
            .then(() => {
              this.setState({
                Name: "",
                Content: "",
                Folder: "Select",
                folders: [],
                NameTouch: false,
                ContentTouch: false,
                FolderTouch: false,
                NameError: "",
                ContentError: "",
                FolderError: "",
                value: "Select",
                error: "",
              });
            })
            .then(() => {
              this.context.handleCreateNewNote();
            });
        })
        .catch((err) => {
          this.setState({
            error: "Something Went wrong while creating a new note",
            createNewNoteError: true,
          });
        });
    }
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
          {this.state.NameTouch && (
            <ValidationError message={this.state.NameError} />
          )}
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
            <ValidationError message={this.state.ContentError} />
          )}
        </p>
        <label htmlFor="note-folder">folder: </label>
        <select
          name="Folder"
          onChange={(ev) => this.inputChangeHanlder(ev)}
          value={this.state.value}
        >
          <option value="...">...</option>
          {this.context.folders.map((folder, index) => {
            return (
              <option key={index} value={folder.id}>
                {folder.name}
              </option>
            );
          })}
        </select>
        {this.state.FolderTouch && (
          <ValidationError message={this.state.FolderError} />
        )}
        <br />
        <button onClick={(ev) => this.saveNewNote(ev)}>Save</button>
        {this.state.createNewNoteError && (
          <ValidationError message={this.state.error} />
        )}
      </form>
    );
  }
}

export default AddNote;
