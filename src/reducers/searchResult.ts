import { actions } from "../actions/constants";
import { IArticle } from "./topHeadlines";

export interface SearchResultState {
  query: string;
  articles: IArticle[];
  activeArticle: IArticle | null;
  loading: boolean;
  fetchedAll: boolean;
  sortBy: "publishedAt" | "relevancy" | "popularity";
  pageSize: number;
  page: number;
}

const initialState: SearchResultState = {
  query: "",
  articles: [],
  activeArticle: null,
  loading: false,
  fetchedAll: false,
  sortBy: "publishedAt",
  pageSize: 20,
  page: 1,
};

const searchResult = (state = initialState, action: any) => {
  switch (action.type) {
    case actions.ADD_SEARCH_PAGE:
      return {
        ...state,
        loading: false,
        articles: [...state.articles, ...action.payload],
        page: state.page + 1,
      };
    case actions.FETCHED_ALL_SEARCH:
      return {
        ...state,
        fetchedAll: true,
      };
    case actions.SET_ACTIVE_ARTICLE:
      return {
        ...state,
        activeArticle: action.payload,
      };
    case actions.ADD_SEARCH_ARTICLES:
      return {
        ...state,
        loading: false,
        articles: [...action.payload],
        fetchedAll: false,
      };
    case actions.SET_SEARCH_QUERY:
      return {
        ...state,
        query: action.payload,
      };
    case actions.SET_SORT_BY:
      return {
        ...state,
        sortBy: action.payload,
      };
    case actions.LOADING_TRUE:
      return {
        ...state,
        loading: true,
      };
    case actions.LOADING_FALSE:
      return {
        ...state,
        loading: false,
      };
    default:
      return {
        ...state,
      };
  }
};
export default searchResult;
