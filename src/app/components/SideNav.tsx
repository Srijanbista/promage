"use client";
import { useState, useEffect } from "react";
import {
  ChevronDoubleLeftIcon,
  ClipboardDocumentListIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import {
  Squares2X2Icon as Squares2X2IconSolid,
  ClipboardDocumentListIcon as ClipboardDocumentListIconSolid,
} from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Modal } from "./Modal";
import CreatProjectForm from "./CreatProjectForm";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDesktopView, setIsDesktopView] = useState(true);
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] =
    useState(false);

  const sideNavItems = [
    {
      id: 1,
      name: "Dashboard",
      icon: <Squares2X2Icon className="w-6 h-6" />,
      iconSelected: <Squares2X2IconSolid className="w-6 h-6" />,
      path: "/",
      isActive: true,
    },
    {
      id: 2,
      name: "Projects",
      icon: <ClipboardDocumentListIcon className="w-6 h-6" />,
      iconSelected: <ClipboardDocumentListIconSolid className="w-6 h-6" />,
      path: "/project",
      isActive: true,
    },
  ];
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      screenWidth > 768 && setIsDesktopView(true);
      screenWidth <= 768 && setIsCollapsed(true);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const hiddenStyle =
    isDesktopView && isCollapsed
      ? "group-hover/aside:inline-flex group-hover/aside:opacity-100 opacity-0"
      : "opacity-100";
  return (
    <aside
      className={` ${
        !isDesktopView && (isCollapsed ? "w-60 -translate-x-60" : "w-60 left-0")
      } bg-black text-white absolute h-screen z-50 lg:relative border-r border-neutral-200 py-6 px-6 transition-transform duration-500 ease-in-out`}
    >
      <Modal
        isModalOpen={isCreateProjectModalOpen}
        setIsModalOpen={setIsCreateProjectModalOpen}
      >
        <CreatProjectForm
          setIsCreateProjectModalOpen={setIsCreateProjectModalOpen}
        />
      </Modal>
      <ChevronDoubleLeftIcon
        strokeWidth={2}
        className={`absolute -right-[1.125rem] top-20 bg-white border border-neutral-200 text-neutral-800 rounded-full hover:bg-primary-100 hover:text-primary-700 hover:shadow-sm p-2 w-9 transition-transform duration-500 ease-in-out cursor-pointer ${
          isCollapsed ? "-rotate-180" : ""
        }`}
        onClick={() => setIsCollapsed(!isCollapsed)}
      />
      <div
        className={`px-2.5 transition-all duration-500 ease-in-out flex flex-col shrink-0 h-full ${
          isDesktopView && (isCollapsed ? "w-16 group/aside" : "w-52")
        }`}
      >
        <div className="mb-20 flex gap-x-2 items-center justify-between">
          <Image
            src={"/logo.svg"}
            height={40}
            width={40}
            alt="logo"
            className="text-red-500 bg-white p-2 rounded-full"
            color="white"
          />
          <span
            className={` text-lg font-medium overflow-hidden transition-opacity duration-200${
              isDesktopView && isCollapsed
                ? "group-hover/aside:inline-flex group-hover/aside:opacity-100 duration-500 opacity-0"
                : "opacity-100"
            }`}
          >
            Promage
          </span>
        </div>
        <div className="pt-12 overflow-y-auto overflow-x-hidden scrollbar-track-primary-200 scrollbar-track-rounded-lg scrollbar-thumb-primary-700 scrollbar-thumb-rounded-lg scrollbar-thin scrollbar-h-5">
          <button
            onClick={() => {
              !isDesktopView && setIsCollapsed(true);
              setIsCreateProjectModalOpen(true);
            }}
            className={`flex p-2.5 gap-2 ${
              isCollapsed ? "text-orange-500 " : "text-white"
            }  transition-colors bg-orange-500 duration-200 ease-in-out  rounded-3xl items-center w-full cursor-pointer mb-10`}
          >
            <div className="w-6 h-6">
              <PlusIcon className="w-6 h-6 text-white bg-orange-500 rounded-full" />
            </div>
            <span
              className={`text-base font-medium overflow-hidden transition-opacity duration-200 ${hiddenStyle}`}
            >
              Create
            </span>
          </button>
          {sideNavItems.map(
            (item) =>
              item.isActive && (
                <SideNavItem
                  key={item.id}
                  item={item}
                  // pathName={pathname}
                  isDesktopView={isDesktopView}
                  isCollapsed={isCollapsed}
                  setIsCollapsed={setIsCollapsed}
                />
              )
          )}
        </div>
      </div>
    </aside>
  );
}

export const SideNavItem: React.FC<SideNavItemProps> = ({
  item,
  isDesktopView,
  isCollapsed,
  setIsCollapsed,
}) => {
  const pathName = usePathname();
  const navigateToLink = useNavigateToLink();

  const itemClass = isCurrent(pathName, item.path)
    ? "bg-white text-orange-500 rounded-3xl"
    : "text-white";
  const hiddenStyle =
    isDesktopView && isCollapsed
      ? "group-hover/aside:inline-flex group-hover/aside:opacity-100 opacity-0"
      : "opacity-100";

  return (
    <button
      onClick={() => {
        !isDesktopView && setIsCollapsed(true);
        navigateToLink(item.path, true);
      }}
      onKeyDown={(e) => {
        if (e.key == "Enter") {
          navigateToLink(item.path, true);
        }
      }}
      className={`flex items-center w-full gap-2 p-2.5 cursor-pointer  rounded mb-6 ${itemClass}`}
    >
      <div className="w-6 h-6">
        {isCurrent(pathName, item.path)
          ? item.iconSelected ?? item.icon
          : item.icon}
      </div>
      <span
        className={`text-base font-medium overflow-hidden transition-opacity duration-200 ${hiddenStyle}`}
      >
        {item.name}
      </span>
    </button>
  );
};

interface SubMenu {
  id: number;
  name: string;
  icon: React.ReactNode;
  iconSelected?: React.ReactNode;
  path: string;
  isActive: boolean;
}

interface SideNavItemType {
  id: number;
  name: string;
  icon: React.ReactNode;
  iconSelected?: React.ReactNode;
  path: string;
  isActive: boolean;
  hasSubMenu?: boolean;
  subMenu?: SubMenu[];
}

interface SideNavItemProps {
  item: SideNavItemType;
  isDesktopView: boolean;
  isCollapsed: boolean;
  setIsCollapsed: CallableFunction;
}

const isCurrent = (pathName: string, path: string) => {
  if (path === "/") {
    return pathName === path;
  }
  return pathName === path || pathName.startsWith(path + "/");
};

export const useNavigateToLink = () => {
  const router = useRouter();
  const navigateToLink = (link: string, refresh: boolean = false) => {
    refresh && router.refresh();
    router.push(link);
  };
  return navigateToLink;
};
