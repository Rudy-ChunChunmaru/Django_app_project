import TableGrid,{tableColomType} from "@/components/table-grid";

type Props = {};

const Group = (props: Props) => {
  const colom:tableColomType[] = [
    {lable:"Group",colom:"name",type:'string',input:true},
    {lable:"First Name",colom:"first_name",type:'string',input:true},
  ]

  return <div className="w-full text-normal">
  <div className="w-full border-b-2
    border-gray-300
    dark:border-gray-500
  ">List Group</div>
    <div className="w-full">
      <TableGrid link={"api/web/setting/group/"} coloms={colom} />
    </div>
</div>;
};

export default Group;
