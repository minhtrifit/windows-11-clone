"use client";

import Image from "next/image";
import { useNavbarStore, useWindowStore } from "@/lib/store";
import { checkIsExistNavbarAppList, getAppByName } from "@/lib/utils";
import {
  NAVBAR_APP_LIST,
  OPTION_NAVBAR_APP_LIST,
} from "@/components/DestopNavbar/DestopNavbar";

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
  lastOpenedTime: string;
}

const StartAppIcon2 = (props: PropType) => {
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
    lastOpenedTime,
  } = props;

  const appList = useNavbarStore((state) => {
    return state.appList;
  });

  const updateIsCloseTargetWindow = useWindowStore((state) => {
    return state.updateIsCloseTargetWindow;
  });

  const updateIsTargetWindowTab = useWindowStore((state) => {
    return state.updateIsTargetWindowTab;
  });

  const updateTargetWindow = useWindowStore((state) => {
    return state.updateTargetWindow;
  });

  const updateTargetWindowName = useWindowStore((state) => {
    return state.updateTargetWindowName;
  });

  const updateTargetWindowTabName = useWindowStore((state) => {
    return state.updateTargetWindowTabName;
  });

  const updateTargetWindowTabIcon = useWindowStore((state) => {
    return state.updateTargetWindowTabIcon;
  });

  const updateIsOpenStart = useNavbarStore((state) => {
    return state.updateIsOpenStart;
  });

  const addAppList = useNavbarStore((state) => {
    return state.addAppList;
  });

  const updateAppList = useNavbarStore((state) => {
    return state.updateAppList;
  });

  const handleOpenApp = () => {
    console.log("Open start target element");
    updateIsOpenStart(false);
    updateIsCloseTargetWindow(false);
    updateTargetWindow(targetElement);
    updateTargetWindowName(targetElementname);
    updateTargetWindowTabName(targetElementTabName);
    updateTargetWindowTabIcon(targetElementTabIcon);
    updateIsTargetWindowTab(isTargetElementTab);

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
      className="w-[100%] h-[60px] px-4 py-2 rounded-lg flex gap-5 items-center
                hover:bg-zinc-200 dark:hover:bg-zinc-700"
      onClick={() => {
        handleOpenApp();
      }}
    >
      <Image
        src={iconUrl}
        alt="favicon"
        width={iconWidth}
        height={iconHeight}
      />
      <div className="flex flex-col items-start gap-1">
        <p className="max-w-[150px] text-sm dark:text-white select-none text-center truncate">
          {iconName}
        </p>
        <p className="text-xs dark:text-zinc-400 font-bold select-none text-center">
          {lastOpenedTime}
        </p>
      </div>
    </div>
  );
};

export default StartAppIcon2;
