"use client";

import Image from "next/image";
import { useNavbarStore, useWindowStore } from "@/lib/store";

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
}

const StartAppIcon = (props: PropType) => {
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
  } = props;

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

  const handleOpenApp = () => {
    console.log("Open start target element");
    updateIsOpenStart(false);
    updateIsCloseTargetWindow(false);
    updateTargetWindow(targetElement);
    updateTargetWindowName(targetElementname);
    updateTargetWindowTabName(targetElementTabName);
    updateTargetWindowTabIcon(targetElementTabIcon);
    updateIsTargetWindowTab(isTargetElementTab);
  };

  return (
    <div
      className="w-[90px] h-[90px] p-[1px] rounded-lg flex gap-2 flex-col items-center justify-center
                hover:border hover:border-zinc-300 dark:hover:border-zinc-600"
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
      <div className={`max-w-[100%]`}>
        <p className="text-xs dark:text-white select-none text-center line-clamp-2">
          {iconName}
        </p>
      </div>
    </div>
  );
};

export default StartAppIcon;
