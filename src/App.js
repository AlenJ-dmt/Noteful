import React from "react";
import "./App.css";
import Main from "./Main/Main";
import NotFoundPage from "./NotFoundPage/NotFoundPage";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header";
// import { Store } from "./Store";
import Details from "./Details/Details";
import NoteContext from "./NoteContext";
import ErrorBoundary from "../src/components/ErrorBoundary";

class App extends React.Component {
  state = {
    folders: [],
    notes: [],
    isCreatingNewFolder: false,
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    console.log("hellots");
    fetch("http://localhost:9090/folders")
      .then((response) => response.json())
      .then((jsonResponse) =>
        this.setState(
          {
            folders: jsonResponse,
          },
          console.log(this.state.folders)
        )
      );
    fetch("http://localhost:9090/notes")
      .then((response) => response.json())
      .then((jsonResponse) =>
        this.setState({
          notes: jsonResponse,
        })
      );
  };

  handleDeleteNote = (noteId) => {
    this.setState({
      notes: this.state.notes.filter((note) => note.id !== noteId),
    });
  };

  handleCreateNewFolder = () => {
    this.fetchData();
  };

  render() {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote,
      isCreatingNewFolder: this.state.isCreatingNewFolder,
      handleCreateNewFolder: this.handleCreateNewFolder,
    };
    return (
      <div className="App">
        <ErrorBoundary>
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
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
