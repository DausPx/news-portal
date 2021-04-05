import { actions } from "./constants";
import { Dispatch } from "redux";
import API from "../api/api";
import { IArticle } from "../reducers/topHeadlines";

export const getSearchArticles = (q: string, sortBy: string) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: actions.LOADING_TRUE });
    return API.get("everything", {
      params: {
        q: encodeURI(q),
        sortBy: sortBy,
        page: 1,
        pageSize: 20,
      },
    })
      .then((result) => {
        dispatch({
          type: actions.ADD_SEARCH_ARTICLES,
          payload: result.data.articles,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: actions.LOADING_FALSE });
      });
  };
};

export const LoadNextPage = (q: string, sortBy: string, page: number) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: actions.LOADING_TRUE });
    return API.get("everything", {
      params: {
        q: encodeURI(q),
        sortBy: sortBy,
        page: page + 1,
        pageSize: 20,
      },
    })
      .then((result) => {
        dispatch({
          type: actions.ADD_SEARCH_PAGE,
          payload: result.data.articles,
        });

        if (result.data.articles.length === 0) {
          dispatch({ type: actions.FETCHED_ALL_SEARCH });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: actions.LOADING_FALSE });
      });
  };
};

export const setSearchQuery = (query: string) => {
  return { type: actions.SET_SEARCH_QUERY, payload: query };
};

export const setActiveArticle = (article: IArticle) =>{
  return {type: actions.SET_ACTIVE_ARTICLE, payload: article}
}

export const setSortBy = (sortBy:string)=>{
  return {type: actions.SET_SORT_BY, payload:sortBy}
}