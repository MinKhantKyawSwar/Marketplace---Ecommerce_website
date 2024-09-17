import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { UserIcon } from "@heroicons/react/24/solid";

const Nav = () => {
  const { user } = useSelector((state) => state.reducer.user);
  
  return (
    <nav className="text-blue-600 flex items-center justify-between py-4  rounded-sm">
      <Link to={"/"} className="font-bold text-4xl">
        TradeHub
      </Link>
      <div className="flex items-center gap-3">
        <Link to={"/about"}>About</Link>
        <Link to={"/contact"}>Contact</Link>
        <Link to={"/frequently-asked"}>F&Q</Link>
      </div>
      {user ? (
        <>
          {
            user.role === "user" && (
              <div className="flex items-center gap-3 text-base font-medium">
              <Link to={"/profile"} className="flex items-end gap-1 rounded-md">
                <UserIcon width={26} />
                Profile
              </Link>
            </div>
            )
          }
          {
            user.role === "admin" && (
              <div className="flex items-center gap-3 text-base font-medium">
              <Link to={"/admin"} className="flex items-end gap-1 rounded-md">
                <UserIcon width={26} />
                Admin Panel
              </Link>
            </div>
            )
          }
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
