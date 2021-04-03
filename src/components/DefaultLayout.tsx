import React from "react";
import { NavLink } from "react-router-dom";

export type DefaultLayoutProps = {
  children: React.ReactNode;
};
const DefaultLayout = (props: DefaultLayoutProps): JSX.Element => {
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
          className="w-24 h-full mx-2"
        />
        <button className="w-24 h-full mx-2 bg-gray-800">Search</button>
      </div>
      <div className="w-full bg-gray-500">
        {props.children}
      </div>
    </div>
  );
};
export default DefaultLayout;
