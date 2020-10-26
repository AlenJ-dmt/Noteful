import React, { useState } from "react";
import config from "../config";
import { useParams } from "react-router-dom";

const Update = (props) => {
  const [state, setState] = useState({
    name: "",
    content: "",
  });

  const { noteId } = useParams();

  const updateNote = (ev) => {
    ev.preventDefault();

    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: state.name,
        folderId: props.folderId,
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
      .then(() => props.getNote())
      .catch((err) => console.log(err));
  };

  return (
    <>
      <form>
        <label>nombre: </label>{" "}
        <input
          name="name"
          onChange={(ev) => setState({ ...state, name: ev.target.value })}
        />
        <label>description: </label>{" "}
        <input
          name="content"
          onChange={(ev) => setState({ ...state, content: ev.target.value })}
        />
        <button onClick={(ev) => updateNote(ev)}>Save </button>
      </form>
    </>
  );
};

export default Update;
