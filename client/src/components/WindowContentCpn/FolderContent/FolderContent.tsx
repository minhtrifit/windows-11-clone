import { useEffect, useState } from "react";
import {
  useNavbarStore,
  useSettingStore,
  useFileExplorerWindowStore,
  useWindowStore,
} from "@/lib/store";
import { APP_TYPE } from "@/lib/types";
import WindowCpn from "@/components/WindowCpn/WindowCpn";
import {
  checkIsExistNavbarAppList,
  FILE_EXPLORER_APP_NAME,
  getAppByName,
} from "@/lib/utils";
import {
  NAVBAR_APP_LIST,
  OPTION_NAVBAR_APP_LIST,
} from "@/components/DestopNavbar/DestopNavbar";
import { PiNotepadFill } from "react-icons/pi";
import NotepadContent from "./NotepadContent/NotepadContent";

export const FILE_EXPLORER_APP_LIST: APP_TYPE[] = [
  {
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

  const appList = useNavbarStore((state) => {
    return state.appList;
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

  const updateTargetWindowTabName = useFileExplorerWindowStore((state) => {
    return state.updateTargetWindowTabName;
  });

  const updateTargetWindowTabIcon = useFileExplorerWindowStore((state) => {
    return state.updateTargetWindowTabIcon;
  });

  const updateIsTargetWindowTab = useFileExplorerWindowStore((state) => {
    return state.updateIsTargetWindowTab;
  });

  const updateTargetSubWindowName = useFileExplorerWindowStore((state) => {
    return state.updateTargetSubWindowName;
  });

  const updateIsCloseTargetSubWindow = useFileExplorerWindowStore((state) => {
    return state.updateIsCloseTargetSubWindow;
  });

  const updateAppList = useNavbarStore((state) => {
    return state.updateAppList;
  });

  const addAppList = useNavbarStore((state) => {
    return state.addAppList;
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
        top: -clientHeight / 2 + 350,
        bottom: clientHeight / 2,
      });
    }
  }, [parentChildRef]);

  const handleOpenApp = (
    targetElement: React.ReactElement,
    targetElementname: string,
    targetElementTabName: string,
    targetElementTabIcon: React.ReactElement,
    isTargetElementTab: boolean
  ) => {
    console.log("Open file explorer target element:", targetElementname);
    updateIsCloseTargetWindow(false);
    updateTargetWindow(targetElement);
    updateTargetWindowName(targetElementname);
    updateTargetWindowTabName(targetElementTabName);
    updateTargetWindowTabIcon(targetElementTabIcon);
    updateIsTargetWindowTab(isTargetElementTab);
    updateTargetSubWindowName(targetElementname);
    updateIsCloseTargetSubWindow(false);

    // Navbar item update
    const isOptionNavbarApp = checkIsExistNavbarAppList(
      OPTION_NAVBAR_APP_LIST,
      targetElementname
    );

    if (isOptionNavbarApp) {
      const newApp = getAppByName(OPTION_NAVBAR_APP_LIST, targetElementname);
      const isExistNavbarList = checkIsExistNavbarAppList(
        appList,
        targetElementname
      );
      if (newApp !== null && !isExistNavbarList) addAppList(newApp);
    } else {
      updateAppList(NAVBAR_APP_LIST);
    }
  };

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
        <button
          onClick={() => {
            const notepadApp = getAppByName(
              FILE_EXPLORER_APP_LIST,
              FILE_EXPLORER_APP_NAME.notepad
            );

            if (notepadApp !== null) {
              handleOpenApp(
                notepadApp.targetElement ? notepadApp.targetElement : <></>,
                notepadApp.targetElementname
                  ? notepadApp.targetElementname
                  : "",
                notepadApp.targetElementTabName
                  ? notepadApp.targetElementTabName
                  : "",
                notepadApp.targetElementTabIcon ? (
                  notepadApp.targetElementTabIcon
                ) : (
                  <></>
                ),
                notepadApp.isTargetElementTab
                  ? notepadApp.isTargetElementTab
                  : false
              );
            }
          }}
        >
          Add
        </button>
      </div>
    </>
  );
};

export default FolderContent;
