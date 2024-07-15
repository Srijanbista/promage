"use client";
import { useState, useEffect } from "react";
import {
  ChevronDoubleLeftIcon,
  PlusIcon,
  ClipboardDocumentListIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import { Squares2X2Icon as Squares2X2IconSolid } from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";
export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDesktopView, setIsDesktopView] = useState(true);

  const sideNavItems = [
    {
      id: 1,
      name: "Dashboard",
      icon: <Squares2X2Icon className="w-6 h-6" />,
      iconSelected: <Squares2X2IconSolid className="w-6 h-6" />,
      path: "/dashboard",
      isActive: true,
    },
    {
      id: 2,
      name: "Projects",
      icon: <ClipboardDocumentListIcon className="w-6 h-6" />,
      iconSelected: <ClipboardDocumentListIcon className="w-6 h-6" />,
      path: "/projects",
      isActive: true,
    },
  ];
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      setIsCollapsed(screenWidth <= 768);
      setIsDesktopView(screenWidth > 768);
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
      className={`bg-black absolute col-span-2 text-white z-50 lg:relative border-r border-neutral-200 py-3 px-3 lg:py-6 p lg:px-6`}
    >
      <ChevronDoubleLeftIcon
        strokeWidth={2}
        className={`absolute -right-[1.125rem] top-20 bg-white border border-neutral-200 text-neutral-800 rounded-full hover:bg-primary-100 hover:text-primary-700 hover:shadow-sm p-2 w-9 transition-transform duration-500 ease-in-out cursor-pointer ${
          isCollapsed ? "-rotate-180" : ""
        }`}
        onClick={() => setIsCollapsed(!isCollapsed)}
      />
      <div
        className={`px-2.5 transition-all duration-500 ease-in-out flex flex-col shrink-0 h-full ${
          isDesktopView &&
          (isCollapsed ? "w-16 group/aside hover:w-52" : "w-52")
        } ${
          !isDesktopView && (isCollapsed ? "w-52 -left-w-52" : "w-52 left-0")
        }`}
      >
        <div className="pt-12 overflow-y-auto overflow-x-hidden scrollbar-track-primary-200 scrollbar-track-rounded-lg scrollbar-thumb-primary-700 scrollbar-thumb-rounded-lg scrollbar-thin scrollbar-h-5">
          <div className="flex gap-x-2 mb-20 items-center">
            <span className="w-6 h-6 bg-primary rounded-full"></span>
            <span
              className={`text-3xl text-white font-medium overflow-hidden transition-opacity duration-200 ${hiddenStyle}`}
            >
              Promage
            </span>
          </div>
          <div className="p-2.5 h-11 bg-white rounded-3xl text-black w-full mb-20 flex items-center gap-x-2">
            <PlusIcon
              className={`text-white w-6 h-6 p-1 bg-orange-500 rounded-full `}
            />
            <span
              className={`text-base font-medium overflow-hidden text-wrap transition-opacity duration-200 ${
                isCollapsed && isDesktopView
                  ? "group-hover/aside:inline-flex group-hover/aside:opacity-100 opacity-0"
                  : "opacity-100"
              }`}
            >
              Create
            </span>
          </div>
          {sideNavItems.map(
            (item) =>
              item.isActive && (
                <SideNavItem
                  key={item.id}
                  item={item}
                  // pathName={pathname}
                  isDesktopView={isDesktopView}
                  isCollapsed={isCollapsed}
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
}) => {
  const pathName = usePathname();
  const navigateToLink = useNavigateToLink();

  const [isSubMenuExpanded, setIsSubMenuExpanded] = useState(false);
  const handleToggleMenuCollapse = () => {
    setIsSubMenuExpanded(!isSubMenuExpanded);
  };

  const itemClass = isCurrent(pathName, item.path)
    ? "bg-white text-orange-500 rounded-3xl"
    : "text-white";
  const hiddenStyle =
    isDesktopView && isCollapsed
      ? "group-hover/aside:inline-flex group-hover/aside:opacity-100 opacity-0"
      : "opacity-100";
  useEffect(() => {
    setIsSubMenuExpanded(isCurrent(pathName, item.path));
  }, [item.path, pathName]);

  return (
    <button
      onClick={() => navigateToLink(item.path, true)}
      onKeyDown={(e) => {
        if (e.key == "Enter") {
          navigateToLink(item.path, true);
        }
      }}
      className={`flex items-center w-full gap-2 p-2.5 cursor-pointer  rounded mb-3 lg:mb-6 ${itemClass}`}
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
}

const isCurrent = (pathName: string, path: string) => {
  return path.startsWith(pathName) || pathName.startsWith(path);
};

function getSubMenuClassNames(
  isSubMenuExpanded: boolean,
  isCollapsed: boolean
) {
  if (isSubMenuExpanded) {
    if (isCollapsed) {
      return "group-hover/aside:max-h-60 max-h-0";
    } else {
      return "max-h-60 opacity-100";
    }
  } else {
    return "max-h-0 opacity-0";
  }
}

import { useRouter } from "next/navigation";

export const useNavigateToLink = () => {
  const router = useRouter();
  const navigateToLink = (link: string, refresh: boolean = false) => {
    refresh && router.refresh();
    router.push(link);
  };
  return navigateToLink;
};
