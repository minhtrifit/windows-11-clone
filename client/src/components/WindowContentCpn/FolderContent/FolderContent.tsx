import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  useNavbarStore,
  useSettingStore,
  useFileExplorerWindowStore,
  useWindowStore,
} from "@/lib/store";
import { APP_TYPE } from "@/lib/types";
import WindowCpn from "@/components/WindowCpn/WindowCpn";
import { FILE_EXPLORER_APP_NAME } from "@/lib/utils";
import {} from "@/components/DestopNavbar/DestopNavbar";
import { PiNotepadFill } from "react-icons/pi";
import NotepadContent from "./NotepadContent/NotepadContent";
import FileExplorerIcon from "@/components/FileExplorerIcon/FileExplorerIcon";

export const FILE_EXPLORER_APP_LIST: APP_TYPE[] = [
  {
    iconUrl: "/Icons/files/text.ico",
    iconName: "New Text Document",
    iconWidth: 50,
    iconHeight: 50,
    targetElement: <NotepadContent />,
    targetElementname: FILE_EXPLORER_APP_NAME.notepad,
    targetElementTabName: "Untitled",
    targetElementTabIcon: <PiNotepadFill size={20} />,
    isTargetElementTab: false,
  },
];

const FolderContent = () => {
  const [constraints, setConstraints] = useState<any>({});

  const parentChildRef = useWindowStore((state) => {
    return state.parentChildRef;
  });

  const isCloseTargetWindow = useFileExplorerWindowStore((state) => {
    return state.isCloseTargetWindow;
  });

  const isTargetWindowTab = useFileExplorerWindowStore((state) => {
    return state.isTargetWindowTab;
  });

  const targetWindow = useFileExplorerWindowStore((state) => {
    return state.targetWindow;
  });

  const targetWindowName = useFileExplorerWindowStore((state) => {
    return state.targetWindowName;
  });

  const targetWindowTabName = useFileExplorerWindowStore((state) => {
    return state.targetWindowTabName;
  });

  const targetWindowTabIcon = useFileExplorerWindowStore((state) => {
    return state.targetWindowTabIcon;
  });

  const isCloseTargetSubWindow = useFileExplorerWindowStore((state) => {
    return state.isCloseTargetSubWindow;
  });

  const updateIsCloseTargetWindow = useFileExplorerWindowStore((state) => {
    return state.updateIsCloseTargetWindow;
  });

  const updateTargetWindow = useFileExplorerWindowStore((state) => {
    return state.updateTargetWindow;
  });

  const updateTargetWindowName = useFileExplorerWindowStore((state) => {
    return state.updateTargetWindowName;
  });

  const updateAppList = useNavbarStore((state) => {
    return state.updateAppList;
  });

  const updateSettingTab = useSettingStore((state) => {
    return state.updateSettingTab;
  });

  useEffect(() => {
    if (parentChildRef?.current) {
      const { clientWidth, clientHeight } = parentChildRef?.current;

      setConstraints({
        left: -clientWidth / 2,
        right: clientWidth / 2,
        top: -clientHeight / 2 + 330,
        bottom: clientHeight / 2,
      });
    }
  }, [parentChildRef]);

  return (
    <>
      {targetWindow !== null && !isCloseTargetSubWindow && (
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
      <div className="w-full h-full text-black dark:text-white bg-[#efefef] dark:bg-[#252525]">
        {FILE_EXPLORER_APP_LIST?.map((app: APP_TYPE) => {
          return (
            <FileExplorerIcon
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
    </>
  );
};

export default FolderContent;
