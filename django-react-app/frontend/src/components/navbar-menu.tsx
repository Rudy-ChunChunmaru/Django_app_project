import { useState } from "react";
import { routeListType, routeList } from "./../data/routes-list";
import { useNavigate } from "react-router-dom";

type Props = {
  idMenus: number[];
};

const NavbarMenu = ({ idMenus }: Props) => {
  const LoopingAuthMenu = (menuList = routeList) => {
    let authMenu: routeListType[] = [];
    menuList.forEach((value: routeListType) => {
      if (idMenus.includes(value.id)) {
        if (value?.children)
          authMenu.push({
            ...value,
            children: LoopingAuthMenu(value.children),
          });
        else authMenu.push(value);
      }
    });

    return authMenu;
  };

  const LoopingViewMenu = ({
    menuID,
    menuAuthList,
    isMenuBase,
    routerMap
  }: {
    menuID:number,
    menuAuthList: routeListType[];
    isMenuBase: boolean;
    routerMap:string;
  }) => {
    const ViewMenuList = () => {
      return menuAuthList.map((val,key) => {
        if (val.children)
          return (
            <div
              key={key}
              id={`Menu-${key}`}
              className="relative group grid grid-cols-1 w-fit h-fit gap-1 px-2 border-2 rounded-md 
              border-gray-300 bg-gray-200
              dark:border-gray-500 dark:bg-gray-700"
            >
              <div 
              id={`head_menu-${val.id}`}
              className="w-full text-center group-hover:border-b-2
              border-gray-300
              dark:border-gray-500"
              >
                <strong>{val.routeTitle}</strong>
              </div>
              <div 
              id={`ex_sub_menu-${val.id}`}
              className="relative left-1 hidden px-1 group-hover:flex group-hover:flex-col
              border-gray-300 bg-gray-200
              dark:border-gray-500 dark:bg-gray-700"
              >
                <LoopingViewMenu
                  menuID={val.id}
                  menuAuthList={val.children}
                  isMenuBase={false}
                  routerMap={`${routerMap}/${val.routeMenu}`}
                />
              </div>
            </div>
          );
        else return (
          <div
          key={key}
          id={`sub_menu-${val.id}`}
          className="relative border-t-2 border-x-2 px-2 rounded-md hover:cursor-pointer
          border-2 border-gray-300 bg-gray-200 hover:bg-gray-300 
          dark:border-gray-500 dark:bg-gray-700 dark:hover:bg-gray-500"
          onClick={()=>navigate(`${routerMap}/${val.routeMenu}`)}
          >
            {val.routeTitle}
          </div>
        );
      });
    };
    if (isMenuBase) return (
      <div key={menuID} id={`EXMenuID-${menuID}`} className="flex w-full gap-2">
        {<ViewMenuList />}
      </div>
    );
    else return (
      <div key={menuID} id={`EXMenuID-${menuID}`} className="flex flex-col">
        {<ViewMenuList />}
      </div>
    );
  };

  const [menu] = useState<routeListType[]>(LoopingAuthMenu());
  const navigate = useNavigate();
  return (
    <div id='navbar-menu' className="w-full">
      {menu && <LoopingViewMenu menuID={0} menuAuthList={menu} isMenuBase={true} routerMap='/apps'/>}
    </div>
  );
};

export default NavbarMenu;
