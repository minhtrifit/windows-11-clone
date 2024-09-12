"use client";

import { useEffect, useState } from "react";
import { useNavbarStore, useSettingStore, useWindowStore } from "@/lib/store";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { VscDebugRestart } from "react-icons/vsc";
import { TbArrowsSort, TbFocusAuto } from "react-icons/tb";
import { HiOutlineViewGrid } from "react-icons/hi";
import { LuLaptop2 } from "react-icons/lu";
import {
  MdDensityMedium,
  MdOutlineAddCircleOutline,
  MdShortcut,
  MdOutlineFolderZip,
} from "react-icons/md";
import { FaFolder } from "react-icons/fa";
import { FaDisplay, FaPaintbrush } from "react-icons/fa6";
import { AiOutlineFileImage } from "react-icons/ai";
import { SiMicrosoftword, SiMicrosoftexcel } from "react-icons/si";
import { PiMicrosoftPowerpointLogoFill, PiTerminalFill } from "react-icons/pi";
import { IoLibrary, IoSettingsSharp } from "react-icons/io5";
import { GrDocumentText } from "react-icons/gr";
import { CiAlignLeft } from "react-icons/ci";
import { RiSlideshowFill } from "react-icons/ri";
import { CgMoreO } from "react-icons/cg";
import { APP_NAME, SETTING_NAME } from "@/lib/utils";
import SettingContent from "../WindowContentCpn/SettingContent/SettingContent";

interface PropType {
  children?: React.ReactNode;
}

const ContextMenuCpn = (props: PropType) => {
  const { children } = props;

  const [iconSizeValue, setIconSizeValue] = useState<string>("medium");
  const [isAutoArrIcon, setIsAutoArrIcon] = useState<boolean>(false);
  const [isAlignIconGrid, setIsAlignIconGrid] = useState<boolean>(true);
  const [isShowDestopIcons, setIsShowDestopIcons] = useState<boolean>(true);

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

  const updateSettingTab = useSettingStore((state) => {
    return state.updateSettingTab;
  });

  const addAppList = useNavbarStore((state) => {
    return state.addAppList;
  });

  useEffect(() => {
    if (iconSizeValue !== "") {
      console.log("Icon size changed:", iconSizeValue);
    }
  }, [iconSizeValue]);

  const handleOpenSettingOption = (name: string) => {
    console.log("Open setting:", name);

    if (Object.values(SETTING_NAME).includes(name)) {
      updateIsCloseTargetWindow(false);
      updateTargetWindow(<SettingContent />);
      updateTargetWindowName(APP_NAME.settings);
      updateTargetWindowTabName("Settings");
      updateTargetWindowTabIcon(<IoSettingsSharp size={15} />);
      updateIsTargetWindowTab(false);

      // Navbar item update
      const settingApp = {
        iconUrl: "/Icons/applications/settings.ico",
        iconWidth: 28,
        iconHeight: 28,
        targetElement: <SettingContent />,
        targetElementname: APP_NAME.settings,
        targetElementTabName: "Settings",
        targetElementTabIcon: <IoSettingsSharp size={15} />,
        isTargetElementTab: true,
      };

      addAppList(settingApp);
    }

    if (name === SETTING_NAME.system) {
      updateSettingTab(SETTING_NAME.system);
    }

    if (name === SETTING_NAME.personalize) {
      updateSettingTab(SETTING_NAME.personalize);
    }
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex w-full h-full">
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuSub>
          <ContextMenuSubTrigger inset>
            <div>
              <ContextMenuShortcut>
                <HiOutlineViewGrid className="mr-3" size={20} />
              </ContextMenuShortcut>
            </div>
            <span>View</span>
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-[280px]">
            <ContextMenuRadioGroup
              value={iconSizeValue}
              onValueChange={setIconSizeValue}
            >
              <ContextMenuRadioItem value="large">
                <div>
                  <ContextMenuShortcut>
                    <LuLaptop2 className="mr-3" size={20} />
                  </ContextMenuShortcut>
                </div>
                Large icons
                <ContextMenuShortcut>Ctrl+Shift+2</ContextMenuShortcut>
              </ContextMenuRadioItem>
              <ContextMenuRadioItem value="medium">
                <div>
                  <ContextMenuShortcut>
                    <MdDensityMedium className="mr-3" size={20} />
                  </ContextMenuShortcut>
                </div>
                Medium icons
                <ContextMenuShortcut>Ctrl+Shift+3</ContextMenuShortcut>
              </ContextMenuRadioItem>
              <ContextMenuRadioItem value="small">
                <div>
                  <ContextMenuShortcut>
                    <HiOutlineViewGrid className="mr-3" size={20} />
                  </ContextMenuShortcut>
                </div>
                Small icons
                <ContextMenuShortcut>Ctrl+Shift+4</ContextMenuShortcut>
              </ContextMenuRadioItem>
            </ContextMenuRadioGroup>
            <ContextMenuSeparator />
            <ContextMenuCheckboxItem
              checked={isAutoArrIcon}
              onCheckedChange={setIsAutoArrIcon}
            >
              <div>
                <ContextMenuShortcut>
                  <TbFocusAuto className="mr-3" size={20} />
                </ContextMenuShortcut>
              </div>
              <span>Auto arrange icons</span>
            </ContextMenuCheckboxItem>
            <ContextMenuCheckboxItem
              checked={isAlignIconGrid}
              onCheckedChange={setIsAlignIconGrid}
            >
              <div>
                <ContextMenuShortcut>
                  <CiAlignLeft className="mr-3" size={20} />
                </ContextMenuShortcut>
              </div>
              <span>Align icons to grid</span>
            </ContextMenuCheckboxItem>
            <ContextMenuSeparator />
            <ContextMenuCheckboxItem
              checked={isShowDestopIcons}
              onCheckedChange={setIsShowDestopIcons}
            >
              <div>
                <ContextMenuShortcut>
                  <RiSlideshowFill className="mr-3" size={20} />
                </ContextMenuShortcut>
              </div>
              <span>Show destop icons</span>
            </ContextMenuCheckboxItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSub>
          <ContextMenuSubTrigger inset>
            <div>
              <ContextMenuShortcut>
                <TbArrowsSort className="mr-3" size={20} />
              </ContextMenuShortcut>
            </div>
            <span>Sort by</span>
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem>Name</ContextMenuItem>
            <ContextMenuItem>Size</ContextMenuItem>
            <ContextMenuItem>Item type</ContextMenuItem>
            <ContextMenuItem>Date modified</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuItem inset>
          <div>
            <ContextMenuShortcut>
              <VscDebugRestart className="mr-3" size={20} />
            </ContextMenuShortcut>
          </div>
          <span>Refresh</span>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger inset>
            <div>
              <ContextMenuShortcut>
                <MdOutlineAddCircleOutline className="mr-3" size={20} />
              </ContextMenuShortcut>
            </div>
            <span>New</span>
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-[280px]">
            <ContextMenuItem>
              <div>
                <ContextMenuShortcut>
                  <FaFolder className="mr-3" size={20} />
                </ContextMenuShortcut>
              </div>
              <span>Folder</span>
            </ContextMenuItem>
            <ContextMenuItem>
              <div>
                <ContextMenuShortcut>
                  <MdShortcut className="mr-3" size={20} />
                </ContextMenuShortcut>
              </div>
              <span>Shortcut</span>
            </ContextMenuItem>
            <ContextMenuItem>
              <div>
                <ContextMenuShortcut>
                  <AiOutlineFileImage className="mr-3" size={20} />
                </ContextMenuShortcut>
              </div>
              <span>Bitmap image</span>
            </ContextMenuItem>
            <ContextMenuItem>
              <div>
                <ContextMenuShortcut>
                  <SiMicrosoftword className="mr-3" size={20} />
                </ContextMenuShortcut>
              </div>
              <span>Microsoft World Document</span>
            </ContextMenuItem>
            <ContextMenuItem>
              <div>
                <ContextMenuShortcut>
                  <PiMicrosoftPowerpointLogoFill className="mr-3" size={20} />
                </ContextMenuShortcut>
              </div>
              <span>Microsoft PowerPoint Presentation</span>
            </ContextMenuItem>
            <ContextMenuItem>
              <div>
                <ContextMenuShortcut>
                  <IoLibrary className="mr-3" size={20} />
                </ContextMenuShortcut>
              </div>
              <span>WinRAR archive</span>
            </ContextMenuItem>
            <ContextMenuItem>
              <div>
                <ContextMenuShortcut>
                  <GrDocumentText className="mr-3" size={20} />
                </ContextMenuShortcut>
              </div>
              <span>Text Document</span>
            </ContextMenuItem>
            <ContextMenuItem>
              <div>
                <ContextMenuShortcut>
                  <SiMicrosoftexcel className="mr-3" size={20} />
                </ContextMenuShortcut>
              </div>
              <span>Microsoft Excel Worksheet</span>
            </ContextMenuItem>
            <ContextMenuItem>
              <div>
                <ContextMenuShortcut>
                  <MdOutlineFolderZip className="mr-3" size={20} />
                </ContextMenuShortcut>
              </div>
              <span>WinRAR ZIP achive</span>
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem
          inset
          onClick={() => {
            handleOpenSettingOption(SETTING_NAME.system);
          }}
        >
          <div>
            <ContextMenuShortcut>
              <FaDisplay className="mr-3" size={20} />
            </ContextMenuShortcut>
          </div>
          <span>Display settings</span>
        </ContextMenuItem>
        <ContextMenuItem
          inset
          onClick={() => {
            handleOpenSettingOption(SETTING_NAME.personalize);
          }}
        >
          <div>
            <ContextMenuShortcut>
              <FaPaintbrush className="mr-3" size={20} />
            </ContextMenuShortcut>
          </div>
          <span>Personalize</span>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem inset>
          <div>
            <ContextMenuShortcut>
              <PiTerminalFill className="mr-3" size={20} />
            </ContextMenuShortcut>
          </div>
          <span>Open in terminal</span>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem inset>
          <div>
            <ContextMenuShortcut>
              <CgMoreO className="mr-3" size={20} />
            </ContextMenuShortcut>
          </div>
          <span>Show more options</span>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default ContextMenuCpn;
