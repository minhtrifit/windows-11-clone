import { useState } from "react";
import { useSettingStore } from "@/lib/store";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { SETTING_NAME } from "@/lib/utils";
import { IoHomeOutline } from "react-icons/io5";
import { FaPaintbrush } from "react-icons/fa6";
import { PiAppWindowDuotone } from "react-icons/pi";
import Personalize from "./Personalize";
import Home from "./Home";

const SettingContent = () => {
  const settingTab = useSettingStore((state) => {
    return state.settingTab;
  });

  const [activeTab, setActiveTab] = useState<string>(
    settingTab ? settingTab : SETTING_NAME.home
  );

  const SLIDEBAR_ITEMS = [
    {
      name: SETTING_NAME.home,
      icon: <IoHomeOutline className="mr-3" size={20} />,
    },
    {
      name: SETTING_NAME.system,
      icon: <PiAppWindowDuotone className="mr-3" size={20} />,
    },
    {
      name: SETTING_NAME.personalize,
      icon: <FaPaintbrush className="mr-3" size={20} />,
    },
  ];

  return (
    <div className="w-full h-full flex">
      <div className="w-[25%] space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Discover
          </h2>
          <div className="space-y-1">
            {SLIDEBAR_ITEMS?.map((item: any) => {
              return (
                <Button
                  key={uuidv4()}
                  variant={activeTab === item.name ? "secondary" : "ghost"}
                  size="sm"
                  className="w-full justify-start py-6"
                  onClick={() => {
                    setActiveTab(item.name);
                  }}
                >
                  {item.icon}
                  <span className="text-[0.95rem]">{item.name}</span>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="w-[75%]">
        {activeTab === SETTING_NAME.home && <Home />}
        {activeTab === SETTING_NAME.personalize && <Personalize />}
      </div>
    </div>
  );
};

export default SettingContent;
