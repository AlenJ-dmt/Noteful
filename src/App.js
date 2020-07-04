import React from "react";
import "./App.css";
import Main from "./Main/Main";
import NotFoundPage from "./NotFoundPage/NotFoundPage";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header";
// import { Store } from "./Store";
import Details from "./Details/Details";
import NoteContext from "./NoteContext";

class App extends React.Component {
  state = {
    folders: [],
    notes: [],
  };

  componentDidMount() {
    fetch("http://localhost:9090/folders")
      .then((response) => response.json())
      .then((jsonResponse) =>
        this.setState(
          {
            folders: jsonResponse,
          }
        )
      );
    fetch("http://localhost:9090/notes")
      .then((response) => response.json())
      .then((jsonResponse) =>
        this.setState(
          {
            notes: jsonResponse,
          }
        )
      );
  }

  handleDeleteNote = (noteId) => {
    console.log('hello')
    this.setState({
      notes: this.state.notes.filter((note) => note.id !== noteId),
    });
  };

  render() {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote,
    };
    return (
      <div className="App">
        <NoteContext.Provider value={value}>
          <Header />
          <Switch>
            <Route exact path="/" render={(props) => <Main {...props} />} />
            <Route
              exact
              path="/folder/:folderId"
              // render={() => <Folders folders={this.state.Store.folders} />}
              render={(props) => (
                <Main
                  {...props}
                  folderId={window.location.pathname.substring(8)}
                />
              )}
            />
            <Route
              exact
              path="/note/:noteId"
              render={(props) => (
                <Details
                  {...props}
                  noteId={window.location.pathname.substring(6)}
                />
              )}
            />
            {/* <div className="note"> */}
            {/* </div> */}
            <Route component={NotFoundPage} />
          </Switch>
        </NoteContext.Provider>
      </div>
    );
  }
}

export default App;
