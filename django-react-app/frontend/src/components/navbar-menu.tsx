
import { useState, useLayoutEffect } from 'react';
import {routeListType,routeList} from './../data/routes-list';

type Props = {
  idMenus:number[]
};

const NavbarMenu = ({idMenus}: Props) => {
  const [menu,setMenu] = useState<routeListType[]>();

  const LoopingAuthMenu = async() => {
    const LoopingAuthChildrenMenu = (childrenMenu:routeListType[]) =>{
      let authChildrenMenu:routeListType[] = []
      
      return authChildrenMenu
    }

    let authMenu:routeListType[] = []
    routeList.forEach(
      (value:routeListType)=>{
        if(idMenus.includes(value.id)){
          if(value?.children)
            authMenu.push({
              ...value,
              children: LoopingAuthChildrenMenu(value.children)
            });
        }
      }
    )

    setMenu(authMenu);
  }

  useLayoutEffect(()=>{
    LoopingAuthMenu();
  },[])

  console.log(menu)

  
  return <div className='w-full'>
    <div>test</div>
  </div>;
};

export default NavbarMenu;
