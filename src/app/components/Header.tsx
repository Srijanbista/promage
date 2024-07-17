"use client";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  // handles logout behaviour
  const handleLogOut = () => {
    localStorage.removeItem("user:token");
    router.push("/login");
  };

  return (
    <div className="border-b border-white backdrop-blur-sm py-2 px-3 lg:py-4 p lg:px-6 flex items-center justify-between bg-[#F0C274]/30">
      <h1 className="text-black font-medium text-3xl lg:text-3xl">Dashboard</h1>
      <div className="flex gap-x-5 items-center">
        <input
          type="text"
          className="w-[300px] text-sm px-8 py-4 rounded-3xl hidden lg:block"
          placeholder="Search anything...."
        />
        <div className="h-14 w-14 bg-white rounded-full hidden lg:block"></div>

        <button className="bg-white pl-2 py-2 pr-4 rounded-2xl flex gap-x-4 items-center">
          <div className="h-10 w-10 bg-black rounded-full "></div>
          <div className="text-left hidden lg:block">
            <p className="text-xs">User Name</p>
            <p className="text-[10px] text-slate-400">Product Manager</p>
          </div>
          <ChevronDownIcon className="w-4 h-4" />
        </button>
      </div>
      <button onClick={handleLogOut}>Log Out</button>
    </div>
  );
};

export default Header;
