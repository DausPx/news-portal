import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import {setSearchQuery} from "../actions/search";

export type DefaultLayoutProps = {
  children: React.ReactNode;
};
const DefaultLayout = (props: DefaultLayoutProps): JSX.Element => {
  const [searchText, setSearchText] = useState<string>("");
  const dispatch = useDispatch();
  const history = useHistory();
  
  const onChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    setSearchText(e.target.value);
  }
  
  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && searchText !== "") {
      dispatch(setSearchQuery(searchText));
      history.push(`/search`);
    }
  };

  const onSearch = () => {
    if(searchText !== ""){
      dispatch(setSearchQuery(searchText));
      history.push(`/search`);
    }
  }

  return (
    <div className="w-full bg-gray-300">
      <div className="flex w-full h-12 bg-green-500">
        <NavLink
          activeStyle={{
            backgroundColor: "rgba(107, 114, 128, var(--tw-bg-opacity))",
          }}
          to="/"
          className="mx-2"
        >
          Home
        </NavLink>
        <input
          placeholder="To search"
          type="text"
          value={searchText}
          onChange={onChange}
          onKeyDown={onKeyDown}
          className="w-24 h-full mx-2"
        />
        <button className="w-24 h-full mx-2 bg-gray-800" onClick={onSearch}>Search</button>
      </div>
      <div className="w-full bg-gray-500">
        {props.children}
      </div>
    </div>
  );
};
export default DefaultLayout;
