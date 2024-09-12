"use client";

import { useRef, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useWindowStore } from "@/lib/store";
import { APP_NAME } from "@/lib/utils";
import { APP_TYPE } from "@/lib/types";
import WindowCpn from "@/components/WindowCpn/WindowCpn";
import BrowserContent from "@/components/WindowContentCpn/BrowserContent/BrowserContent";
import FolderContent from "../WindowContentCpn/FolderContent/FolderContent";
import DestopIcon from "../DestopIcon/DestopIcon";
import { FaEdge, FaFolder } from "react-icons/fa";
import DestopNavbar from "../DestopNavbar/DestopNavbar";

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
    targetElementTabName: "Folder",
    targetElementTabIcon: <FaFolder size={15} />,
    isTargetElementTab: true,
  },
];

const WindowContainer = () => {
  const [constraints, setConstraints] = useState<any>({});

  const parentRef = useRef<HTMLDivElement>(null);

  const targetWindow = useWindowStore((state) => {
    return state.targetWindow;
  });

  useEffect(() => {
    if (parentRef.current) {
      const { clientWidth, clientHeight } = parentRef.current;

      setConstraints({
        left: -clientWidth / 2,
        right: clientWidth / 2,
        top: -clientHeight / 2 + 350,
        bottom: clientHeight / 2,
      });
    }
  }, [parentRef]);

  return (
    <div ref={parentRef} className="relative w-[100%] h-[100%] flex">
      <div className="h-full p-2 flex flex-col flex-wrap gap-5">
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
      {targetWindow !== null && (
        <WindowCpn constraints={constraints} contentCpn={targetWindow} />
      )}
      <DestopNavbar />
    </div>
  );
};

export default WindowContainer;
