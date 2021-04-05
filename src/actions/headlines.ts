import { actions } from "./constants";
import { IArticle } from "../reducers/topHeadlines";

export const addArticles = (articles: IArticle[]) => {
  return { type: actions.ADD_ARTICLES, payload: articles };
};

export const addPage = () => {
  return { type: actions.ADD_PAGE };
};

export const fetchedAll = ()=>{
  return { type: actions.FETCHED_ALL };
}
