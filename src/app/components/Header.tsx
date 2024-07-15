"use client";

import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  // handles logout behaviour
  const handleLogOut = () => {
    localStorage.removeItem("user:token");
    router.push("/login");
  };

  return (
    <div className="border-b border-white backdrop-blur-sm py-3 px-3 lg:py-6 p lg:px-6 flex justify-between bg-[#EBDFD7]">
      <h1 className="text-black font-medium text-3xl lg:text-3xl">Dashboard</h1>
      <button onClick={handleLogOut}>Log Out</button>
    </div>
  );
};

export default Header;
