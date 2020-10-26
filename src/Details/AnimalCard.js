import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import noteContext from "../NoteContext";
import "./AnimalCard.css";
import PropTypes from "prop-types";
import config from "../config";
import QRCode from "qrcode.react";

const AnimalCard = (props) => {
  const context = useContext(noteContext);

  const { noteId } = useParams();

  let cFolder = context.folders;

  const [state, setState] = useState({
    folderId: "Loading",
    name: "Loading",
    modified: "Loading",
    content: "Loading",
  });

  const getNote = () => {
    fetch(`${config.API_ENDPOINT}/notes/${noteId}`)
      .then((response) => response.json())
      .then((jsonResponse) =>
        setState({
          folderId: jsonResponse.folderId,
          name: jsonResponse.name,
          content: jsonResponse.content,
        })
      );
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
        <div>
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
