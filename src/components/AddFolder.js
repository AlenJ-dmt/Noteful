import React from "react";
import ValidationError from "./ValidationError";
import NoteContext from "../NoteContext";
import config from "../config";
var uniqid = require("uniqid");

class AddFolder extends React.Component {
  static contextType = NoteContext;

  state = {
    folder: {
      foldername: "",
      error: "",
      touched: false,
      addFolderError: false,
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

  UserInputHandler = (FolderName, ev) => {
    if (FolderName === 0) {
      this.setState({
        folder: {
          foldername: "",
          error: "Folder name is required",
          touched: true,
          addFolderError: false,
        },
      });
    } else if (FolderName < 4) {
      this.setState({
        folder: Object.assign(this.state.folder, {
          error: "Folder name must be longer than 3 characters",
        }),
      });
    } else {
      return true;
    }
  };

  createNewFolder = (ev) => {
    ev.preventDefault();

    const validInput = this.UserInputHandler(
      this.state.folder.foldername.length
    );

    if (validInput) {
      fetch(`${config.API_ENDPOINT}/folders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: uniqid(),
          name: this.state.folder.foldername,
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
                folder: {
                  foldername: "",
                  error: "",
                  touched: false,
                  addFolderError: false,
                },
              });
            })
            .then(() => {
              this.context.handleCreateNewFolder();
            });
        })
        .catch((err) =>
          this.setState({
            folder: {
              foldername: "",
              touch: false,
              addFolderError: true,
              error: "Something went Wrong while adding new folder",
            },
          })
        );
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
        {this.state.folder.addFolderError && (
          <ValidationError message={this.state.folder.error} />
        )}
      </form>
    );
  }
}

export default AddFolder;
