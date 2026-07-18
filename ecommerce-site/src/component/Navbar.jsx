import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

import { MapPin } from "lucide-react";
import { IoCartOutline } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-white shadow-md py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between">

        {/* Left */}
        <div className="flex items-center gap-8">
          <Link to="/">
            <h1 className="text-3xl font-bold">
              <span className="text-red-500 font-serif">Z</span>aptro
            </h1>
          </Link>

          <div className="flex items-center gap-1 cursor-pointer">
            <MapPin size={20} className="text-red-500" />
            <span className="font-semibold text-gray-700">
              Add Address
            </span>
          </div>
        </div>

        {/* Right */}
        <nav className="flex items-center gap-8">

          <ul className="flex items-center gap-8 font-medium">

            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `pb-1 border-b-2 transition-all duration-300 ${
                    isActive
                      ? "border-red-500 text-red-500"
                      : "border-transparent hover:text-red-500"
                  }`
                }
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/product"
                className={({ isActive }) =>
                  `pb-1 border-b-2 transition-all duration-300 ${
                    isActive
                      ? "border-red-500 text-red-500"
                      : "border-transparent hover:text-red-500"
                  }`
                }
              >
                Product
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `pb-1 border-b-2 transition-all duration-300 ${
                    isActive
                      ? "border-red-500 text-red-500"
                      : "border-transparent hover:text-red-500"
                  }`
                }
              >
                About
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `pb-1 border-b-2 transition-all duration-300 ${
                    isActive
                      ? "border-red-500 text-red-500"
                      : "border-transparent hover:text-red-500"
                  }`
                }
              >
                Contact
              </NavLink>
            </li>

          </ul>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <IoCartOutline className="w-7 h-7" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              0
            </span>
          </Link>

          {/* Authentication */}
          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 cursor-pointer">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

        </nav>

      </div>
    </div>
  );
};

export default Navbar;