"use client";
const SideNav = () => {
  const token = localStorage.getItem("user:token");
  const handleLogOut = () => {
    localStorage.clear();
    window.location.reload();
  };
  return <div>{token && <button onClick={handleLogOut}>Log Out</button>}</div>;
};

export default SideNav;
