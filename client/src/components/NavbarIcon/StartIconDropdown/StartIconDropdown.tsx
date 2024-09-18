import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useNavbarStore } from "@/lib/store";
import { v4 as uuidv4 } from "uuid";
import { APP_TYPE } from "@/lib/types";
import { APP_NAME, FILE_EXPLORER_APP_NAME } from "@/lib/utils";
import { logOut } from "@/lib/firebase.auth";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  FaRegMoon,
  FaMicrosoft,
  FaSearch,
  FaEdge,
  FaFolder,
} from "react-icons/fa";
import { IoPower, IoSettingsSharp } from "react-icons/io5";
import { VscDebugRestart, VscSignOut } from "react-icons/vsc";
import { IoIosMore } from "react-icons/io";
import { PiNotepadFill } from "react-icons/pi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BrowserContent from "@/components/WindowContentCpn/BrowserContent/BrowserContent";
import FolderContent from "@/components/WindowContentCpn/FolderContent/FolderContent";
import StartAppIcon from "../StartAppIcon/StartAppIcon";
import StartAppIcon2 from "../StartAppIcon2/StartAppIcon2";
import SettingContent from "@/components/WindowContentCpn/SettingContent/SettingContent";
import NotepadContent from "@/components/WindowContentCpn/FolderContent/NotepadContent/NotepadContent";

const PINNED_APP_LIST: APP_TYPE[] = [
  {
    iconUrl: "/Icons/applications/edge.ico",
    iconName: "Microsoft Edge",
    iconWidth: 40,
    iconHeight: 40,
    targetElement: <BrowserContent />,
    targetElementname: APP_NAME.browser,
    targetElementTabName: "New Tab",
    targetElementTabIcon: <FaEdge size={15} />,
    isTargetElementTab: true,
  },
  {
    iconUrl: "/Icons/folders/explorer.ico",
    iconName: "File Explorer",
    iconWidth: 40,
    iconHeight: 40,
    targetElement: <FolderContent />,
    targetElementname: APP_NAME.file_explorer,
    targetElementTabName: "Folder",
    targetElementTabIcon: <FaFolder size={15} />,
    isTargetElementTab: true,
  },
  {
    iconUrl: "/Icons/applications/settings.ico",
    iconName: "Settings",
    iconWidth: 40,
    iconHeight: 40,
    targetElement: <SettingContent />,
    targetElementname: APP_NAME.settings,
    targetElementTabName: "Folder",
    targetElementTabIcon: <IoSettingsSharp size={15} />,
    isTargetElementTab: false,
  },
  {
    iconUrl: "/Icons/applications/notepad.ico",
    iconName: "Notepad",
    iconWidth: 45,
    iconHeight: 45,
    targetElement: <NotepadContent />,
    targetElementname: FILE_EXPLORER_APP_NAME.notepad,
    targetElementTabName: "Untitled",
    targetElementTabIcon: <PiNotepadFill size={20} />,
    isTargetElementTab: true,
  },
];

const RECOMMENDED_APP_LIST: APP_TYPE[] = [
  {
    iconUrl: "/Icons/applications/edge.ico",
    iconName: "Microsoft Edge",
    iconWidth: 30,
    iconHeight: 30,
    targetElement: <BrowserContent />,
    targetElementname: APP_NAME.browser,
    targetElementTabName: "New Tab",
    targetElementTabIcon: <FaEdge size={15} />,
    isTargetElementTab: true,
    lastOpenedTime: "Recently opended",
  },
  {
    iconUrl: "/Icons/folders/explorer.ico",
    iconName: "File Explorer",
    iconWidth: 30,
    iconHeight: 30,
    targetElement: <div>Hello</div>,
    targetElementname: APP_NAME.file_explorer,
    targetElementTabName: "Folder",
    targetElementTabIcon: <FaFolder size={15} />,
    isTargetElementTab: true,
    lastOpenedTime: "30 minutes ago",
  },
];

const StartIconDropdown = () => {
  const router = useRouter();

  const [windowStatus, setWindowStatus] = useState<string>("turn on");
  const [search, setSearch] = useState<string>("");

  const startDropdownRef = useRef<any>(null);

  const isOpenStart = useNavbarStore((state) => {
    return state.isOpenStart;
  });

  const updateIsOpenStart = useNavbarStore((state) => {
    return state.updateIsOpenStart;
  });

  const handleClickElement = (event: any) => {
    if (
      startDropdownRef.current &&
      !startDropdownRef.current.contains(event.target) &&
      !event.target.className.includes("start-icon")
    ) {
      console.log("Clicked outside start menu dropdown");
      updateIsOpenStart(false);
    }
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search !== "") {
      console.log("Search:", search);
      setSearch("");
    }
  };

  const handleShutDown = async () => {
    try {
      await logOut();
      router.push("/");
    } catch (error) {
      console.log("LOGOUT ERROR:", error);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickElement);

    return () => {
      document.removeEventListener("mousedown", handleClickElement);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (windowStatus !== "turn on") {
      console.log(windowStatus);
    }
  }, [windowStatus]);

  return (
    <AnimatePresence>
      {isOpenStart && (
        <motion.div
          ref={startDropdownRef}
          className="absolute z-[999] min-w-[600px] max-w-[600px] bottom-[60px]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        >
          <div className="px-12 py-3 bg-[#efefef] dark:bg-[#252525] rounded-t-md flex flex-col gap-5">
            <form
              className="relative w-full"
              onSubmit={(e) => {
                handleSearch(e);
              }}
            >
              <FaSearch className="absolute left-3 top-0 bottom-0 my-auto" />
              <input
                className="w-full px-10 py-2 rounded-2xl text-sm outline-none"
                placeholder="Search for apps, settings and documents"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </form>
            <Tabs defaultValue="pinned" className="w-full">
              <TabsList className="w-full bg-[#efefef] dark:bg-[#252525] flex justify-between">
                <h1 className="text-black dark:text-white text-md font-bold">
                  Pinned
                </h1>
                <div>
                  <TabsTrigger value="pinned">Pinned</TabsTrigger>
                  <TabsTrigger value="all-apps">All apps</TabsTrigger>
                </div>
              </TabsList>
              <TabsContent value="pinned">
                <div className="grid grid-cols-5 gap-3">
                  {PINNED_APP_LIST?.map((app: APP_TYPE) => {
                    return (
                      <StartAppIcon
                        key={uuidv4()}
                        iconUrl={app?.iconUrl ? app?.iconUrl : ""}
                        iconName={app?.iconName ? app?.iconName : ""}
                        iconWidth={app?.iconWidth ? app?.iconWidth : 0}
                        iconHeight={app?.iconHeight ? app?.iconHeight : 0}
                        targetElement={
                          app?.targetElement ? app?.targetElement : <></>
                        }
                        targetElementname={
                          app?.targetElementname ? app?.targetElementname : ""
                        }
                        targetElementTabName={
                          app?.targetElementTabName
                            ? app?.targetElementTabName
                            : ""
                        }
                        targetElementTabIcon={
                          app?.targetElementTabIcon ? (
                            app?.targetElementTabIcon
                          ) : (
                            <></>
                          )
                        }
                        isTargetElementTab={
                          app?.isTargetElementTab
                            ? app?.isTargetElementTab
                            : false
                        }
                      />
                    );
                  })}
                </div>
              </TabsContent>
              <TabsContent value="all-apps">All apps</TabsContent>
            </Tabs>
            <Tabs defaultValue="recommended" className="w-full">
              <TabsList className="w-full bg-[#efefef] dark:bg-[#252525] flex justify-between">
                <h1 className="text-black dark:text-white text-md font-bold">
                  Recommended
                </h1>
                <div>
                  <TabsTrigger value="recommended">Recommended</TabsTrigger>
                  <TabsTrigger value="all-recommendeds">More</TabsTrigger>
                </div>
              </TabsList>
              <TabsContent value="recommended">
                <div className="grid grid-cols-2 gap-3">
                  {RECOMMENDED_APP_LIST?.map((app: APP_TYPE) => {
                    return (
                      <StartAppIcon2
                        key={uuidv4()}
                        iconUrl={app?.iconUrl ? app?.iconUrl : ""}
                        iconName={app?.iconName ? app?.iconName : ""}
                        iconWidth={app?.iconWidth ? app?.iconWidth : 0}
                        iconHeight={app?.iconHeight ? app?.iconHeight : 0}
                        targetElement={
                          app?.targetElement ? app?.targetElement : <></>
                        }
                        targetElementname={
                          app?.targetElementname ? app?.targetElementname : ""
                        }
                        targetElementTabName={
                          app?.targetElementTabName
                            ? app?.targetElementTabName
                            : ""
                        }
                        targetElementTabIcon={
                          app?.targetElementTabIcon ? (
                            app?.targetElementTabIcon
                          ) : (
                            <></>
                          )
                        }
                        isTargetElementTab={
                          app?.isTargetElementTab
                            ? app?.isTargetElementTab
                            : false
                        }
                        lastOpenedTime={
                          app?.lastOpenedTime ? app?.lastOpenedTime : ""
                        }
                      />
                    );
                  })}
                </div>
              </TabsContent>
              <TabsContent value="all-recommendeds">
                All recommendeds
              </TabsContent>
            </Tabs>
          </div>
          <div
            className="w-full bg-white px-12 py-3 dark:bg-[#161616]
                        flex items-center justify-between rounded-b-md"
          >
            <div className="h-full flex gap-5 items-center">
              <Popover>
                <PopoverTrigger>
                  <div
                    className="px-4 py-1 rounded-md flex gap-5 items-center
                                  hover:bg-[#efefef] dark:hover:bg-[#4f4f4f]"
                  >
                    <Avatar className="w-9 h-9">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>T</AvatarFallback>
                    </Avatar>
                    <p className="text-sm hover:cursor-default">Minh Tri</p>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-[350px] flex">
                  <div className="w-full h-full flex flex-col gap-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FaMicrosoft size={20} />
                        <h1 className="text-md font-bold">Microsoft</h1>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <IoIosMore size={20} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <VscSignOut className="mr-3" size={20} />
                            <span>Sign out</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="h-full flex gap-5">
                      <div className="h-full flex items-center gap-5">
                        <Avatar className="w-16 h-16">
                          <AvatarImage
                            src="https://github.com/shadcn.png"
                            alt="@shadcn"
                          />
                          <AvatarFallback>T</AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="h-full flex flex-col items-start">
                        <h1 className="text-lg font-bold">Minh Tri</h1>
                        <p className="text-sm text-zinc-400">Local account</p>
                        <p className="text-sm text-sky-500 hover:text-sky-400 hover:cursor-pointer">
                          Manage my account
                        </p>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <div className="h-full flex gap-5 items-center">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="p-2 rounded-md hover:bg-[#efefef] dark:hover:bg-[#4f4f4f] hover:cursor-default">
                    <IoPower size={22} />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => {
                      setWindowStatus("sleep");
                    }}
                  >
                    <FaRegMoon className="mr-3" size={18} />
                    <span>Sleep</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setWindowStatus("shutdown");
                      handleShutDown();
                    }}
                  >
                    <IoPower className="mr-3" size={18} />
                    <span>Shutdown</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setWindowStatus("restart");
                    }}
                  >
                    <VscDebugRestart className="mr-3" size={20} />
                    <span>Restart</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StartIconDropdown;
