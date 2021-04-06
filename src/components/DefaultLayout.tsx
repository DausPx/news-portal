import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { setSearchQuery } from "../actions/search";

export type DefaultLayoutProps = {
  children: React.ReactNode;
};
const DefaultLayout = (props: DefaultLayoutProps): JSX.Element => {
  const [searchText, setSearchText] = useState<string>("");
  const dispatch = useDispatch();
  const history = useHistory();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && searchText !== "") {
      dispatch(setSearchQuery(searchText));
      history.push(`/search`);
    }
  };

  const onSearch = () => {
    if (searchText !== "") {
      dispatch(setSearchQuery(searchText));
      history.push(`/search`);
    }
  };

  return (
    <div className="w-full">
      <header className="bg-blue-500 text-gray-600 body-font sticky">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <nav className="flex md:w-2/5 flex-wrap items-center text-base md:ml-auto">
            <NavLink className="mr-5 font-bold hover:text-gray-900" to="/">
              Home
            </NavLink>
          </nav>
          <div className="md:w-3/5 inline-flex flex-col md:flex-row md:justify-start ml-5 md:ml-0">
            <input
              placeholder="type to search"
              type="text"
              value={searchText}
              onChange={onChange}
              onKeyDown={onKeyDown}
              className="inline-flex border-0 py-1 px-3 rounded text-base mt-4 md:mr-2 md:mt-0"
            />
            <button
              className="flex justify-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
              onClick={onSearch}
            >
              Search
            </button>
          </div>
        </div>
      </header>
      {/* <div className="flex w-full h-12 bg-green-500">
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
        <button className="w-24 h-full mx-2 bg-gray-800" onClick={onSearch}>
          Search
        </button>
      </div> */}
      <div className="w-full">{props.children}</div>
    </div>
  );
};
export default DefaultLayout;
