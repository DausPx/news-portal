import { combineReducers } from "redux";
import searchResult, { SearchResultState } from "./searchResult";
import topHeadlines, { TopHeadlinesState } from "./topHeadlines";

export interface appState {
  topHeadlinesModule: TopHeadlinesState;
  searchResultModule: SearchResultState;
}

const reducers = combineReducers({
  topHeadlinesModule: topHeadlines,
  searchResultModule: searchResult,
});

export default reducers;
