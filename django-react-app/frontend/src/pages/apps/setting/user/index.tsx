import TableGrid,{tableColomType} from "@/components/table-grid";

type Props = {};

const User = (props: Props) => {
  const usercolom:tableColomType[] = [
    {lable:"Username",colom:"username",type:'navigate'},
    {lable:"First Name",colom:"first_name"},
    {lable:"Last Name",colom:"last_name"},
    {lable:"Email",colom:"email"},
    {lable:"Super User",colom:"is_superuser",type:'boolean'},
    {lable:"Staff",colom:"is_staff",type:'boolean'},
    {lable:"Active",colom:"is_active",type:'boolean'}
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
