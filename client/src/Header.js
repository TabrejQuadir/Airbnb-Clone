import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext.js";
import travel from "./travelling.png"

export default function Header() {
  const { user } = useContext(UserContext);
  return (
    <header className="flex justify-between mt-4 pb-4 border-b border-gray-500">
      <Link to={'/'} className="flex items-center gap-1 text-red-500">
       <img src={travel} alt="/" className="size-10 hover:rotate-90 "/>
        <span className="font-bold text-2xl">JetSetGo</span>
      </Link>
      <div className="flex gap-3 border border-gray-800 rounded-full py-2 px-7 shadow-md shadow-gray-500 cursor-pointer bg-white">
        <div className="font-semibold mt-1.5">Anywhere</div>
        <div className="border-l-2 border-gray-300"></div>
        <div className="font-semibold mt-1.5">Any week</div>
        <div className="border-l border-gray-400"></div>
        <div className="text-gray-600 mt-1.5">Add guests</div>
        <button className="bg-primary text-white p-3 rounded-full items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </button>
      </div>

      <Link to={user ? '/account' : '/login'} className="flex items-center gap-2 border border-gray-500 rounded-full py-2 px-4 ">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
        <div className="bg-gray-700 text-white rounded-full border border-gray-500 overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative top-1">
            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
          </svg>
        </div>
        {!!user && (
          <div className="text-violet-500 font-bold">
            {user.name}
          </div>
        )}
      </Link>
    </header>
  );
}