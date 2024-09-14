import { useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { v4 as uuidv4 } from "uuid";
import { usePersonalizeSettingStore, useSettingStore } from "@/lib/store";
import { SETTING_NAME } from "@/lib/utils";
import { FaChevronRight } from "react-icons/fa";
import { FaComputer, FaBluetoothB } from "react-icons/fa6";
import { GrUpdate } from "react-icons/gr";
import { TbLayoutNavbar } from "react-icons/tb";
import { CgScreen } from "react-icons/cg";
import { LuMousePointer2 } from "react-icons/lu";
import { IoColorPaletteOutline } from "react-icons/io5";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { THEME_LIST } from "./Personalize";

const REOMMENDED_LIST = [
  {
    name: "Taskbar",
    icon: <TbLayoutNavbar size={25} />,
    direct: SETTING_NAME.personalize,
  },
  {
    name: "Display",
    icon: <CgScreen size={25} />,
    direct: SETTING_NAME.system,
  },
  {
    name: "Mouse pointer and touch",
    icon: <LuMousePointer2 size={25} />,
    direct: SETTING_NAME.accessibility,
  },
];

const Home = () => {
  const { theme, setTheme } = useTheme();

  const [isBluetoothChecked, setIsBluetoothChecked] = useState<boolean>(false);

  const backgroundUrl = usePersonalizeSettingStore((state) => {
    return state.backgroundUrl;
  });

  const updateSettingTab = useSettingStore((state) => {
    return state.updateSettingTab;
  });

  return (
    <div className="flex flex-col px-8 py-4 gap-10">
      <h1 className="text-2xl font-bold">Home</h1>
      <div className="flex justify-between flex-wrap gap-3 xl:flex-nowrap">
        <div className="h-[80px] flex gap-5">
          <div className="w-[130px] h-full rounded-md flex border-[5px] border-zinc-400 dark:border-black">
            <Image
              src={backgroundUrl}
              alt="background"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <div className="py-2 flex flex-col justify-between">
            <h1 className="w-[200px] text-md font-bold truncate">
              MY COMPUTER
            </h1>
            <p className="text-sm">All series</p>
            <p className="text-sm text-sky-500 hover:text-sky-400 hover:cursor-pointer">
              Rename
            </p>
          </div>
        </div>
        <div className="w-[60%] flex justify-end gap-[50px]">
          <div className="flex items-center gap-5">
            <FaComputer size={40} />
            <div className="flex flex-col gap-1">
              <h1>Ethernet</h1>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Connected
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <GrUpdate size={25} />
            <div className="flex flex-col gap-1">
              <h1>Windows Update</h1>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Last checked: 30 minutes go
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-start flex-wrap gap-5">
        <div className="w-[100%] xl:w-[48%] pt-4 rounded-md bg-zinc-200 dark:bg-zinc-700">
          <h1 className="px-6 text-lg font-bold">Recommended settings</h1>
          <p className="px-6 mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Recent and commonly used setting
          </p>
          <div className="mt-5 flex flex-col">
            {REOMMENDED_LIST?.map(
              (
                item: {
                  name: string;
                  icon: React.ReactElement;
                  direct: string;
                },
                index: number
              ) => {
                return (
                  <div
                    key={uuidv4()}
                    className={`px-6 py-4 flex items-center justify-between border-t-2 border-zinc-300 dark:border-black
                              hover:bg-zinc-100 dark:hover:bg-zinc-600 ${
                                index === REOMMENDED_LIST.length - 1 &&
                                "hover:rounded-b-md"
                              }`}
                    onClick={() => {
                      updateSettingTab(item?.direct);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      {item?.icon}
                      <p className="max-w-[320px] text-[0.85rem] truncate select-none">
                        {item?.name}
                      </p>
                    </div>
                    <FaChevronRight size={12} />
                  </div>
                );
              }
            )}
          </div>
        </div>
        <div className="w-[100%] xl:w-[48%] pt-4 rounded-md bg-zinc-200 dark:bg-zinc-700">
          <h1 className="px-6 text-lg font-bold">Bluetooth devices</h1>
          <p className="px-6 mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Manage, add, and remove devices
          </p>
          <div
            className={`mt-5 px-6 py-4 flex items-center justify-between border-t-2 border-zinc-300 dark:border-black`}
          >
            <div className="flex items-center gap-3">
              <FaBluetoothB size={25} />
              <p className="max-w-[320px] text-[0.85rem] truncate select-none">
                Bluetooth
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <p className="text-[0.85rem]">
                {isBluetoothChecked ? "On" : "Off"}
              </p>
              <Switch
                checked={isBluetoothChecked}
                onCheckedChange={() => {
                  setIsBluetoothChecked(!isBluetoothChecked);
                }}
              />
            </div>
          </div>
          <div
            className={`px-6 py-4 flex items-center justify-between rounded-b-md
                        border-t-2 border-zinc-300 dark:border-black
                        hover:bg-zinc-100 dark:hover:bg-zinc-600`}
            onClick={() => {
              updateSettingTab(SETTING_NAME.bluetooth_and_devices);
            }}
          >
            <div className="flex items-center gap-3">
              <p className="max-w-[320px] text-[0.85rem] truncate select-none">
                View all devices
              </p>
            </div>
            <FaChevronRight size={12} />
          </div>
        </div>
        <div className="w-[100%] xl:w-[48%] pt-4 rounded-md bg-zinc-200 dark:bg-zinc-700">
          <h1 className="px-6 text-lg font-bold">Personalize your device</h1>
          <div className="px-6 mt-4 flex items-center flex-wrap gap-1">
            {THEME_LIST?.map(
              (t: { name: string; content: React.ReactElement }) => {
                return (
                  <div
                    key={uuidv4()}
                    className={`relative w-[140px] min-w-[140px] h-[100px] flex rounded-md border-[4px] ${
                      theme === t?.name && "border-sky-600"
                    }`}
                    onClick={() => {
                      setTheme(t?.name);
                    }}
                  >
                    <Image
                      src={backgroundUrl}
                      alt="background"
                      layout="fill"
                      objectFit="cover"
                      style={{ borderRadius: "6px" }}
                      // width={0}
                      // height={0}
                      // sizes="100vw"
                      // style={{ width: "100%", height: "100%" }}
                    />
                    {t?.content}
                  </div>
                );
              }
            )}
          </div>
          <div
            className={`mt-5 px-6 py-4 flex items-center justify-between border-t-2 border-zinc-300 dark:border-black`}
          >
            <div className="flex items-center gap-3">
              <IoColorPaletteOutline size={25} />
              <p className="max-w-[320px] text-[0.85rem] truncate select-none">
                Color mode
              </p>
            </div>
            <Select
              defaultValue={theme}
              onValueChange={(value: string) => {
                setTheme(value);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div
            className={`px-6 py-4 flex items-center justify-between rounded-b-md
                        border-t-2 border-zinc-300 dark:border-black
                        hover:bg-zinc-100 dark:hover:bg-zinc-600`}
            onClick={() => {
              updateSettingTab(SETTING_NAME.bluetooth_and_devices);
            }}
          >
            <div className="flex items-center gap-3">
              <p className="max-w-[320px] text-[0.85rem] truncate select-none">
                Browse more backgrounds, colors, and themes
              </p>
            </div>
            <FaChevronRight size={12} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
