import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import noteContext from "../NoteContext";
import "./AnimalCard.css";
import PropTypes from "prop-types";
import config from "../config";
import QRCode from "qrcode.react";
import Update from "../update/Update";

const AnimalCard = (props) => {
  const context = useContext(noteContext);
  const history = useHistory();
  const { noteId } = useParams();
  const [editMode, setEditMode] = useState(false);

  let cFolder = context.folders;

  const [state, setState] = useState({
    folderId: "Loading",
    name: "Loading",
    content: "Loading",
    id: "Loading",
  });

  const venderRim = (ev) => {
    ev.preventDefault();

    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: state.name,
        folderId: 17,
        content: state.content,
      }),
    })
      .then((response) => {
        if (response.status !== 204) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          return;
        }
      })
      .then(() => {
        history.push("/folder/17");
        props.getNote();
      })
      .catch((err) => console.log(err));
  };

  const prestarRim = (ev) => {
    ev.preventDefault();

    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: state.name,
        folderId: 18,
        content: state.content,
      }),
    })
      .then((response) => {
        if (response.status !== 204) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          return;
        }
      })
      .then(() => {
        history.push("/folder/18");
        props.getNote();
      })
      .catch((err) => console.log(err));
  };

  const getNote = () => {
    fetch(`${config.API_ENDPOINT}/notes/${noteId}`)
      .then((response) => response.json())
      .then((jsonResponse) =>
        setState({
          folderId: jsonResponse.folderId,
          name: jsonResponse.name,
          content: jsonResponse.content,
        })
      )
      .then(() => setEditMode(false));
  };

  useEffect(() => {
    getNote();
  }, []);

  return (
    <div className="detail">
      <div className="sidebar">
        <Link to="/">Go Back:</Link>
        {state.folderId === "Loading" ? (
          <div>
            <h2>Current Folder: </h2>
            <br></br>
            <h2>{state.folderId}</h2>
          </div>
        ) : (
          <div>
            <h2>Current Folder: </h2>
            <h2>{cFolder[state.folderId - 1].name}</h2>
          </div>
        )}
      </div>
      <div className="main-d">
        <p>Title: {state.name}</p>
        <br></br>
        <p>Location: {state.content}</p>
        <br></br>
        <button
          onClick={() => {
            setEditMode(true);
          }}
        >
          Edit
        </button>
        <div className="buttons-container">
          <button style={{backgroundColor: 'green', color: 'white'}} className="detail-btn" onClick={(ev) => venderRim(ev)}>
            {" "}
            Vender{" "}
          </button>
          <button style={{backgroundColor: 'red', color: 'white'}} className="detail-btn" onClick={(ev) => prestarRim(ev)}>
            {" "}
            Prestar{" "}
          </button>
        </div>
        {editMode && (
          <Update getNote={() => getNote()} folderId={state.folderId} />
        )}

        <br></br>
        <div style={{ margin: 20 }}>
          <QRCode value={window.location.href} />
        </div>
      </div>
    </div>
  );
};

AnimalCard.propType = {
  selectedNote: PropTypes.object,
  currentFolder: PropTypes.array,
};
export default AnimalCard;
