import { combineReducers } from "redux";
import topHeadlines, { TopHeadlinesState } from "./topHeadlines";

export interface appState {
  topHeadlinesModule: TopHeadlinesState;
}

const reducers = combineReducers({
  topHeadlinesModule: topHeadlines,
});

export default reducers;
