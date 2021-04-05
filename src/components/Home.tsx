import React from 'react'
import useTopHeadlines from '../hooks/useTopHeadlines'
import { useDispatch} from "react-redux";
import { addPage } from '../actions/headlines';


export type HomeProps = {
    children?: never,
}
const Home = (props:HomeProps): JSX.Element =>{
    const [loading , articles] = useTopHeadlines();
    const dispatch = useDispatch();

    const loadMoreArticles = () =>{
        dispatch(addPage());
    }

    return (
    <div className="w-auto max-w-full h-full min-h-full bg-gray-800 m-2">
        {loading ? <p>Loading</p>
        : (
        <>
        {articles.length !== 0 && articles.map((article, index) => {
            return <p key={index}>{article.title}</p>
        })}
         </>
         )}
         {articles.length !== 0 && (<button onClick= {loadMoreArticles}>Load more Articles</button>)}
    </div>)
}
export default Home;