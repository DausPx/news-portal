import React from 'react'


export type ArticleProps = {
    children?: never,
}
const Article = (props:ArticleProps): JSX.Element =>{
    return (
    <div className="w-full h-auto bg-gray-800">
        Article
    </div>)
}
export default Article;