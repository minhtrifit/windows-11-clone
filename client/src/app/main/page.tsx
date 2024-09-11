import WindowCpn from "@/components/WindowCpn/WindowCpn";
import BrowserContent from "@/components/WindowContentCpn/BrowserContent/BrowserContent";

const page = () => {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <WindowCpn contentCpn={<BrowserContent />} />
    </div>
  );
};

export default page;
