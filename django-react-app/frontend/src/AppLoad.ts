import { ACCESS_TOKEN, REFRESH_TOKEN, USER_TOKEN,THEME } from "./logic/constants";


export type loadAppsType = {
    access: string,
    refresh: string,
    user: string,
    theme: string
}


const LoadApps = ():loadAppsType =>{
    const access = localStorage.getItem(ACCESS_TOKEN)
    const refresh = localStorage.getItem(REFRESH_TOKEN)
    const user = localStorage.getItem(USER_TOKEN)
    const thame = localStorage.getItem(THEME)

    const loadData:loadAppsType = {
      access: access ? access : '',
      refresh: refresh ? refresh : '',
      user: user ? user : '',
      theme: thame ? thame:''
    }

    return loadData
};

export default LoadApps;