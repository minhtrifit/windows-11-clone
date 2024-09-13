import Image from "next/image";
import { useTheme } from "next-themes";
import { usePersonalizeSettingStore } from "@/lib/store";
import { v4 as uuidv4 } from "uuid";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FaImage, FaPaintbrush } from "react-icons/fa6";
import { IoColorPaletteOutline } from "react-icons/io5";
import {
  MdOutlineLightMode,
  MdOutlineScreenLockLandscape,
  MdKeyboard,
} from "react-icons/md";
import { IoMdApps } from "react-icons/io";
import { TbLayoutNavbar, TbDeviceDesktopCheck } from "react-icons/tb";
import { RiFontSize } from "react-icons/ri";
import BackgroundContent from "./PersonalizeContent/BackgroundContent";

const THEME_LIST = [
  {
    name: "light",
    content: (
      <div className="absolute bottom-2 right-2 w-[50px] h-[40px] bg-white rounded-md">
        <div className="relative w-[100%] h-[100%]">
          <div className="absolute w-[30px] h-[10px] bottom-2 left-0 right-0 mx-auto bg-zinc-300 rounded-sm"></div>
        </div>
      </div>
    ),
  },
  {
    name: "dark",
    content: (
      <div className="absolute bottom-2 right-2 w-[50px] h-[40px] bg-black rounded-md">
        <div className="relative w-[100%] h-[100%]">
          <div className="absolute w-[30px] h-[10px] bottom-2 left-0 right-0 mx-auto bg-[#252525] rounded-sm"></div>
        </div>
      </div>
    ),
  },
];

const PERSONALIZE_LIST = [
  {
    value: "background",
    name: "Background",
    description: "Background image, color, slideshow",
    icon: <FaImage size={25} />,
    content: <BackgroundContent />,
  },
  {
    value: "colors",
    name: "Colors",
    description: "Accent color, transparentcy effects, color theme",
    icon: <IoColorPaletteOutline size={25} />,
    content: <div>Colors content</div>,
  },
  {
    value: "themes",
    name: "Themes",
    description: "Install, create, manage",
    icon: <FaPaintbrush size={25} />,
    content: <div>Themes content</div>,
  },
  {
    value: "dynamic_lighting",
    name: "Dynamic Lighting",
    description: "Connected devices, effects, app settings",
    icon: <MdOutlineLightMode size={25} />,
    content: <div>Dynamic Lighting content</div>,
  },
  {
    value: "lock_screen",
    name: "Lock Screen",
    description: "Lock screen, images, apps, animations",
    icon: <MdOutlineScreenLockLandscape size={25} />,
    content: <div>Lock Screen content</div>,
  },
  {
    value: "text_input",
    name: "Text Input",
    description:
      "Touch keyboard, voice typing, emoji and more, input method editor",
    icon: <MdKeyboard size={25} />,
    content: <div>Text Input content</div>,
  },
  {
    value: "start",
    name: "Start",
    description: "Recent apps and items, folders",
    icon: <IoMdApps size={25} />,
    content: <div>Start content</div>,
  },
  {
    value: "taskbar",
    name: "Taskbar",
    description: "Taskbar behaviors, system pins",
    icon: <TbLayoutNavbar size={25} />,
    content: <div>Taskbar content</div>,
  },
  {
    value: "fonts",
    name: "Fonts",
    description: "Install, manage",
    icon: <RiFontSize size={25} />,
    content: <div>Taskbar content</div>,
  },
  {
    value: "device_usage",
    name: "Device usage",
    description:
      "Select all the ways you plan to see your device to get personalized tips, and recommendations within Microsoft experiences",
    icon: <TbDeviceDesktopCheck size={25} />,
    content: <div>Device usage content</div>,
  },
];

const Personalize = () => {
  const { theme, setTheme } = useTheme();

  const backgroundUrl = usePersonalizeSettingStore((state) => {
    return state.backgroundUrl;
  });

  return (
    <div className="flex flex-col p-4 gap-5">
      <h1 className="text-2xl font-bold">Personalize</h1>
      <div className="flex">
        <div className="w-[40%] min-w-[300px] h-[200px] rounded-md flex border-[5px] border-[#efefef] dark:border-[#4f4f4f]">
          <Image
            src={backgroundUrl}
            alt="background"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div className="w-[60%] px-10">
          <h1 className="text-sm font-bold mb-3">Select theme to apply</h1>
          <div className="flex items-center flex-wrap gap-3">
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
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{ width: "100%", height: "100%" }}
                    />
                    {t?.content}
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
      <Accordion type="multiple">
        {PERSONALIZE_LIST?.map(
          (item: {
            value: string;
            name: string;
            description: string;
            icon: React.ReactElement;
            content: React.ReactElement;
          }) => {
            return (
              <AccordionItem key={uuidv4()} value={item?.value}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-5">
                    {item?.icon}
                    <div className="flex gap-1 flex-col items-start">
                      <span>{item?.name}</span>
                      <span className="text-xs text-zinc-400">
                        {item?.description}
                      </span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>{item?.content}</AccordionContent>
              </AccordionItem>
            );
          }
        )}
      </Accordion>
    </div>
  );
};

export default Personalize;
