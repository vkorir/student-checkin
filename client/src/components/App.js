// Rendering layer control (React Router)
// import "../styles/App.css";
// import "../styles/custom.css";
import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header";
import Home from "./Home";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/" component={Home} />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
