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

  const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSortBy(e.target.value));
  };

  useEffect(() => {
    dispatch(getSearchArticles(query, sortBy));
  }, [query, sortBy, dispatch]);

  return (
    <div className="w-full h-auto">
      <div className="w-full h-12 flex flex-col">
        <div className="w-full">
          <p>Sort by Section</p>
        </div>
        <div className="w-full flex">
          <div className="w-40 flex">
            <input
              type="checkbox"
              checked={sortBy === "publishedAt"}
              className="m-2"
              onChange={onCheckboxChange}
              value="publishedAt"
            />
            <p>Published date</p>
          </div>
          <div className="w-40 flex">
            <input
              type="checkbox"
              checked={sortBy === "popularity"}
              className="m-2"
              onChange={onCheckboxChange}
              value="popularity"
            />
            <p>Popularity</p>
          </div>
          <div className="w-40 flex">
            <input
              type="checkbox"
              checked={sortBy === "relevancy"}
              className="m-2"
              onChange={onCheckboxChange}
              value="relevancy"
            />
            <p>Relevance</p>
          </div>
        </div>
      </div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
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
