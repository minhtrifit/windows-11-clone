import Image from "next/image";
import {
  useFileExplorerWindowStore,
  useNavbarStore,
  useWindowStore,
} from "@/lib/store";
import { checkIsExistNavbarAppList, getAppByName } from "@/lib/utils";
import {
  NAVBAR_APP_LIST,
  OPTION_NAVBAR_APP_LIST,
} from "@/components/DestopNavbar/DestopNavbar";

interface PropType {
  iconUrl: string;
  iconWidth: number;
  iconHeight: number;
  targetElement: React.ReactElement;
  targetElementname: string;
  targetElementTabName: string;
  targetElementTabIcon: React.ReactElement;
  isTargetElementTab: boolean;
}

const AppIcon = (props: PropType) => {
  const {
    iconUrl,
    iconWidth,
    iconHeight,
    targetElement,
    targetElementname,
    targetElementTabName,
    targetElementTabIcon,
    isTargetElementTab,
  } = props;

  const targetWindowName = useWindowStore((state) => {
    return state.targetWindowName;
  });

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

  const addAppList = useNavbarStore((state) => {
    return state.addAppList;
  });

  const updateAppList = useNavbarStore((state) => {
    return state.updateAppList;
  });

  const fileExplorerTargetSubWindowName = useFileExplorerWindowStore(
    (state) => {
      return state.targetSubWindowName;
    }
  );

  const handleOpenApp = () => {
    console.log("Open target element");
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
      className={`${
        targetElementname === targetWindowName && "bg-zinc-300 dark:bg-zinc-800"
      } ${
        targetElementname === fileExplorerTargetSubWindowName &&
        "bg-zinc-300 dark:bg-zinc-800"
      } start-icon relative h-full flex items-center justify-center gap-2 p-2 rounded-md
                  hover:bg-zinc-200 dark:hover:bg-zinc-800`}
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
      {targetElementname === targetWindowName &&
        fileExplorerTargetSubWindowName === "" && (
          <div className="absolute bottom-0 w-[40%] h-[3px] bg-sky-400 rounded-md"></div>
        )}
      {targetElementname === targetWindowName &&
        fileExplorerTargetSubWindowName !== "" && (
          <div className="absolute bottom-0 w-[20%] h-[3px] bg-zinc-400 rounded-md"></div>
        )}
      {targetElementname === fileExplorerTargetSubWindowName &&
        fileExplorerTargetSubWindowName !== "" && (
          <div className="absolute bottom-0 w-[40%] h-[3px] bg-sky-400 rounded-md"></div>
        )}
    </div>
  );
};

export default AppIcon;
