
import {VariableApps} from "../../data/variable-apps";
type Props = {

};

const Index = ({}: Props) => {
  return (
    <div className="">
        <div className="bg-gray-200 w-fit mx-auto my-auto px-5 py-3 rounded-md flex flex-col">
          <div className="w-fit mx-auto my-auto p-5 rounded-md text-sm">
            <>WELLCOME TO {VariableApps.TitleApps.toUpperCase()}</>
          </div>
          {
            VariableApps.MotoApps && 
            <div className="bg-gray-300 w-full py-2 px-3 mx-auto my-auto  rounded-md text-sm text-center">
              <>"{VariableApps.MotoApps}"</>
            </div>
          }
        </div>
    </div>
  );
};

export default Index;
