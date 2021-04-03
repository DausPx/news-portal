import React from "react";
import "./App.css";
import { Switch, Route } from "react-router";
import Home from "./components/Home";
import Article from "./components/Article";
import Search from "./components/Search";
import DefaultLayout from "./components/DefaultLayout";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <DefaultLayout>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/article/:artileId">
            <Article />
          </Route>
          <Route exact path="/search/:searchText">
            <Search />
          </Route>
        </Switch>
      </DefaultLayout>
    </BrowserRouter>
  );
}

export default App;
