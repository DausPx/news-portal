import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { appState } from "../reducers";

export type ArticlePageProps = {
  children?: never;
};
const SearchArticlePage = (props: ArticlePageProps): JSX.Element => {
  const article = useSelector(
    (state: appState) => state.searchResultModule.activeArticle
  );
  const history = useHistory();

  useEffect(() => {
    if (!article) {
      history.replace("/search");
    }
  }, [article, history]);

  return (
    <div className="w-full h-auto bg-gray-800">
      {article && (
        <div>
          <p>{article.title}</p>
          <p>{article.author}</p>
          <p>{article.description}</p>
          <p>{article.url}</p>
          <p>{article.urlToImage}</p>
          <p>{article.publishedAt}</p>
        </div>
      )}
    </div>
  );
};
export default SearchArticlePage;
