"use client";

import {
  ArrowLeftStartOnRectangleIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  // handles logout behaviour
  const handleLogOut = () => {
    localStorage.removeItem("user:token");
    router.push("/login");
  };
  const pathName = usePathname();
  return (
    <div className="border-b border-neutral-400 backdrop-blur-sm py-2 lg:py-4 p px-6 lg:px-12 flex items-center justify-between bg-[#F0C274]/30">
      <h1 className="text-black font-medium text-xl lg:text-3xl capitalize">
        {pathName == "/" ? "Dashboard" : pathName.split("/")[1]}
      </h1>
      <div className="flex gap-x-5 items-center">
        <input
          type="text"
          className="w-[300px] text-sm px-8 py-4 rounded-3xl hidden lg:block"
          placeholder="Search anything...."
        />
        <div className="p-2 bg-white rounded-full hidden lg:flex justify-center items-center">
          <BellIcon className="w-6 h-6 text-black cursor-pointer" />
        </div>

        <button className="bg-white pl-2 py-2 pr-4 rounded-2xl flex gap-x-2 lg:gap-x-4 items-center">
          <Image src="/avatar.svg" height={40} width={40} alt="logo" />
          <div className="text-left hidden lg:block">
            <p className="text-xs">
              {localStorage.getItem("user:name") ?? "User Name"}
            </p>
          </div>
          <ArrowLeftStartOnRectangleIcon
            title="Logout"
            className="w-4 h-4 hover:text-red-500 lg:w-6 lg:h-6 rotate-180"
            onClick={handleLogOut}
          />
        </button>
      </div>
    </div>
  );
};

export default Header;
