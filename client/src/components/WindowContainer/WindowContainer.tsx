"use client";

import { useRef, useEffect, useState } from "react";
import WindowCpn from "@/components/WindowCpn/WindowCpn";
import BrowserContent from "@/components/WindowContentCpn/BrowserContent/BrowserContent";
import DestopIcon from "../DestopIcon/DestopIcon";
import { FaEdge, FaFolder } from "react-icons/fa";
import { useWindowStore } from "@/lib/store";
import DestopNavbar from "../DestopNavbar/DestopNavbar";

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
        <DestopIcon
          iconUrl={"/Icons/applications/edge.ico"}
          iconName={"Microsoft Edge"}
          targetElement={<BrowserContent />}
          targetElementTabName="New Tab"
          targetElementTabIcon={<FaEdge size={15} />}
        />
        <DestopIcon
          iconUrl={"/Icons/folders/explorer.ico"}
          iconName={"File Explorer"}
          targetElement={<div>Hello</div>}
          targetElementTabName="Folder"
          targetElementTabIcon={<FaFolder size={15} />}
        />
      </div>
      {targetWindow !== null && (
        <WindowCpn constraints={constraints} contentCpn={targetWindow} />
      )}
      <DestopNavbar />
    </div>
  );
};

export default WindowContainer;
