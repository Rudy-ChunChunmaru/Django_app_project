import { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom";

import { Grid,_ } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";
import { css } from '@emotion/css';

import api,{urlBase} from "@/logic/api";
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
                        if(valcol.type == 'navigate')
                            return {name:valcol.lable,field:valcol.colom,formatter:(cells:any) => _(<a className="border-b-2 border-blue-600 text-blue-600 hover:font-bold transition-transform" onClick={()=>alert(cells)}>{cells}</a>)}
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

    const TemplateWindowFromView = ({post}:{post:any}) => {
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
            [...Object.keys(post).map((val)=>
                {  
                    let inputvalue:string|boolean|number
                    if(post[`${val}`].type == 'boolean') inputvalue = false
                    else inputvalue = ''
                    return {
                        colom:val,
                        name:post[`${val}`].label,
                        value:inputvalue,
                        type:post[`${val}`].type,
                        required:post[`${val}`].required,
                        maxlength:post[`${val}`].max_length,
                        readonly:post[`${val}`].read_only,
                        helptext:post[`${val}`]?.help_text,
                        password:val == 'password' ? true: false
                    }
                }
            )]
        );

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
                await api.post(link, param);
                alert('success input !!!')
                return navigate(0)
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
    
        return <div className="px-2 pt-1 w-[100%] h-[100%]">
            <form 
                className="flex flex-col"
                onSubmit={submitForm}
            >
                <div className="w-full border-b-2
                        border-gray-300
                        dark:border-gray-500
                        "
                >Create New</div>
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
            bg-gray-100  border-gray-300 hover:bg-gray-100
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
                            setWindow([...window,{name:'Create New',element:<TemplateWindowFromView post={res?.actions?.POST} />}])
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