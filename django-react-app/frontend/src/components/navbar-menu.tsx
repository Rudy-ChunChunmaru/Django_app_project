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
    menuAuthList,
    isMenuBase,
    routerMap
  }: {
    menuAuthList: routeListType[];
    isMenuBase: boolean;
    routerMap:string;
  }) => {
    const ViewMenuList = () => {
      return menuAuthList.map((val) => {
        if (val.children)
          return (
            <div className="relative group grid grid-cols-1 w-fit h-fit gap-1 px-2 border-2 rounded-md 
              border-gray-300 bg-gray-200
              dark:border-gray-500 dark:bg-gray-700
            ">
              <div className="w-full text-center group-hover:border-b-2
              border-gray-300
              dark:border-gray-500
              ">
                <strong>{val.routeTitle}</strong>
              </div>
              <div className="relative left-1 hidden px-1 group-hover:flex group-hover:flex-col
              border-gray-300 bg-gray-200
              dark:border-gray-500 dark:bg-gray-700
              ">
                <LoopingViewMenu
                  menuAuthList={val.children}
                  isMenuBase={false}
                  routerMap={`${routerMap}/${val.routeMenu}`}
                />
              </div>  
            </div>
          );
        else return (
          <div className="relative border-t-2 border-x-2 px-2 rounded-md hover:cursor-pointer
          border-2 border-gray-300 bg-gray-200 hover:bg-gray-300 
          dark:border-gray-500 dark:bg-gray-700 dark:hover:bg-gray-500"
          // onClick={()=><Navigate to={`${routerMap}/${val.routeMenu}`} replace />}
          onClick={()=>navigate(`${routerMap}/${val.routeMenu}`)}
          >
            {val.routeTitle}
          </div>
        );
      });
    };
    if (isMenuBase) return (
      <div className="flex w-full gap-2">
        {<ViewMenuList />}
      </div>
    );
    else return (<div className="flex flex-col">
      {<ViewMenuList />}
    </div>);
  };

  const [menu] = useState<routeListType[]>(LoopingAuthMenu());
  const navigate = useNavigate();
  return (
    <div className="w-full">
      {menu && <LoopingViewMenu menuAuthList={menu} isMenuBase={true} routerMap='/apps'/>}
    </div>
  );
};

export default NavbarMenu;
