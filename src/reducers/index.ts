import { combineReducers } from "redux";
import searchResult, { SearchResultState } from "./searchResult";
import topHeadlines, { TopHeadlinesState } from "./topHeadlines";

export interface appState {
  topHeadlines: TopHeadlinesState;
  searchResult: SearchResultState;
}

const reducers = combineReducers({
  topHeadlines: topHeadlines,
  searchResult: searchResult,
});

export default reducers;
