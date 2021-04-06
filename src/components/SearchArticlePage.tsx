import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { appState } from "../reducers";
import { ArrowSVG } from "./ArticleBox";

export type ArticlePageProps = {
  children?: never;
};
const SearchArticlePage = (props: ArticlePageProps): JSX.Element => {
  const article = useSelector(
    (state: appState) => state.searchResult.activeArticle
  );
  const history = useHistory();

  useEffect(() => {
    if (!article) {
      history.replace("/search");
    }
  }, [article, history]);

  return (
    <div className="w-full">
      {article && (
        <div>
          <div className="text-center pt-16 md:pt-24">
            <p className="text-sm md:text-base text-blue-500 font-bold">
              {article.publishedAt}
              <span className="text-gray-900"> / </span>
              {article.source.name}
            </p>
            <h1 className="title-font font-bold break-normal text-3xl md:text-5xl text-center mt-4 mx-4 md:mx-24 lg:mx-32">
              {article.title}
            </h1>
          </div>

          <div
            className="container w-full max-w-6xl mx-auto bg-white bg-cover mt-8 rounded"
            style={{
              backgroundImage: `url('${article.urlToImage}')`,
              height: "75vh",
            }}
          />

          <div className="container max-w-5xl mx-auto -mt-32">
            <div className="mx-0 sm:mx-6">
              <div className="bg-white w-full p-8 md:p-24 text-xl md:text-2xl text-gray-800 leading-normal title-font">
                <p className="text-2xl md:text-3xl mb-5">
                  {article.description}
                </p>

                <p className="py-6">{article.content}</p>

                <p className="py-6">Author: {article.author}</p>

                <p className="w-full flex justify-center">
                  <a
                    href={article.url}
                    className="text-blue-500 inline-flex items-center md:mb-2 lg:mb-0"
                    target="_blank"
                    rel="noreferrer"
                  >
                    READ MORE
                    <ArrowSVG />
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default SearchArticlePage;
