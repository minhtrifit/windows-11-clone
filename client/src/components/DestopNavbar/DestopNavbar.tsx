import StartIcon from "../NavbarIcon/StartIcon/StartIcon";

const DestopNavbar = () => {
  return (
    <div
      className="fixed bottom-0 w-full h-[50px] py-1 bg-[#efefef] dark:bg-[#161616]
                    flex items-center justify-center"
    >
      <StartIcon iconUrl={"/Icons/applications/start.ico"} />
    </div>
  );
};

export default DestopNavbar;
