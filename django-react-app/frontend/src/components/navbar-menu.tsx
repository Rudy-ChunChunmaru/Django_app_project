import { useState, useLayoutEffect } from "react";
import { routeListType, routeList } from "./../data/routes-list";

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
  }: {
    menuAuthList: routeListType[];
    isMenuBase: boolean;
  }) => {
    const ViewMenuList = () => {
      return menuAuthList.map((val) => {
        if (val.children)
          return (
            <div className="group gap-1 border-gray-200 px-1 hover:border-b-2 hover:border-l-2">
              <div className="border-b-2 border-gray-200">{val.routeTitle}</div>
              <div className="relative left-3 hidden border-l-2 border-gray-200 px-1 group-hover:flex group-hover:flex-col">
                <LoopingViewMenu
                  menuAuthList={val.children}
                  isMenuBase={false}
                />
              </div>
            </div>
          );
        else return <div>{val.routeTitle}</div>;
      });
    };
    if (isMenuBase)
      return <div className="flex w-full gap-3">{<ViewMenuList />}</div>;
    else return <div className="flex flex-col">{<ViewMenuList />}</div>;
  };

  const [menu] = useState<routeListType[]>(LoopingAuthMenu());
  console.log(menu);
  return (
    <div className="w-full">
      {menu && <LoopingViewMenu menuAuthList={menu} isMenuBase={true} />}
    </div>
  );
};

export default NavbarMenu;
