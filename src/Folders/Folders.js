import React from "react";
import Folder from "../components/Folder";
import "./Folders.css";
import NoteContext from "../NoteContext";
import AddFolder from "../components/AddFolder";
import ErrorMsg from '../components/ErrorMsg'

class Folders extends React.Component {
  static contextType = NoteContext;
  state = {
    createNewFolder: false,
  };
  render() {
    const folders = this.context.folders.map((folder, idx) => (
      <Folder key={idx} name={folder.name} id={folder.id} />
    ));
    return (
      
      <div className="folders">
        {folders}
        {this.context.fetchError && <ErrorMsg>Somthing Went Wrong</ErrorMsg>}
        <button
          className="add-folder"
          onClick={() => {
            this.setState({ createNewFolder: true });
          }}
        >
          Add folder
        </button>
        {this.state.createNewFolder && <AddFolder />}
      </div>
    );
  }
}

export default Folders;
