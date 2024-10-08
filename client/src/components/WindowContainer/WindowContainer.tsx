"use client";

import { useRef, useEffect, useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavbarStore, useSettingStore, useWindowStore } from "@/lib/store";
import { APP_NAME, FILE_EXPLORER_APP_NAME } from "@/lib/utils";
import { APP_TYPE } from "@/lib/types";

import {
  FaEdge,
  FaFolder,
  FaPaintBrush,
  FaSpotify,
  FaCalendarAlt,
} from "react-icons/fa";
import { IoSettingsSharp, IoAppsSharp } from "react-icons/io5";
import { PiNotepadFill, PiCalculatorFill } from "react-icons/pi";
import { SiVisualstudiocode } from "react-icons/si";

import { AuthContext } from "../Providers/AuthProvider/AuthProvider";
import DestopNavbar from "../DestopNavbar/DestopNavbar";
import WindowCpn from "@/components/WindowCpn/WindowCpn";
import DestopIcon from "../DestopIcon/DestopIcon";
import BrowserContent from "@/components/WindowContentCpn/BrowserContent/BrowserContent";
import FolderContent from "../WindowContentCpn/FolderContent/FolderContent";
import SettingContent from "../WindowContentCpn/SettingContent/SettingContent";
import NotepadContent from "../WindowContentCpn/FolderContent/NotepadContent/NotepadContent";
import VisualCodeContent from "../WindowContentCpn/VisualCodeContent/VisualCodeContent";
import IframeContent from "../WindowContentCpn/IframeContent/IframeContent";
import PaintContent from "../WindowContentCpn/PaintContent/PaintContent";
import CalculatorContent from "../WindowContentCpn/CalculatorContent/CalculatorContent";
import SpotifyContent from "../WindowContentCpn/SpotifyContent/SpotifyContent";
import CalendarContent from "../WindowContentCpn/CalendarContent/CalendarContent";

const DESTOP_APP_LIST: APP_TYPE[] = [
  {
    iconUrl: "/Icons/applications/edge.ico",
    iconName: "Microsoft Edge",
    iconWidth: 45,
    iconHeight: 45,
    targetElement: <BrowserContent />,
    targetElementname: APP_NAME.browser,
    targetElementTabName: "New Tab",
    targetElementTabIcon: <FaEdge size={15} />,
    isTargetElementTab: true,
  },
  {
    iconUrl: "/Icons/folders/explorer.ico",
    iconName: "File Explorer",
    iconWidth: 45,
    iconHeight: 45,
    targetElement: <FolderContent />,
    targetElementname: APP_NAME.file_explorer,
    targetElementTabName: "File Explorer",
    targetElementTabIcon: <FaFolder size={15} />,
    isTargetElementTab: true,
  },
  {
    iconUrl: "/Icons/applications/visualcode.ico",
    iconName: "Visual Studio Code",
    iconWidth: 45,
    iconHeight: 45,
    targetElement: <VisualCodeContent />,
    targetElementname: APP_NAME.visualcode,
    targetElementTabName: "Visual Studio Code",
    targetElementTabIcon: <SiVisualstudiocode size={20} />,
    isTargetElementTab: false,
  },
  {
    iconUrl: "/Icons/applications/settings.ico",
    iconName: "Settings",
    iconWidth: 45,
    iconHeight: 45,
    targetElement: <SettingContent />,
    targetElementname: APP_NAME.settings,
    targetElementTabName: "Settings",
    targetElementTabIcon: <IoSettingsSharp size={20} />,
    isTargetElementTab: false,
  },
  {
    iconUrl: "/assets/app_custom.ico",
    iconName: "My Portfolio",
    iconWidth: 45,
    iconHeight: 45,
    targetElement: (
      <IframeContent url={process.env.NEXT_PUBLIC_MY_PORTFOLIO_APP_URL} />
    ),
    targetElementname: APP_NAME.app_custom,
    targetElementTabName: "My Portfolio",
    targetElementTabIcon: <IoAppsSharp size={20} />,
    isTargetElementTab: false,
  },
  {
    iconUrl: "/Icons/applications/notepad.ico",
    iconName: "Notepad",
    iconWidth: 45,
    iconHeight: 45,
    targetElement: <NotepadContent />,
    targetElementname: FILE_EXPLORER_APP_NAME.notepad,
    targetElementTabName: "Untitled",
    targetElementTabIcon: <PiNotepadFill size={20} />,
    isTargetElementTab: true,
  },
  {
    iconUrl: "/Icons/applications/paint.ico",
    iconName: "Paint",
    iconWidth: 45,
    iconHeight: 45,
    targetElement: <PaintContent />,
    targetElementname: APP_NAME.paint,
    targetElementTabName: "Untitled - Paint",
    targetElementTabIcon: <FaPaintBrush size={20} />,
    isTargetElementTab: false,
  },
  {
    iconUrl: "/Icons/applications/calculator.ico",
    iconName: "Calculator",
    iconWidth: 45,
    iconHeight: 45,
    targetElement: <CalculatorContent />,
    targetElementname: APP_NAME.calculator,
    targetElementTabName: "Calculator",
    targetElementTabIcon: <PiCalculatorFill size={20} />,
    isTargetElementTab: false,
  },
  {
    iconUrl: "/assets/spotify.ico",
    iconName: "Spotify",
    iconWidth: 45,
    iconHeight: 45,
    targetElement: <SpotifyContent />,
    targetElementname: APP_NAME.spotify,
    targetElementTabName: "Spotify",
    targetElementTabIcon: <FaSpotify size={20} />,
    isTargetElementTab: false,
  },
  {
    iconUrl: "/Icons/applications/calendar.ico",
    iconName: "Calendar",
    iconWidth: 45,
    iconHeight: 45,
    targetElement: <CalendarContent />,
    targetElementname: APP_NAME.calendar,
    targetElementTabName: "Calendar",
    targetElementTabIcon: <FaCalendarAlt size={20} />,
    isTargetElementTab: false,
  },
];

const WindowContainer = () => {
  const { user }: any = useContext(AuthContext);

  const [constraints, setConstraints] = useState<any>({});

  const parentRef = useRef<HTMLDivElement>(null);

  const isCloseTargetWindow = useWindowStore((state) => {
    return state.isCloseTargetWindow;
  });

  const isTargetWindowTab = useWindowStore((state) => {
    return state.isTargetWindowTab;
  });

  const targetWindow = useWindowStore((state) => {
    return state.targetWindow;
  });

  const targetWindowName = useWindowStore((state) => {
    return state.targetWindowName;
  });

  const targetWindowTabName = useWindowStore((state) => {
    return state.targetWindowTabName;
  });

  const targetWindowTabIcon = useWindowStore((state) => {
    return state.targetWindowTabIcon;
  });

  const updateParentChildRef = useWindowStore((state) => {
    return state.updateParentChildRef;
  });

  const updateIsCloseTargetWindow = useWindowStore((state) => {
    return state.updateIsCloseTargetWindow;
  });

  const updateTargetWindow = useWindowStore((state) => {
    return state.updateTargetWindow;
  });

  const updateTargetWindowName = useWindowStore((state) => {
    return state.updateTargetWindowName;
  });

  const updateAppList = useNavbarStore((state) => {
    return state.updateAppList;
  });

  const updateSettingTab = useSettingStore((state) => {
    return state.updateSettingTab;
  });

  useEffect(() => {
    if (parentRef?.current) {
      const { clientWidth, clientHeight } = parentRef?.current;
      updateParentChildRef(parentRef);

      setConstraints({
        left: -clientWidth / 2,
        right: clientWidth / 2,
        top: -clientHeight / 2 + 350,
        bottom: clientHeight / 2,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentRef]);

  useEffect(() => {
    if (user) {
      console.log("USER DATA:", user);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div ref={parentRef} className="relative w-[100%] h-[100%] flex">
      <div className="h-[calc(100vh-50px)] p-2 flex flex-col flex-wrap gap-5">
        {DESTOP_APP_LIST?.map((app: APP_TYPE) => {
          return (
            <DestopIcon
              key={uuidv4()}
              iconUrl={app?.iconUrl ? app?.iconUrl : ""}
              iconName={app?.iconName ? app?.iconName : ""}
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
      {targetWindow !== null && !isCloseTargetWindow && (
        <WindowCpn
          constraints={constraints}
          contentCpn={targetWindow}
          isCloseTargetWindow={isCloseTargetWindow}
          isTargetWindowTab={isTargetWindowTab}
          targetWindowName={targetWindowName}
          targetWindowTabName={targetWindowTabName}
          targetWindowTabIcon={targetWindowTabIcon}
          updateIsCloseTargetWindow={updateIsCloseTargetWindow}
          updateTargetWindow={updateTargetWindow}
          updateTargetWindowName={updateTargetWindowName}
          updateAppList={updateAppList}
          updateSettingTab={updateSettingTab}
        />
      )}
      <DestopNavbar />
    </div>
  );
};

export default WindowContainer;
