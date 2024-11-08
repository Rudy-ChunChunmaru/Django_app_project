import Navbar from "../../components/navbar";

type Props = {};

const Index = ({}: Props) => {
  return (
    <div className="flex flex-col justify-between w-full h-screen">
      <div>
        <Navbar />
      </div>
      <div className='fix w-full px-5 gap-2 pt-10'>
        <div className="bg-gray-200 w-fit mx-auto my-auto px-5 py-3 rounded-md flex flex-col">
          <div className="w-fit mx-auto my-auto p-5 rounded-md text-sm">
            <>WELLCOME TO VEN TURI ARGO</>
          </div>
          <div className="bg-gray-300 w-full py-2 px-3 mx-auto my-auto  rounded-md text-sm text-center">
            <>"we are delivering, we are the best, we are trusted for delivery"</>
          </div>
        </div>
      </div>
      <div></div>
      <div className="mx-auto flex w-[100%] flex-row justify-between border-b-2 bg-gray-100 px-5 border-t-2">
        <div>VenTuriArgo©Copyright</div>
        <div>A.K.A ChunChunMaru</div>
      </div>
    </div>
  );
};

export default Index;
