import React from "react";
import "./App.css";
import HomePage from "./components/HomePage";
import ArticlePage from "./components/ArticlePage";
import SearchPage from "./components/SearchPage";
import DefaultLayout from "./components/DefaultLayout";
import { BrowserRouter, Switch , Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <DefaultLayout>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/article/:articleId">
            <ArticlePage />
          </Route>
          <Route exact path="/search">
            <SearchPage />
          </Route>
        </Switch>
      </DefaultLayout>
    </BrowserRouter>
  );
}

export default App;
