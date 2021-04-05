import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getSearchArticles,
  LoadNextPage,
  setActiveArticle,
} from "../actions/search";
import { appState } from "../reducers";
import { IArticle } from "../reducers/topHeadlines";

export type SearchPageProps = {
  children?: never;
};
const SearchPage = (props: SearchPageProps): JSX.Element => {
  const articles = useSelector(
    (state: appState) => state.searchResult.articles
  );
  const query = useSelector((state: appState) => state.searchResult.query);
  const sortBy = useSelector((state: appState) => state.searchResult.sortBy);
  const fetchedAll = useSelector(
    (state: appState) => state.searchResult.fetchedAll
  );
  const loading = useSelector((state: appState) => state.searchResult.loading);
  const page = useSelector((state: appState) => state.searchResult.page);
  const history = useHistory();
  const dispatch = useDispatch();

  const loadMoreArticles = () => {
    dispatch(LoadNextPage(query, sortBy, page));
  };

  const goToArticlePage = (article: IArticle) => {
    dispatch(setActiveArticle(article));
    history.push("/search/article");
  };

  useEffect(() => {
    dispatch(getSearchArticles(query, sortBy));
  }, [query, sortBy, dispatch]);

  return (
    <div className="w-full h-auto bg-gray-800">
      {articles.length === 0 && (
        <p>No Result for your search. Please search again.</p>
      )}
      {articles.length !== 0 &&
        articles.map((article, index) => {
          return (
            <div key={index} className="flex w-full h-12 my-2">
              <p>{article.title}</p>
              <button
                className="px-2"
                onClick={() => {
                  goToArticlePage(article);
                }}
              >
                READ FULL ARTICLE
              </button>
            </div>
          );
        })}

      {loading && <p>Loading</p>}

      {articles.length !== 0 && !fetchedAll && (
        <button onClick={loadMoreArticles}>Load more</button>
      )}

      {fetchedAll && <p>There are no more articles</p>}
    </div>
  );
};
export default SearchPage;
