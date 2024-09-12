import WindowContainer from "@/components/WindowContainer/WindowContainer";
import ContextMenuCpn from "@/components/ContextMenuCpn/ContextMenuCpn";

const page = () => {
  return (
    <ContextMenuCpn>
      <div
        className={`w-screen h-screen bg-[url('/Images/3.jpg')] bg-cover bg-center overflow-hidden`}
      >
        <WindowContainer />
      </div>
    </ContextMenuCpn>
  );
};

export default page;
