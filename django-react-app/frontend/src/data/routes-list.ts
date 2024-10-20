import React from "react";
import Index from "../pages/common";
import User from "../pages/apps/common/user";
import Group from "../pages/apps/common/group";

type routeListType = {
  id: number;
  routeElement: JSX.Element;
};

const routeList: routeListType[] = [
  { id: 1, routeElement: React.createElement(Index) },
  { id: 2, routeElement: React.createElement(User) },
  { id: 3, routeElement: React.createElement(Group) },
];

export default routeList;
