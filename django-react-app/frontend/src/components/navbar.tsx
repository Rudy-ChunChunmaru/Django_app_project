const Navbar = () => {
  return (
    <div className="mx-auto flex w-[100%] flex-col rounded-lg border-2">
      <div className="flex w-full justify-between">
        <div className="my-auto">navbar</div>
        <div className="flex flex-col">
          <div>time</div>
          <div>users or login</div>
        </div>
      </div>
      <div className="flex w-full border-2">menu</div>
    </div>
  );
};

export default Navbar;
