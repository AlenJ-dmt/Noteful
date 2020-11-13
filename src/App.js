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
import config from "./config";
import AddNote from "./components/AddNote";
import AddFolder from "./components/AddFolder";
import Update from "./update/Update"
import LandingPage from './LandingPage/LandingPage'

class App extends React.Component {
  state = {
    folders: [],
    notes: [],
    fetchError: false,
    key: ''
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    fetch(`${config.API_ENDPOINT}/folders`)
      .then((response) => {
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          return;
        }
        response
          .json()
          .then((jsonResponse) => this.setState({ folders: jsonResponse }));
      })
      .catch((err) => this.setState({ fetchError: true }));

    fetch(`${config.API_ENDPOINT}/notes`)
      .then((response) => {
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          return;
        }
        response
          .json()
          .then((jsonResponse) => this.setState({ notes: jsonResponse }));
      })
      .catch((err) => this.setState({ fetchError: true }));
  };

  handleDeleteNote = (noteId) => {
    this.setState({
      notes: this.state.notes.filter((note) => String(note.id) !== noteId),
    });
  };

  handleCreateNewFolder = () => {
    fetch(`${config.API_ENDPOINT}/folders`)
      .then((response) => response.json())
      .then((jsonResponse) =>
        this.setState({
          folders: jsonResponse,
        })
      );
  };

  handleCreateNewNote = () => {
    fetch(`${config.API_ENDPOINT}/notes`)
      .then((response) => response.json())
      .then((jsonResponse) =>
        this.setState({
          notes: jsonResponse,
        })
      );
  }

  setKey = (userKey) => {
    this.setState({
      key: userKey
    })
  }

  render() {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote,
      isCreatingNewFolder: this.state.isCreatingNewFolder,
      handleCreateNewFolder: this.handleCreateNewFolder,
      fetchError: this.state.fetchError,
      handleCreateNewNote: this.handleCreateNewNote,
      key: this.state.key,
      setUserKey: this.setKey
    };
    return (
      <div className="App">
        <ErrorBoundary>
          <NoteContext.Provider value={value}>
            {/* <Header /> */}
            <Switch>
              
              { window.localStorage.getItem('auth') !== 'AlenDiaz' ?
                <Route
                  exact
                  path="/login"
                  render={() => <LandingPage />}
                />
                : (

                  <Route
                    exact
                    path="/note/:noteId"
                    render={(props) => (
                      <Details
                        {...props}
                      // noteId={window.location.pathname.substring(6)}
                      />
                    )}
                  />)}
              <Route exact path="/" render={(props) => <Main {...props} />} />
              <Route
                exact
                path="/folder/:folderId"
                // render={() => <Folders folders={this.state.Store.folders} />}
                render={(props) => <Main {...props} />}
              />
              <Route
                exact
                path="/addNote"
                render={(props) => <AddNote {...props} />}
              />
              <Route
                exact
                path="/addFolder"
                render={(props) => <AddFolder {...props} />}
              />
              <Route
                exact
                path='/update'
                render={(props) => <Update {...props} />}
              />
              <Route component={NotFoundPage} />
            </Switch>
          </NoteContext.Provider>
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
