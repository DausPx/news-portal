import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { appState } from "../reducers";
import { IArticle } from "../reducers/topHeadlines";

export type ArticlePageProps = {
  children?: never;
};
const ArticlePage = (props: ArticlePageProps): JSX.Element => {
  const { articleId } = useParams<Record<string, string | undefined>>();
  const articles = useSelector(
    (state: appState) => state.topHeadlinesModule.articles
  );
  const [article, setArticle] = useState<IArticle | undefined>();

  useEffect(() => {
    setArticle(articles.filter((item, index) => `${index}` === articleId)[0]);
  }, [articles, articleId]);

  return (
    <div className="w-full h-auto bg-gray-800">
        {article && (<div>
        <p>{article.title}</p>
        <p>{article.author}</p>
        <p>{article.description}</p>
        <p>{article.url}</p>
        <p>{article.urlToImage}</p>
        <p>{article.publishedAt}</p>
        </div>)}
        </div>
  );
};
export default ArticlePage;
