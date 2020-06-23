import React from "react";
import "./App.css";
import Main from "./Main/Main";
import Folders from "./Folder/Folders";
import Notes from "./Notes/Notes";
import NotFoundPage from "./NotFoundPage/NotFoundPage";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Store from "./Store";
import Note from "./components/Note";
import Details from './Details/Details'

class App extends React.Component {
  state = {
    Store: Store,
  };
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route
            exact path="/"
            render={(props) => (
              <Main
                {...props}
                folders={this.state.Store.folders}
                notes={this.state.Store.notes}
              />
            )}
          />
          <Route
            exact path="/folder/:folderId"
            // render={() => <Folders folders={this.state.Store.folders} />}
            render={(props) => (
              <Main
                {...props}
                folders={this.state.Store.folders}
                notes={this.state.Store.notes}
                folderId={window.location.pathname.substring(8)}
              />
            )}
          />
          <Route
            exact path="/note/:noteId"
            render={(props) => (
            <Details 
            {...props}
            noteId={window.location.pathname.substring(6)}
            notes={this.state.Store.notes} 
            folders={this.state.Store.folders}
            />)}
          />
          {/* <div className="note"> */}
          {/* </div> */}
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
