"use client";

import Image from "next/image";
import { useWindowStore } from "@/lib/store";

interface PropType {
  iconUrl: string;
  iconName: string;
  targetElement: React.ReactElement;
}

const DestopIcon = (props: PropType) => {
  const { iconUrl, iconName, targetElement } = props;

  const updateTargetWindow = useWindowStore((state) => {
    return state.updateTargetWindow;
  });

  const handleOpenApp = () => {
    console.log("Open target element");
    updateTargetWindow(targetElement);
  };

  return (
    <div
      className="w-[90px] h-[90px] p-[1px] rounded-lg flex gap-2 flex-col items-center justify-center
                hover:bg-sky-100 dark:hover:bg-sky-900 hover:cursor-pointer"
      onDoubleClick={() => {
        handleOpenApp();
      }}
    >
      <Image src={iconUrl} alt="favicon" width={50} height={50} />
      <div className={`max-w-[100%]`}>
        <p className="text-xs text-center line-clamp-2">{iconName}</p>
      </div>
    </div>
  );
};

export default DestopIcon;
