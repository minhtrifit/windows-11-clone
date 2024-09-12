import Image from "next/image";
import { useWindowStore } from "@/lib/store";

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

  const handleOpenApp = () => {
    console.log("Open target element");
    updateIsCloseTargetWindow(false);
    updateTargetWindow(targetElement);
    updateTargetWindowName(targetElementname);
    updateTargetWindowTabName(targetElementTabName);
    updateTargetWindowTabIcon(targetElementTabIcon);
    updateIsTargetWindowTab(isTargetElementTab);
  };

  return (
    <div
      className={`${
        targetElementname === targetWindowName && "bg-zinc-200 dark:bg-zinc-800"
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
      {targetElementname === targetWindowName && (
        <div className="absolute bottom-0 w-[40%] h-[3px] bg-sky-400 rounded-md"></div>
      )}
    </div>
  );
};

export default AppIcon;
