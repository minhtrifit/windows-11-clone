"use client";

import { usePersonalizeSettingStore } from "@/lib/store";

type Props = {
  children?: React.ReactNode;
};

const SettingProvider = ({ children }: Props) => {
  const backgroundUrl = usePersonalizeSettingStore((state) => {
    return state.backgroundUrl;
  });

  return (
    <div
      style={{ backgroundImage: `url(${backgroundUrl})` }}
      className={`w-screen h-screen bg-cover bg-center overflow-hidden`}
    >
      {children}
    </div>
  );
};

export default SettingProvider;
