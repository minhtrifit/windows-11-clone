import { useEffect } from "react";
import { useNavbarStore } from "@/lib/store";
import { v4 as uuidv4 } from "uuid";
import { APP_NAME, FILE_EXPLORER_APP_NAME } from "@/lib/utils";
import { APP_TYPE } from "@/lib/types";
import AppIcon from "../NavbarIcon/AppIcon/AppIcon";
import StartIcon from "../NavbarIcon/StartIcon/StartIcon";
import { FaEdge, FaFolder } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import BrowserContent from "../WindowContentCpn/BrowserContent/BrowserContent";
import FolderContent from "../WindowContentCpn/FolderContent/FolderContent";
import SettingContent from "../WindowContentCpn/SettingContent/SettingContent";

export const NAVBAR_APP_LIST: APP_TYPE[] = [
  {
    iconUrl: "/Icons/folders/explorer.ico",
    iconWidth: 28,
    iconHeight: 28,
    targetElement: <FolderContent />,
    targetElementname: APP_NAME.file_explorer,
    targetElementTabName: "File Explorer",
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

// File explorer app just need: iconUrl, iconWidth, iconHeight,targetElementname
export const OPTION_NAVBAR_APP_LIST: APP_TYPE[] = [
  {
    iconUrl: "/Icons/applications/settings.ico",
    iconWidth: 28,
    iconHeight: 28,
    targetElement: <SettingContent />,
    targetElementname: APP_NAME.settings,
    targetElementTabName: "Settings",
    targetElementTabIcon: <IoSettingsSharp size={15} />,
    isTargetElementTab: false,
  },
  {
    iconUrl: "/Icons/applications/notepad.ico",
    iconWidth: 28,
    iconHeight: 28,
    targetElementname: FILE_EXPLORER_APP_NAME.notepad,
  },
];

const DestopNavbar = () => {
  const appList = useNavbarStore((state) => {
    return state.appList;
  });

  const updateAppList = useNavbarStore((state) => {
    return state.updateAppList;
  });

  useEffect(() => {
    updateAppList(NAVBAR_APP_LIST);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="fixed bottom-0 w-full h-[50px] py-1 bg-[#efefef] dark:bg-[#161616]
                    flex items-center justify-center gap-3"
    >
      <StartIcon iconUrl={"/Icons/applications/start.ico"} />
      {appList?.map((app: APP_TYPE) => {
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
