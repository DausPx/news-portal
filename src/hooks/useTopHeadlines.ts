import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appState } from "../reducers/index";
import { addArticles } from "../actions/headlines";
import API from "../api/api";
import {IArticle} from "../reducers/topHeadlines"

const useTopHeadlines = (): [boolean, IArticle[]] => {
  const topHeadlines = useSelector(
    (state: appState) => state.topHeadlinesModule
  );
  const dispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(false);

  const getTopHeadlines = useCallback(async () => {
    try {
      const result = await API.get("top-headlines", {
        params: {
          country: topHeadlines.country,
          page: topHeadlines.page,
        },
      });
      console.log('fetched', result.data);
      return result.data.articles;
    } catch (error) {
      console.log(error);
    }
  }, [topHeadlines.country, topHeadlines.page]);

  useEffect(() => {
    if (topHeadlines.toFetch) {
      setLoading(true);
      getTopHeadlines().then((articles) => {
        dispatch(addArticles(articles));
        setLoading(false);
      });
    }
  }, [getTopHeadlines, topHeadlines.toFetch, dispatch]);
  return [loading, topHeadlines.articles];
};

export default useTopHeadlines;
