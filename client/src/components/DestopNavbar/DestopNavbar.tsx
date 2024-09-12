import { v4 as uuidv4 } from "uuid";
import { APP_NAME } from "@/lib/utils";
import { APP_TYPE } from "@/lib/types";
import AppIcon from "../NavbarIcon/AppIcon/AppIcon";
import StartIcon from "../NavbarIcon/StartIcon/StartIcon";
import { FaEdge, FaFolder } from "react-icons/fa";
import BrowserContent from "../WindowContentCpn/BrowserContent/BrowserContent";

const NAVBAR_APP_LIST: APP_TYPE[] = [
  {
    iconUrl: "/Icons/folders/explorer.ico",
    iconWidth: 28,
    iconHeight: 28,
    targetElement: <div>Hello</div>,
    targetElementname: APP_NAME.file_explorer,
    targetElementTabName: "Folder",
    targetElementTabIcon: <FaFolder size={15} />,
    isTargetElementTab: true,
  },
  {
    iconUrl: "/Icons/applications/edge.ico",
    iconWidth: 28,
    iconHeight: 28,
    targetElement: <BrowserContent />,
    targetElementname: APP_NAME.browser,
    targetElementTabName: "New Tab",
    targetElementTabIcon: <FaEdge size={15} />,
    isTargetElementTab: true,
  },
];

const DestopNavbar = () => {
  return (
    <div
      className="fixed bottom-0 w-full h-[50px] py-1 bg-[#efefef] dark:bg-[#161616]
                    flex items-center justify-center gap-3"
    >
      <StartIcon iconUrl={"/Icons/applications/start.ico"} />
      {NAVBAR_APP_LIST?.map((app: APP_TYPE) => {
        return (
          <AppIcon
            key={uuidv4()}
            iconUrl={app?.iconUrl ? app?.iconUrl : ""}
            iconWidth={app?.iconWidth ? app?.iconWidth : 0}
            iconHeight={app?.iconHeight ? app?.iconHeight : 0}
            targetElement={app?.targetElement ? app?.targetElement : <></>}
            targetElementname={
              app?.targetElementname ? app?.targetElementname : ""
            }
            targetElementTabName={
              app?.targetElementTabName ? app?.targetElementTabName : ""
            }
            targetElementTabIcon={
              app?.targetElementTabIcon ? app?.targetElementTabIcon : <></>
            }
            isTargetElementTab={
              app?.isTargetElementTab ? app?.isTargetElementTab : false
            }
          />
        );
      })}
    </div>
  );
};

export default DestopNavbar;
