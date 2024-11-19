import React from "react";

import Setting from "../pages/apps/setting";
import User from "../pages/apps/setting/user";
import Group from "../pages/apps/setting/group";
import Menu from "../pages/apps/setting/menu";

import Master from "../pages/apps/master";

export type routeListType = {
  id: number;
  routeTitle: string;
  routeMenu: string;
  routeElement: JSX.Element;
  children?: routeListType[];
};

export const routeList: routeListType[] = [
  {
    id: 1,
    routeTitle: "Setting",
    routeMenu: "setting",
    routeElement: React.createElement(Setting),
    children: [
      {
        id: 2,
        routeTitle: "User",
        routeMenu: "user",
        routeElement: React.createElement(User),
        children: [
          {
            id: 3,
            routeTitle: "Group",
            routeMenu: "Group",
            routeElement: React.createElement(Group),
          },
          {
            id: 3,
            routeTitle: "Group",
            routeMenu: "Group",
            routeElement: React.createElement(Group),
          },
        ],
      },
      {
        id: 3,
        routeTitle: "Group",
        routeMenu: "Group",
        routeElement: React.createElement(Group),
      },
      {
        id: 4,
        routeTitle: "Menu",
        routeMenu: "Menu",
        routeElement: React.createElement(Menu),
      },
    ],
  },
  {
    id: 3,
    routeTitle: "Group",
    routeMenu: "Group",
    routeElement: React.createElement(Group),
  },
  {
    id: 5,
    routeTitle: "Master",
    routeMenu: "Master",
    routeElement: React.createElement(Master),
  },
];
