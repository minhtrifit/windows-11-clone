import { useEffect, useState } from "react";
import { useSettingStore } from "@/lib/store";
import { SETTING_NAME } from "@/lib/utils";
import { v4 as uuidv4 } from "uuid";
import { IoHomeOutline, IoAccessibilitySharp } from "react-icons/io5";
import { FaPaintbrush, FaGamepad, FaShield } from "react-icons/fa6";
import { FaBluetooth, FaWifi, FaUser } from "react-icons/fa";
import { PiAppWindowDuotone } from "react-icons/pi";
import { AiFillAppstore } from "react-icons/ai";
import { MdLanguage } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Personalize from "./Personalize";
import Home from "./Home";
import "./style.css";

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
    name: SETTING_NAME.bluetooth_and_devices,
    icon: <FaBluetooth className="mr-3" size={20} />,
  },
  {
    name: SETTING_NAME.network_and_internet,
    icon: <FaWifi className="mr-3" size={20} />,
  },
  {
    name: SETTING_NAME.personalize,
    icon: <FaPaintbrush className="mr-3" size={20} />,
  },
  {
    name: SETTING_NAME.apps,
    icon: <AiFillAppstore className="mr-3" size={20} />,
  },
  {
    name: SETTING_NAME.accounts,
    icon: <FaUser className="mr-3" size={20} />,
  },
  {
    name: SETTING_NAME.time_and_language,
    icon: <MdLanguage className="mr-3" size={20} />,
  },
  {
    name: SETTING_NAME.gaming,
    icon: <FaGamepad className="mr-3" size={20} />,
  },
  {
    name: SETTING_NAME.accessibility,
    icon: <IoAccessibilitySharp className="mr-3" size={20} />,
  },
  {
    name: SETTING_NAME.privacy_and_security,
    icon: <FaShield className="mr-3" size={20} />,
  },
  {
    name: SETTING_NAME.windows_update,
    icon: <GrUpdate className="mr-3" size={20} />,
  },
];

const SettingContent = () => {
  const settingTab = useSettingStore((state) => {
    return state.settingTab;
  });

  const [activeTab, setActiveTab] = useState<string>(
    settingTab ? settingTab : SETTING_NAME.home
  );

  const updateSettingTab = useSettingStore((state) => {
    return state.updateSettingTab;
  });

  const handleUpdateSettingTab = (tabName: string) => {
    updateSettingTab(tabName);
  };

  useEffect(() => {
    if (settingTab !== "") setActiveTab(settingTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settingTab]);

  return (
    <div className="w-full h-full rounded-b-md flex text-black dark:text-white bg-[#efefef] dark:bg-[#252525]">
      <div className="w-[25%] h-full space-y-4 px-2 py-4">
        <div
          className="h-[10%] px-4 py-2 rounded-md flex gap-5 items-center
                        hover:bg-zinc-200 dark:hover:bg-[#4f4f4f] hover:cursor-default"
          onClick={() => {
            handleUpdateSettingTab(SETTING_NAME.accounts);
          }}
        >
          <Avatar className="w-12 h-12">
            <AvatarImage src="/assets/avatar.png" alt="@shadcn" />
            <AvatarFallback>T</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-md font-bold">Minh Tri</h1>
            <p className="text-xs">Local Account</p>
          </div>
        </div>
        <div className="h-[90%] space-y-1 overflow-y-auto">
          {SLIDEBAR_ITEMS?.map((item: any) => {
            return (
              <Button
                key={uuidv4()}
                size="sm"
                variant={"ghost"}
                className={`relative w-full justify-start py-6
                            hover:bg-zinc-200 dark:hover:text-white dark:hover:bg-zinc-600 ${
                              activeTab === item.name &&
                              "bg-zinc-300 dark:text-white dark:bg-zinc-700"
                            }`}
                onClick={() => {
                  handleUpdateSettingTab(item.name);
                }}
              >
                {activeTab === item.name && (
                  <div className="absolute left-0 w-[5px] h-[50%] rounded-md bg-sky-400"></div>
                )}
                {item.icon}
                <span className="text-[0.95rem]">{item.name}</span>
              </Button>
            );
          })}
        </div>
      </div>
      <div className="w-[75%] overflow-y-auto">
        {activeTab === SETTING_NAME.home && <Home />}
        {activeTab === SETTING_NAME.personalize && <Personalize />}
      </div>
    </div>
  );
};

export default SettingContent;
