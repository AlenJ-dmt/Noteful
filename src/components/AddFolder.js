import React from "react";
import ValidationError from "./ValidationError";
import NoteContext from "../NoteContext";
var uniqid = require("uniqid");

class AddFolder extends React.Component {
  static contextType = NoteContext;
  state = {
    folder: {
      foldername: "",
      error: "",
      touched: false,
    },
  };
  inputChangeHandler = (ev) => {
    ev.preventDefault();

    this.setState({
      folder: {
        foldername: ev.target.value,
        error: "",
        touched: true,
      },
    });
  };

  createNewFolder = (ev) => {
    ev.preventDefault();
    console.log(ev.target.id);
    if (this.state.folder.foldername.length === 0) {
      this.setState({
        folder: {
          foldername: ev.target.value,
          error: "Folder name is required",
          touched: true,
        },
      });
    } else if (this.state.folder.foldername.length < 3) {
      this.setState({
        folder: Object.assign(this.state.folder, {
          error: "Folder name must be longer than 3 characters",
        }),
      });
    } else {
      fetch("http://localhost:9090/folders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: uniqid(),
          name: this.state.folder.foldername,
        }),
      });

      this.setState({
        folder: {
          foldername: "",
          error: "",
          touched: false,
        },
      });
    //   this.context.handleCreateNewFolder();
    console.log()
    window.location.href = '/'
     }
  };

  render() {
    return (
      <form id="form-add">
        <p>
          <label htmlFor="folder-name">Folder Name: </label>
          <input
            required
            type="text"
            id="folder-name"
            placeholder="My Folder"
            name="foldername"
            value={this.state.folder.foldername}
            onChange={(ev) => this.inputChangeHandler(ev)}
          />
          {this.state.folder.touched && (
            <ValidationError message={this.state.folder.error} />
          )}
        </p>
        <button onClick={(ev) => this.createNewFolder(ev)}>Save</button>
      </form>
    );
  }
}

export default AddFolder;
