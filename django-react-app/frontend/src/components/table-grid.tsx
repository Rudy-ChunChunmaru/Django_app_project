import { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom";

import { Grid,_ } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";
import { css } from '@emotion/css';
import {PencilSquareIcon,TrashIcon} from "@heroicons/react/24/solid";

import api,{urlBase,urlBaseLocal} from "@/logic/api";
import { auth } from "./protected-route";
import { ACCESS_TOKEN } from "@/logic/constants";

export type tableColomType = {
    lable:string
    colom:string
    type:string
    input:boolean
}

type tableGridType = {
    link:string
    coloms:tableColomType[]
}

const TableGrid = ({link,coloms}:tableGridType) => {
    const navigate = useNavigate();

    const getDataList = async () =>{
        try{
            const res =  await api.options(link);
            const dataRespon = res?.data;
            if(dataRespon){
                return dataRespon
            }else{
                return {}
            } 
        } catch (error: any) {
            return {}
        }
    }

    const TemplateWindowListView = () =>{
        const [reload,setReload] = useState<number>(0)
        const [authToken,setAuthToken] = useState<string>('')
        const strUrl = urlBase+link;
        
        const objHeaderUrl= {
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${authToken}`
        };

        const Retrivingdata = ({UrlDetail}:{UrlDetail:string}) => {
            const getRuleData = async () => {
                try{
                    const res =  await api.options(UrlDetail.replace(urlBaseLocal,urlBase));
                    const dataRespon = res?.data;
                    if(dataRespon){
                        return dataRespon
                    }else{
                        return {}
                    }
                } catch (error: any) {
                    return {}
                }
            }

            return  <button className="w-5 rounded-md transition-colors border-2
                border-gray-300 bg-gray-200 hover:bg-gray-300 text-dark
                dark:border-gray-500 dark:bg-gray-700 dark:hover:bg-gray-500 dark:text-white"
                onClick={(e)=>{
                    e.preventDefault();
                    setWindowView(<div className="w-full text-center bg-white rounded-md text-black">loading ...</div>)
                    auth().then((data)=> data == false && navigate('/logout'))
                    getRuleData().then((res)=>{
                        setWindowView(<TemplateWindowFromView rule={res?.actions?.PUT} method="put" url={UrlDetail.replace(urlBaseLocal,'')} />)
                    }).catch(()=>{
                        alert('fail !!!')
                    })
                }}
                >
                <PencilSquareIcon className="fill-current"  />
            </button>
        }

        const Deletedata = ({UrlDetail}:{UrlDetail:string}) => {
            return  <button className="w-5 rounded-md transition-colors border-2
                border-gray-300 bg-gray-200 hover:bg-gray-300 text-dark
                dark:border-gray-500 dark:bg-gray-700 dark:hover:bg-gray-500 dark:text-white"
                onClick={(e)=>{
                    e.preventDefault()
                    if (confirm('Are you sure to delete this item? \nEither OK or Cancel.')) {
                        auth().then((data)=> data == false && navigate('/logout'))
                        api.delete(UrlDetail.replace(urlBaseLocal,'')).then(()=>{
                            setReload(reload+1)
                        }).catch(()=>{
                            alert('fail !!!')
                        })
                    }else{
                        setReload(reload+1)
                    }
                }}
                >
                <TrashIcon className="fill-current"  />
            </button>
        }

        useEffect(()=>{
            auth().then((data)=> data ? setAuthToken(`${localStorage.getItem(ACCESS_TOKEN)}`) : navigate('/logout'))
        },[reload])

        return <div className="text-xs">
            <Grid 
                className={{
                    container: css``,
                    table: css`
                        tr:hover td {
                            background-color: #B6BBC4;
                            color: #161A30;
                        }
                    `,
                    th: css`
                        text-align: left;
                        &:hover {
                            color: #161A30;
                        }
                    `,
                    tr: css`
                        .gridjs-th {
                            padding-top: 0.5rem;
                            padding-bottom: 0.3rem;
                            padding-left: 0.5rem;
                            padding-right: 0.5rem;
                        }
                       .gridjs-td {
                            padding-top: 0.3rem;
                            padding-bottom: 0.3rem;
                            padding-left: 0.5rem;
                            padding-right: 0.5rem;
                       }
                    `,
                    td: css`
                        padding:0px
                        color: #567189;
                    `,
                }}
                fixedHeader={true}
                autoWidth={true}
                columns={[
                    ...coloms.map((valcol)=>{
                        if(valcol.type == 'action')
                            return {name:valcol.lable,field:valcol.colom,formatter:(cells:any) => {
                                    if(typeof cells == 'string'){
                                        return _(
                                            <div className="flex gap-3">
                                                <Retrivingdata UrlDetail={cells} />
                                                <Deletedata UrlDetail={cells} />
                                            </div>
                                        )
                                    }else return <>Error Url ...</>
                                }
                            }
                        else
                            return {name:valcol.lable,field:valcol.colom}
                    })
                ]}
                search={{
                    server: {
                      url: (prev, keyword) => {
                        return `${prev}${prev.includes('?') ? '&' : '?'}search=${keyword}`
                      }
                    }
                }}
                sort={{
                    multiColumn: false,
                    server: {
                        url: (prev, columns) => {
                            let col;
                            let dir = '';
                            let colsortName = [...coloms.map((valcol)=>valcol.colom)];
                            let index = 0;
                            if (columns.length){
                                col = columns[0];
                                index = col.index;
                                dir = col.direction === 1 ? '' : '-';
                                colsortName = [...coloms.map((valcol)=>valcol.colom)];
                            }
                            return `${prev}${prev.includes('?') ? '&' : '?'}ordering=${dir}${colsortName[`${index}`]}`;
                        }
                    }
                }}
                pagination={{
                    limit: 10,
                    server: {
                        url: (prev, page, limit) => {  
                            if(!prev.includes('ordering=')) setReload(reload+1)
                            return `${prev}${prev.includes('?') ? '&' : '?'}limit=${limit}&offset=${page * limit}`
                        }
                    }
                }}
                server={{
                    url:strUrl,
                    headers:objHeaderUrl,
                    then:(data:any)=>{
                        return data.results.map(
                            (val:any)=>[
                                ...coloms.map(
                                    (valcol)=>{
                                        if(valcol.type == 'boolean')
                                            return val[`${valcol.colom}`] ? 'True' : ''
                                        else
                                            return val[`${valcol.colom}`]
                                    }
                                )
                            ]
                        )
                    },
                    total:(data:any) => data.count
                }} 
            />
        </div>
    }

    const TemplateWindowFromView = ({rule,method,url}:{rule:any,method:string,url?:string}) => {
        type inputFormType = {
            colom:string,
            name:string,
            value:string|boolean|number,
            type:string,
            required:boolean,
            maxlength?:number,
            readonly:boolean,
            helptext?:string,
            password?:boolean,
        }

        const [inputForm,setInputForm] = useState<inputFormType[]>(
            [...Object.keys(rule).map((val)=>
                {  
                    let inputvalue:string|boolean|number
                    if(rule[`${val}`].type == 'boolean') inputvalue = false
                    else inputvalue = ''
                    return {
                        colom:val,
                        name:rule[`${val}`].label,
                        value:inputvalue,
                        type:rule[`${val}`].type,
                        required:rule[`${val}`].required,
                        maxlength:rule[`${val}`].max_length,
                        readonly:rule[`${val}`].read_only,
                        helptext:rule[`${val}`]?.help_text,
                        password:val == 'password' ? true: false
                    }
                }
            )]
        );

        const getDataList = async () =>{
            try{
                const res =  await api.get(url);
                const dataRespon = res?.data;
                if(dataRespon){
                    return dataRespon
                }else{
                    return {}
                } 
            } catch (error: any) {
                return {}
            }
        }

        const onChangeInput = (e:any) => {
            let inputFormEdit = [...inputForm]
            if(e.target.type == 'checkbox'){
                inputFormEdit[e.target.id].value = e.target.checked
                inputFormEdit[e.target.id].value = e.target.value == 'true' ? false : true
            }
            else
                inputFormEdit[e.target.id].value = e.target.value

            setInputForm([...inputFormEdit])
        }

        const submitForm = async (e:any) => {
            e.preventDefault();
            let param:any= new Object()
            inputForm.forEach((valueInputForm)=>{
                param[valueInputForm.colom] = valueInputForm.value
            })
            try{
                auth().then((data)=> data == false && navigate('/logout'))
                if(method == 'post'){
                    await api.post(link, param);
                    alert('success input !!!')
                }   
                else if(method == 'put'){
                    await api.put(url, param);
                    alert('success change data !!!')
                }
                else alert('error metod !!!')
                setWindowView(<TemplateWindowListView />)
            } catch (error: any) {
                if(error.response.data){
                    const arrayKeysError = Object.keys(error.response.data)
                    let arrayStrError = [...arrayKeysError.map((val)=>{
                        return `${val} : `+error.response.data[val]
                    })]
                    alert(arrayStrError.join('\n'))
                }
                else
                    alert('error input form !!!')
            }
        }

        useEffect(()=>{
            if(method == 'put' && url){
                getDataList().then(
                    (data:any)=>{
                        setInputForm([...inputForm.map((value)=>{
                            return {...value,value:data[value.colom]}
                        })])
                    }
                ).catch(
                    ()=>{
                        alert('error get data list !!!')
                    }
                )
            }
        },[])
    
        return <div className="px-2 pt-1 w-[100%] h-[100%]">
            <form 
                className="flex flex-col"
                onSubmit={submitForm}
            >
                <div className="w-full border-b-2
                        border-gray-300
                        dark:border-gray-500
                        "
                >{method == 'post' ? 'Create New' : 'Edit View'}</div>
                <div className="grid grid-cols-1 px-2">
                    {inputForm.map((val,key)=>{
                        if(!val.readonly){
                            if(val.type == 'boolean' && typeof val.value == 'boolean')
                                return <div key={key} className="flex gap-2">
                                    <input 
                                        type="checkbox" 
                                        id={`${key}`} 
                                        name={`${val.colom}`} 
                                        className="top-1" 
                                        value={`${val.value}`} 
                                        checked={val.value} 
                                        onChange={onChangeInput} 
                                        required={val.required} 
                                    />
                                    {val.name}
                                </div>
                            else
                                return <div key={key}>
                                    <div>{val.name}:</div>
                                        <input 
                                            type={val.password ? "password":"text"}
                                            id={`${key}`}
                                            name={`${val.colom}`} 
                                            className="w-[80%] px-2 py-1 rounded-lg dark:bg-gray-700 dark:border-gray-500 dark:text-white" 
                                            value={`${val.value}`} 
                                            onChange={onChangeInput} 
                                            required={val.required} 
                                            maxLength={val.maxlength}
                                            autoComplete="off"
                                        />
                                </div>
                    }})}
                </div>
                <div className="w-full text-right py-1 border-t-2
                    border-gray-300
                    dark:border-gray-500"
                >
                    <button
                        type="submit"
                        className="w-fit border-2 rounded-xl py-1 px-2 place-self-end
                        border-gray-300 bg-gray-200 hover:bg-gray-300
                        dark:border-gray-500 dark:bg-gray-700 dark:hover:bg-gray-500"
                    >Submit</button>
                </div>
            </form>     
        </div>
    }

    type TemplateWindowButtonType = {
        name:string
        element:JSX.Element
    }
    const TemplateWindowButton = ({name,element}:TemplateWindowButtonType) => {
        return(<button 
            className="border-2 rounded-md px-2 transition-colors w-fit
            bg-gray-100  border-gray-300 hover:bg-gray-300
            dark:bg-gray-700 dark:border-gray-500 dark:hover:bg-gray-500"
            onClick={(e)=>{e.preventDefault();setWindowView(element)}}
        >
            {name}
        </button>)
    }

    const [dataList,setDataList] = useState<any>();
    const [window,setWindow] = useState<TemplateWindowButtonType[]>([{name:'List',element:<TemplateWindowListView />}]);
    const [windowView,setWindowView] = useState<JSX.Element>(<TemplateWindowListView />);

    useEffect(()=>{
        auth().then((data)=> data == false && navigate('/logout'))
        getDataList().then(
            res=>{
                setDataList(res)
                if(window != undefined) {
                    if(res?.actions?.POST){
                        if(window.find((val)=>val.name == 'Create New') == undefined){
                            setWindow([...window,{name:'Create New',element:<TemplateWindowFromView rule={res?.actions?.POST} method="post" />}])
                        }
                    }
                }
                else {
                    alert('error load list view backend!!!')
                }
                  
            }
        ).catch(
            ()=>{alert('error load data to backend!!!');}
        )   
    },[windowView])

    return <div className="w-full h-[100%]">
        {dataList ?
        (<div className="flex flex-col w-full h-[100%]">
            <div className="flex flex-auto gap-2 justify-self-start h-fit w-[100%] px-1 pt-1">
                {window && window.map((val)=><TemplateWindowButton name={val.name} element={val.element} />)}
            </div>
            <div className="relative w-full h-[100%]">
                {window && windowView}
            </div>
        </div>)
        : <div className="w-full text-center bg-white rounded-md text-black">loading ...</div>}  
    </div>
}

export default TableGrid