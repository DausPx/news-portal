import React from 'react'


export type SearchPageProps = {
    children?: never,
}
const SearchPage = (props:SearchPageProps): JSX.Element =>{
    return (
    <div className="w-full h-auto bg-gray-800">
        Search
    </div>)
}
export default SearchPage;