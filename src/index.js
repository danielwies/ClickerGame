import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ReactDOM from "react-dom";
import { StoreProvider } from "easy-peasy";

import Login from "./pages/Login";
import Game from "./pages/Game";
import store from "./store/Store";
import GlobalStyle from "./globalstyles";

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <GlobalStyle />
      <Router>
        <Redirect from="/" to="/login" />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/game">
            <Game />
          </Route>
        </Switch>
      </Router>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
