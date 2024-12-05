import { useState,useEffect } from "react"
import api,{urlBase} from "@/logic/api";
import { Grid,_ } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";
import { css } from '@emotion/css';

export type tableColomType = {
    lable:string
    colom:string
    type?:string
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
                console.log(dataRespon);
                return dataRespon
            }else{
                return {}
            } 
        } catch (error: any) {
            return {}
        }
    }

    const [dataList,setDataList] = useState<any>();

    const [window,setWindow] = useState<{
        name:string,
        button: JSX.Element,
        window: ()=>JSX.Element,
        link:string,
        method:string,
    }[]>();
    
   useEffect(()=>{
        getDataList()
        .then(
            res=>{setDataList(res)}
        )
        .catch(
            err=>{alert('error !!!');setDataList({error:'status error load !!!'})}
        )
   },[])

   const Table = () =>{
        return <div className="text-xs">
            <Grid 
                className={{
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

   const Element = () =>{

    return <div className="flex flex-col w-full h-[100%]">
        <div className="justify-self-start h-fit w-full px-1">
            {dataList?.actions?.POST && <div 
                className="relative border-2 rounded-md py-1 px-2 transition-colors top-[0.2rem] w-fit
                bg-gray-100  border-gray-300 hover:bg-gray-100
                dark:bg-gray-700 dark:border-gray-500 dark:hover:bg-gray-500"
                onClick={()=>alert('create new')}
            >
                Create New
            </div>}
        </div>
        <div className="relative w-full">
            {dataList && <Table />}
        </div>
    </div>
   }

    return <div className="w-full h-[100%]">
        {dataList ? <Element /> : <>loading</>}  
    </div>
}

export default TableGrid