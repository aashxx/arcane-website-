import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const Navbar = ({ openNav, setOpenNav }) => {
  return (
    <nav
      className={`flex flex-col items-center justify-center gap-16 fixed md:absolute border-b border-b-arcane-primary ${
        openNav ? "top-0" : "top-[-150%]"
      } left-0 h-[100vh] w-full bg-black text-white font-medium tracking-wide transition-all duration-500 ease-in-out md:flex-row md:justify-between md:p-2 md:h-[unset] md:top-0 md:gap-0 z-50 md:px-10`}
    >
      <div className="md:hidden">
        <button
          className="text-4xl text-[white] absolute top-6 right-4"
          onClick={() => setOpenNav(!openNav)}
        >
          <IoCloseSharp />
        </button>
      </div>
      <div className="md:w-[150px]">
        <Link to={"/"} onClick={() => setOpenNav(!openNav)}>
          <img
            src={"/images/logo.png"}
            alt="Arcane"
            className="max-w-full max-h-full"
          />
        </Link>
      </div>
      <div className="flex flex-col items-center gap-4 md:flex-row">
        <ul className="flex flex-col items-center gap-4 font-expletus-sans px-6 py-4 rounded-xl md:flex-row md:gap-10 md:py-3 md:px-8 md:h-[55px]">
          <li className="hover:pb-2 transition-all duration-300 ease-out hover:text-[#858585]">
            <Link to="/" onClick={() => setOpenNav(!openNav)}>
              Home
            </Link>
          </li>
          <li className="hover:pb-2 transition-all duration-300 ease-out hover:text-[#858585]">
            <Link to="/events" onClick={() => setOpenNav(!openNav)}>
              Events
            </Link>
          </li>
          <li className="hover:pb-2 transition-all duration-300 ease-out hover:text-[#858585]">
            <Link to="/clubs" onClick={() => setOpenNav(!openNav)}>
              Clubs
            </Link>
          </li>
          <li className="hover:pb-2 transition-all duration-300 ease-out md:border-r md:border-r-[white] md:pr-10 hover:text-[#858585]">
            <Link to="/contact" onClick={() => setOpenNav(!openNav)}>
              Contact
            </Link>
          </li>
        </ul>
        <div className="bg-arcane-primary font-expletus-sans font-light py-2 px-8 border border-arcane-primary rounded-lg text-[white] transition-all duration-300 ease-out hover:bg-[#161616]">
            <Link to="/register" onClick={() => setOpenNav(!openNav)}>
              Register
            </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
