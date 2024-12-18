import {VariableApps} from "./../data/variable-apps";
type BottomType = {

}

const Bottom = ({}:BottomType) => {
return <div 
className='text-xs flex w-[100%] flex-row justify-between px-5 border-t-2
border-gray-300 bg-gray-100  
dark:border-gray-500 dark:bg-gray-700'
>
<div>{VariableApps.TitleApps}©Copyright</div>
<div>A.K.A ChunChunMaru</div>
</div>
}

export default Bottom;