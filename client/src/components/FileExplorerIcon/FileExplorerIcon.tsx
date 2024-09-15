"use client";

import Image from "next/image";
import {
  useFileExplorerWindowStore,
  useNavbarStore,
  useTextDocumentStore,
} from "@/lib/store";
import { checkIsExistNavbarAppList, getAppByName } from "@/lib/utils";
import {
  NAVBAR_APP_LIST,
  OPTION_NAVBAR_APP_LIST,
} from "../DestopNavbar/DestopNavbar";
import { APP_TYPE } from "@/lib/types";

interface PropType {
  iconUrl: string;
  iconName: string;
  iconWidth: number;
  iconHeight: number;
  targetElement: React.ReactElement;
  targetElementname: string;
  targetElementTabName: string;
  targetElementTabIcon: React.ReactElement;
  isTargetElementTab: boolean;
  itemData?: APP_TYPE | null;
}

const FileExplorerIcon = (props: PropType) => {
  const {
    iconUrl,
    iconName,
    iconWidth,
    iconHeight,
    targetElement,
    targetElementname,
    targetElementTabName,
    targetElementTabIcon,
    isTargetElementTab,
    itemData,
  } = props;

  const appList = useNavbarStore((state) => {
    return state.appList;
  });

  const updateIsCloseTargetWindow = useFileExplorerWindowStore((state) => {
    return state.updateIsCloseTargetWindow;
  });

  const updateIsTargetWindowTab = useFileExplorerWindowStore((state) => {
    return state.updateIsTargetWindowTab;
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

  const updateTargetSubWindowName = useFileExplorerWindowStore((state) => {
    return state.updateTargetSubWindowName;
  });

  const updateIsCloseTargetSubWindow = useFileExplorerWindowStore((state) => {
    return state.updateIsCloseTargetSubWindow;
  });

  const addAppList = useNavbarStore((state) => {
    return state.addAppList;
  });

  const updateAppList = useNavbarStore((state) => {
    return state.updateAppList;
  });

  const updateItemData = useTextDocumentStore((state) => {
    return state.updateItemData;
  });

  const handleOpenApp = () => {
    console.log(
      "Open file explorer target element:",
      targetElementname,
      itemData
    );
    updateIsCloseTargetWindow(false);
    updateTargetWindow(targetElement);
    updateTargetWindowName(targetElementname);
    updateTargetWindowTabName(targetElementTabName);
    updateTargetWindowTabIcon(targetElementTabIcon);
    updateIsTargetWindowTab(isTargetElementTab);
    updateTargetSubWindowName(targetElementname);
    updateIsCloseTargetSubWindow(false);
    if (itemData) updateItemData(itemData);

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
    <div
      className="w-[90px] h-[90px] p-[1px] rounded-lg flex gap-2 flex-col items-center justify-center
              hover:border hover:border-gray-400"
      onDoubleClick={() => {
        handleOpenApp();
      }}
    >
      <Image
        src={iconUrl}
        alt="favicon"
        width={iconWidth}
        height={iconHeight}
      />
      <div className={`max-w-[100%]`}>
        <p className="text-xs text-black dark:text-white select-none text-center line-clamp-2">
          {iconName}
        </p>
      </div>
    </div>
  );
};

export default FileExplorerIcon;
