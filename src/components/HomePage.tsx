import React from "react";
import useTopHeadlines from "../hooks/useTopHeadlines";
import { useDispatch } from "react-redux";
import { addPage } from "../actions/headlines";
import { Link } from "react-router-dom";

export type HomePageProps = {
  children?: never;
};
const HomePage = (props: HomePageProps): JSX.Element => {
  const [loading, articles, fetchedAll] = useTopHeadlines();
  const dispatch = useDispatch();

  const loadMoreArticles = () => {
    dispatch(addPage());
  };

  return (
    <div className="w-auto max-w-full h-full min-h-full bg-gray-800 m-2">
      {articles.length !== 0 &&
        articles.map((article, index) => {
          return (
            <div key={index} className="flex w-full h-12 my-2">
              <p>{article.title}</p>
              <Link to={`/article/${index}`} className="mx-2">
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
export default HomePage;
