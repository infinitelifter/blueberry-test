import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Routes } from "./Routes";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Routes />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
