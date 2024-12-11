import TableGrid,{tableColomType} from "@/components/table-grid";

type Props = {};

const User = (props: Props) => {
  const usercolom:tableColomType[] = [
    {lable:"Username",colom:"username",type:'navigate',input:true},
    {lable:"First Name",colom:"first_name",type:'string',input:true},
    {lable:"Last Name",colom:"last_name",type:'string',input:true},
    {lable:"Email",colom:"email",type:'string',input:true},
    {lable:"Super User",colom:"is_superuser",type:'boolean',input:true},
    {lable:"Staff",colom:"is_staff",type:'boolean',input:true},
    {lable:"Active",colom:"is_active",type:'boolean',input:true}
  ]


  return <div className="w-full text-normal">
    <div className="w-full border-b-2
      border-gray-300
      dark:border-gray-500
    ">List User</div>
      <div className="w-full">
        <TableGrid link={"api/web/user/"} coloms={usercolom} />
      </div>
  </div>;
};

export default User;
