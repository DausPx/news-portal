import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getSearchArticles,
  LoadNextPage,
  setActiveArticle,
  setSortBy,
} from "../actions/search";
import { appState } from "../reducers";
import { IArticle } from "../reducers/topHeadlines";
import ArtilceBox from "./ArticleBox";

export type SearchPageProps = {
  children?: never;
};

const SearchPage = (props: SearchPageProps): JSX.Element => {
  const articles = useSelector((state: appState) => state.searchResult.articles);
  const query = useSelector((state: appState) => state.searchResult.query);
  const sortBy = useSelector((state: appState) => state.searchResult.sortBy);
  const fetchedAll = useSelector((state: appState) => state.searchResult.fetchedAll);
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

  const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSortBy(e.target.value));
  };

  useEffect(() => {
    dispatch(getSearchArticles(query, sortBy));
  }, [query, sortBy, dispatch]);

  return (
    <div className="w-full h-auto">
      <section className="text-gray-600 body-font">
        <div className="w-full flex flex-col justify-center items-center pt-20">
          <label className="inline-flex items-center mt-3">
            Sort by section
          </label>
          <div className="flex flex-col md:flex-row mt-2">
            <label className="inline-flex items-center my-1 md:mx-3 md:my-0">
              <input
                type="checkbox"
                checked= {sortBy === "publishedAt"}
                className="form-checkbox h-5 w-5 text-gray-600"
                value="publishedAt"
                onChange={onCheckboxChange}
              />
              <span className="ml-2 text-gray-700">Published date</span>
            </label>
            <label className="inline-flex items-center my-1 md:mx-3 md:my-0">
              <input
                type="checkbox"
                checked={sortBy === "popularity"}
                className="form-checkbox h-5 w-5 text-gray-600"
                value="popularity"
                onChange={onCheckboxChange}
              />
              <span className="ml-2 text-gray-700">Popularity</span>
            </label>
            <label className="inline-flex items-center my-1 md:mx-3 md:my-0">
              <input
                type="checkbox"
                checked={sortBy === "relevancy"}
                className="form-checkbox h-5 w-5 text-gray-600"
                value="relevancy"
                onChange={onCheckboxChange}
              />
              <span className="ml-2 text-gray-700">Relevance</span>
            </label>
          </div>
        </div>
        <div className="container px-5 pb-24 pt-10 mx-auto">
          <div className="flex flex-wrap -m-4">
            {articles.length !== 0 &&
              articles.map((article, index) => {
                return (
                  <ArtilceBox
                    key={index}
                    article={article}
                    index={index}
                    goToArticle={goToArticlePage}
                  />
                );
              })}
          </div>
          <div className="text-center mt-2 leading-none flex flex-col justify-center content-center w-full py-4">
            {loading && <p>Loading</p>}
            {articles.length !== 0 && !fetchedAll && (
              <button
                className="flex mx-auto mt-16 text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg"
                onClick={loadMoreArticles}
              >
                Load more
              </button>
            )}

            {fetchedAll && <p>There are no more articles</p>}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SearchPage;
