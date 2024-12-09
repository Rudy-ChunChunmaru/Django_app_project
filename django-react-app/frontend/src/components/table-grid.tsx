import { useState,useEffect } from "react"
import api,{urlBase} from "@/logic/api";
import { Grid,_ } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";
import { css } from '@emotion/css';

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

    const [dataList,setDataList] = useState<any>();

    const TemplateWindowListView = () =>{
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
                    ...coloms.map((valcol,keycol)=>{
                        if(valcol.type == 'navigate')
                            return {name:valcol.lable,field:valcol.colom,formatter:(cells:any) => _(<a key={`${keycol}`} className="border-b-2 border-blue-600 text-blue-600 hover:font-bold transition-transform" onClick={()=>alert(cells)}>{cells}</a>)}
                        else
                            return {name:valcol.lable,field:valcol.colom}
                    })
                ]}
                search={{
                    server: {
                      url: (prev, keyword) => `${prev}?search=${keyword}`
                    }
                }}
                sort={{
                    multiColumn: false,
                    server: {
                        url: (prev, columns) => {
                            if (!columns.length) return prev;
                            const col = columns[0];
                            const dir = col.direction === 1 ? '' : '-';
                            let colName = [...coloms.map((valcol)=>valcol.colom)];
                            if (prev.includes('search=') || prev.includes('ordering='))
                                return `${prev}&ordering=${dir}${colName[`${col.index}`]}`;
                            else
                                return `${prev}?ordering=${dir}${colName[`${col.index}`]}`;
                        }
                    }
                }}
                pagination={{
                    limit: 6,
                    server: {
                        url: (prev, page, limit) => {
                            if (prev.includes('search=') || prev.includes('ordering='))
                                return `${prev}&limit=${limit}&offset=${page * limit}`
                            else
                                return `${prev}?limit=${limit}&offset=${page * limit}`
                        }
                    }
                }}
                server={{
                    url:`${urlBase+link}`,
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

    const TemplateWindowFormView = () => {
        const [formInput,setFormInput] = useState<{name:string,value:string | boolean}[]>(
            [...coloms.map((val)=>{
                if(val.type == 'boolean')
                    return {name:val.colom,value:false}
                else
                    return {name:val.colom,value:''}
            })]
        )

        const onChangeInput = (e:any) => {
            console.log(e)
        }

        return <div id="Cont-Form-CreateNew" className="px-2 pt-1 w-[100%] h-[100%]">
            <form id="Form">
                <div id="Warp-Form" className="flex flex-col">
                    <div id="Title-Form" className="border-b-2 border-gray-300 dark:border-gray-500">Create New</div>
                    <div id="Content-Form" className="grid grid-cols-1 px-2">
                        {coloms.map((val,key)=>{
                                const valueInput = formInput.find((valfrom)=>valfrom.name == val.colom)
                                console.log(valueInput)
                                if(val.type == 'boolean')
                                    return <>
                                        <div key={`${key}`} id={`content-${val.colom}`} className="flex gap-2">
                                            <input type="checkbox" id={`${val.colom}`} name={`${val.colom}`} className="top-1" value={''} onChange={onChangeInput} /> {val.lable}
                                        </div>
                                    </>
                                else
                                    return <div key={`${key}`}>
                                        <div id={`Label-${val.colom}`} className="">{val.lable}:</div>
                                        <input type="text" id={`${val.colom}`} name={`${val.colom}`} className="w-[80%]" value={''} onChange={onChangeInput} />
                                    </div>
                            }
                        )}
                    </div>
                </div>
            </form>     
        </div>
    }

    const TemplateWindowButton = ({key,name,element}:{key:number,name:string,element:JSX.Element}) => {
        return(<div
            key={key}
            className="relative border-2 rounded-md py-1 px-2 transition-colors top-[0.2rem] w-fit
            bg-gray-100  border-gray-300 hover:bg-gray-100
            dark:bg-gray-700 dark:border-gray-500 dark:hover:bg-gray-500"
            onClick={()=>setWindowView(element)}
        >
            {name}
        </div>)
    }

    type windowType = {
        name:string,
        element:JSX.Element,
    }

    const [windowButton,setWindowButton] = useState<windowType[]>([{name:'List',element:<TemplateWindowListView />}]);
    const [windowView,setWindowView] = useState<JSX.Element>(<TemplateWindowListView />);

    useEffect(()=>{
        getDataList().then(
            res=>{
                setDataList(res)
                if(window != undefined) {
                    if(res?.actions?.POST){
                        if(windowButton.find((val)=>val.name == 'Create New') == undefined){
                            setWindowButton([...windowButton,{name:'Create New',element:<TemplateWindowFormView />}])
                        }
                    }
                }
                else alert('error load list view backend!!!')
            }
        ).catch(()=>{alert('error load data to backend!!!');})
    },[])

    return <div className="w-full h-[100%]">
        {dataList ? 
            <div className="flex flex-col w-full h-[100%]">
                <div className="flex flex-auto gap-2 justify-self-start h-fit w-[100%] px-1">
                    {windowButton && windowButton.map((val,key)=><TemplateWindowButton key={key} name={val.name} element={val.element} />)}
                </div>
                <div className="relative w-full h-[100%]">
                    {windowView}
                </div>
            </div>
        : <div className="w-full text-center bg-white rounded-md text-black">loading ...</div>}  
    </div>
}

export default TableGrid