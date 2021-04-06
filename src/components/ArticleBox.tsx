import React from "react";
import { Link } from "react-router-dom";
import { IArticle } from "../reducers/topHeadlines";

type ArticleBoxProps = {
  article: IArticle;
  index: number;
  goToArticle?: (article: IArticle) => void;
};

const ArtilceBox = ({
  article,
  index,
  goToArticle,
}: ArticleBoxProps): JSX.Element => {
  return (
    <div className="p-4 lg:w-1/3">
      {article.urlToImage ? (
        <div className="h-full border-2 bg-gray-100 border-gray-300 border-opacity-60 rounded-lg overflow-hidden">
          <img
            className="lg:h-48 md:h-96 w-full object-cover object-center"
            src={article.urlToImage}
            alt="news"
          />
          <div className="p-6">
            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
              {article.author}
            </h2>
            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
              {article.title}
            </h1>
            <p className="leading-relaxed mb-3">{article.description}</p>
            <div className="flex items-center flex-wrap ">
              {!goToArticle ? (
                <Link
                  className="text-blue-500 inline-flex items-center md:mb-2 lg:mb-0"
                  to={`/article/${index}`}
                >
                  READ FULL ARTICLE
                  <ArrowSVG />
                </Link>
              ) : (
                <button
                  className="text-blue-500 inline-flex items-center md:mb-2 lg:mb-0"
                  onClick={() => {
                    goToArticle(article);
                  }}
                >
                  READ FULL ARTICLE
                  <ArrowSVG />
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="h-full bg-gray-100 border-2 border-gray-300 border-opacity-60 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
          <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
            {article.author}
          </h2>
          <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
            {article.title}
          </h1>
          <p className="leading-relaxed mb-3">{article.description}</p>
          {!goToArticle ? (
            <Link
              className="text-blue-500 inline-flex items-center md:mb-2 lg:mb-0"
              to={`/article/${index}`}
            >
              READ FULL ARTICLE
              <ArrowSVG />
            </Link>
          ) : (
            <button
              className="text-blue-500 inline-flex items-center md:mb-2 lg:mb-0"
              onClick={() => {
                goToArticle(article);
              }}
            >
              READ FULL ARTICLE
              <ArrowSVG />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export const ArrowSVG = (): JSX.Element => {
  return (
    <svg
      className="w-4 h-4 ml-2"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14"></path>
      <path d="M12 5l7 7-7 7"></path>
    </svg>
  );
};

export default ArtilceBox;
