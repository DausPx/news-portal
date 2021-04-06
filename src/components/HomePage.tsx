import React from "react";
import useTopHeadlines from "../hooks/useTopHeadlines";
import { useDispatch } from "react-redux";
import { addPage } from "../actions/headlines";
import ArtilceBox from "./ArticleBox";

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
    <div className="w-auto max-w-full h-full min-h-full">
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {articles.length !== 0 &&
              articles.map((article, index) => {
                return (
                  <ArtilceBox key={index} article={article} index={index} />
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
export default HomePage;
