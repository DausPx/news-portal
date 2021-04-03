import React from 'react'


export type HomeProps = {
    children?: never,
}
const Home = (props:HomeProps): JSX.Element =>{
    return (
    <div className="w-auto max-w-full h-full min-h-full bg-gray-800 m-2">
        Main
    </div>)
}
export default Home;