import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getSearchArticles, LoadNextPage } from "../actions/search";
import { appState } from "../reducers";

export type SearchPageProps = {
  children?: never;
};
const SearchPage = (props: SearchPageProps): JSX.Element => {
  const articles = useSelector(
    (state: appState) => state.searchResultModule.articles
  );
  const query = useSelector(
    (state: appState) => state.searchResultModule.query
  );
  const sortBy = useSelector(
    (state: appState) => state.searchResultModule.sortBy
  );
  const fetchedAll = useSelector(
    (state: appState) => state.searchResultModule.fetchedAll
  );
  const loading = useSelector(
    (state: appState) => state.searchResultModule.loading
  );
  
  const page = useSelector((state: appState) => state.searchResultModule.page);
  const dispatch = useDispatch();

  const loadMoreArticles = () => {
    dispatch(LoadNextPage(query, sortBy, page));
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
              <Link to={`/searchArticle`} className="mx-2">
                READ FULL ARTICLE
              </Link>
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
