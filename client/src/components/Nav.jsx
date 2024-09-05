import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { UserIcon } from "@heroicons/react/24/solid";

const Nav = () => {
  const { userId } = useSelector((state) => state.reducer.user);

  return (
    <nav className="text-white bg-blue-500 flex items-center justify-between p-4 rounded-sm">
      <Link to={"/"} className="font-bold text-2xl">
        POINT.io
      </Link>
      {userId ? (
        <>
          <div className="flex items-center gap-3 text-base font-medium">
            <Link to={"/profile"} className="flex items-end gap-1 rounded-md">
              <UserIcon width={26} />
              Profile
            </Link>
            <Link to={"/logout"}>Logout</Link>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center gap-3 text-base font-medium">
            <Link to={"/login"}>Login</Link>
            <Link to={"/register"}>Register</Link>
          </div>
        </>
      )}
    </nav>
  );
};

export default Nav;
