import React from "react";
import config from "../config";
import NoteContext from "../NoteContext";
import ValidationError from "../components/ValidationError";
var uniqid = require("uniqid");

class AddNote extends React.Component {
  static contextType = NoteContext;
  state = {
    title: "",
    content: "",
    selectedFolder: "Select",
    folders: [],
    nameTouch: false,
    contentTouch: false,
    folderTouch: false,
    titleError: "",
    contentError: "",
    folderError: "",
    error: "",
    createNewNoteError: false,
    isTitleValid: false,
    isContentValid: false,
    isSelectedFolderValid: false,
    isFormReady: false,
    evTargetName: "",
    evTargetValue: "",
  };

  inputChangeHanlder = (ev) => {
    // console.log(ev.target.name)
    this.setState(
      {
        [ev.target.name]: ev.target.value,
        evTargetName: ev.target.name,
        evTargetValue: ev.target.value,
        //[ev.target.name + "Touch"]: true,
      },
      () => {
        this.validateInput(this.state.evTargetName, this.state.evTargetValue);
      }
    );
  };

  validateInput = (inputName, inputValue) => {

    if (inputName === "selectedFolder") {
      if (inputValue !== "Select") {
        this.setState(
          {
            isSelectedFolderValid: true,
          },
          this.validateForm
        );
      } else {
        this.setState(
          {
            isSelectedFolderValid: false,
          },
          this.validateForm
        );
      }
    } else {
      if (inputValue.length > 3) {
        this.setState(
          {
            [inputName === "title" ? "isTitleValid" : "isContentValid"]: true,
          },
          this.validateForm
        );
      } else {
        this.setState(
          {
            [inputName === "title" ? "isTitleValid" : "isContentValid"]: false,
          },
          this.validateForm
        );
      }
    }
  };

  validateForm = () => {
    this.setState({
      isFormReady:
        this.state.isTitleValid &&
        this.state.isContentValid &&
        this.state.isSelectedFolderValid,
    });
  };

  UserInputHandler = (inputField, Touch, error) => {
    if (inputField.length === 0) {
      this.setState({
        [error]: "This Field Can't be empty",
        [Touch]: true,
      });
    } else if (inputField.length < 3) {
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
      this.setState({
        isFormReady: true,
      });
    }
  };
  saveNewNote = (ev) => {
    ev.preventDefault();

    if (this.state.isFormReady) {
      let date = new Date();
      let createdTime =
        date.getMonth() + 1 + "-" + date.getDate() + "-" + date.getFullYear();

      fetch(`${config.API_ENDPOINT}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: uniqid(),
          name: this.state.title,
          modified: createdTime,
          folderId: this.state.selectedFolder,
          content: this.state.content,
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
                title: "",
                content: "",
                selectedFolder: "Select",
                folders: [],
                nameTouch: false,
                contentTouch: false,
                folderTouch: false,
                titleError: "",
                contentError: "",
                folderError: "",
                error: "",
                createNewNoteError: false,
                isTitleValid: false,
                isContentValid: false,
                isSelectedFolderValid: false,
                isFormReady: false,
                evTargetName: "",
                evTargetValue: "",
              });
            })
            .then(() => {
              this.context.handleCreateNewNote();
            });
        }).then(() => this.props.history.push(`/`))
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
      <form id="addNote-form">
        <p>
          <label htmlFor="note-name">Note Title: </label>
          <input
            required
            type="text"
            placeholder="Note Title..."
            name="title"
            value={this.state.title}
            onChange={(ev) => this.inputChangeHanlder(ev)}
          />
          {this.state.NameTouch && (
            <ValidationError message={this.state.titleError} />
          )}
        </p>
        <p>
          <label htmlFor="note-content">Note content: </label>
          <input
            required
            type="text"
            id="note-content"
            placeholder="New content..."
            name="content"
            value={this.state.content}
            onChange={(ev) => this.inputChangeHanlder(ev)}
          />
          {this.state.ContentTouch && (
            <ValidationError message={this.state.contentError} />
          )}
        </p>
        <label htmlFor="note-folder">folder: </label>
        <select
          name="selectedFolder"
          onChange={(ev) => this.inputChangeHanlder(ev)}
          value={this.state.selectedFolder}
        >
          <option value="Select">...</option>
          {this.context.folders.map((folder, index) => {
            return (
              <option key={index} value={folder.id}>
                {folder.name}
              </option>
            );
          })}
        </select>
        {this.state.FolderTouch && (
          <ValidationError message={this.state.folderError} />
        )}
        <br />
        {this.state.isFormReady ? (
          <button onClick={(ev) => this.saveNewNote(ev)}>Save</button>
        ) : (
          <button disabled onClick={(ev) => this.saveNewNote(ev)}>
            Save
          </button>
        )}
        {this.state.createNewNoteError && (
          <ValidationError message={this.state.error} />
        )}
      </form>
    );
  }
}

export default AddNote;
