"use client";

import { usePersonalizeSettingStore } from "@/lib/store";
import { BACKGROUND_URLS } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  children?: React.ReactNode;
};

const SettingProvider = ({ children }: Props) => {
  const pathname = usePathname();

  const [isMainScreen, setIsMainScreen] = useState<boolean>(false);

  const backgroundUrl = usePersonalizeSettingStore((state) => {
    return state.backgroundUrl;
  });

  const lockScreenBackgroundUrl = usePersonalizeSettingStore((state) => {
    return state.lockScreenBackgroundUrl;
  });

  const updateBackgroundUrl = usePersonalizeSettingStore((state) => {
    return state.updateBackgroundUrl;
  });

  useEffect(() => {
    if (pathname === "/main") setIsMainScreen(true);
    else setIsMainScreen(false);
  }, [pathname]);

  // Background URL localstorage
  useEffect(() => {
    const bgUrl = localStorage.getItem("bgUrl");
    if (bgUrl === null) {
      localStorage.setItem("bgUrl", BACKGROUND_URLS[0]);
      updateBackgroundUrl(BACKGROUND_URLS[0]);
    } else updateBackgroundUrl(bgUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${
          isMainScreen ? backgroundUrl : lockScreenBackgroundUrl
        })`,
      }}
      className={`w-screen h-screen bg-cover bg-center overflow-hidden`}
    >
      {children}
    </div>
  );
};

export default SettingProvider;
