import { FormEvent, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  useNavbarStore,
  useSettingStore,
  useFileExplorerWindowStore,
  useWindowStore,
} from "@/lib/store";
import { APP_TYPE } from "@/lib/types";
import WindowCpn from "@/components/WindowCpn/WindowCpn";
import {
  autoGenerateName,
  FILE_EXPLORER_APP_NAME,
  FILE_EXPLORER_TAB_NAME,
  getAppByName,
  IMAGE_TYPES,
} from "@/lib/utils";
import {} from "@/components/DestopNavbar/DestopNavbar";
import { PiNotepadFill } from "react-icons/pi";
import {
  FaArrowLeft,
  FaArrowRight,
  FaArrowUp,
  FaChevronRight,
  FaSearch,
  FaFolder,
  FaAngleDown,
} from "react-icons/fa";
import {
  FaComputer,
  FaCopy,
  FaPaste,
  FaShareFromSquare,
  FaTrashCan,
} from "react-icons/fa6";
import { TbReload, TbCut } from "react-icons/tb";
import { GoHome } from "react-icons/go";
import { IoMdAddCircleOutline, IoMdGlobe } from "react-icons/io";
import {
  MdShortcut,
  MdOutlineFolderZip,
  MdOutlineDesktopWindows,
  MdOutlineFileDownload,
  MdMusicNote,
  MdMoreHoriz,
} from "react-icons/md";
import { AiOutlineFileImage } from "react-icons/ai";
import { SiMicrosoftword, SiMicrosoftexcel } from "react-icons/si";
import { PiMicrosoftPowerpointLogoFill } from "react-icons/pi";
import { IoLibrary, IoHomeOutline } from "react-icons/io5";
import { GrGallery, GrOnedrive } from "react-icons/gr";
import { ImFileText2, ImFilm } from "react-icons/im";
import { SlPicture } from "react-icons/sl";
import { BiSolidRename } from "react-icons/bi";
import NotepadContent from "./NotepadContent/NotepadContent";
import FileExplorerIcon from "@/components/FileExplorerIcon/FileExplorerIcon";
import { Button } from "@/components/ui/button";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  checkIfExistKeyStorage,
  COLLECTION_NAME,
  createNewTextDocument,
  getFileExplorerList,
  getStorageFileList,
} from "@/lib/firebase.api";

export const FILE_EXPLORER_APP_LIST: APP_TYPE[] = [
  {
    iconUrl: "/Icons/files/text.ico",
    iconName: "New Text Document",
    iconWidth: 50,
    iconHeight: 50,
    targetElement: <NotepadContent />,
    targetElementname: FILE_EXPLORER_APP_NAME.text_document,
    targetElementTabName: "Untitled",
    targetElementTabIcon: <PiNotepadFill size={20} />,
    isTargetElementTab: true,
  },
  {
    iconUrl: "/Icons/applications/photo.ico",
    iconName: "New Picture",
    iconWidth: 50,
    iconHeight: 50,
    targetElement: <div>Pictures content</div>,
    targetElementname: FILE_EXPLORER_APP_NAME.pictures,
    targetElementTabName: "New Picture",
    targetElementTabIcon: <SlPicture size={20} />,
    isTargetElementTab: false,
  },
];

const SLIDEBAR_ITEMS = [
  {
    name: FILE_EXPLORER_TAB_NAME.home,
    icon: <IoHomeOutline className="mr-3" size={20} />,
  },
  {
    name: FILE_EXPLORER_TAB_NAME.gallery,
    icon: <GrGallery className="mr-3" size={20} />,
  },
  {
    name: FILE_EXPLORER_TAB_NAME.oneDrive,
    icon: <GrOnedrive className="mr-3" size={20} />,
  },
  {
    name: "separator",
    icon: (
      <div className="w-[80%] h-[1px] my-2 rounded-md mx-auto bg-zinc-400 dark:bg-zinc-600"></div>
    ),
  },
  {
    name: FILE_EXPLORER_TAB_NAME.desktop,
    icon: <MdOutlineDesktopWindows className="mr-3" size={20} />,
  },
  {
    name: FILE_EXPLORER_TAB_NAME.downloads,
    icon: <MdOutlineFileDownload className="mr-3" size={20} />,
  },
  {
    name: FILE_EXPLORER_TAB_NAME.documents,
    icon: <ImFileText2 className="mr-3" size={20} />,
  },
  {
    name: FILE_EXPLORER_TAB_NAME.pictures,
    icon: <SlPicture className="mr-3" size={20} />,
  },
  {
    name: FILE_EXPLORER_TAB_NAME.music,
    icon: <MdMusicNote className="mr-3" size={20} />,
  },
  {
    name: FILE_EXPLORER_TAB_NAME.videos,
    icon: <ImFilm className="mr-3" size={20} />,
  },
  {
    name: "separator",
    icon: (
      <div className="w-[80%] h-[1px] my-2 rounded-md mx-auto bg-zinc-400 dark:bg-zinc-600"></div>
    ),
  },
  {
    name: FILE_EXPLORER_TAB_NAME.thisPC,
    icon: <FaComputer className="mr-3" size={20} />,
  },
  {
    name: FILE_EXPLORER_TAB_NAME.network,
    icon: <IoMdGlobe className="mr-3" size={20} />,
  },
];

const FolderContent = () => {
  const fileExplorerTab = useFileExplorerWindowStore((state) => {
    return state.fileExplorerTab;
  });

  const [constraints, setConstraints] = useState<any>({});
  const [searchClient, setSearchClient] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>(
    fileExplorerTab ? fileExplorerTab : FILE_EXPLORER_TAB_NAME.thisPC
  );

  const parentChildRef = useWindowStore((state) => {
    return state.parentChildRef;
  });

  const isCloseTargetWindow = useFileExplorerWindowStore((state) => {
    return state.isCloseTargetWindow;
  });

  const isTargetWindowTab = useFileExplorerWindowStore((state) => {
    return state.isTargetWindowTab;
  });

  const targetWindow = useFileExplorerWindowStore((state) => {
    return state.targetWindow;
  });

  const targetWindowName = useFileExplorerWindowStore((state) => {
    return state.targetWindowName;
  });

  const targetWindowTabName = useFileExplorerWindowStore((state) => {
    return state.targetWindowTabName;
  });

  const targetWindowTabIcon = useFileExplorerWindowStore((state) => {
    return state.targetWindowTabIcon;
  });

  const isCloseTargetSubWindow = useFileExplorerWindowStore((state) => {
    return state.isCloseTargetSubWindow;
  });

  const itemList = useFileExplorerWindowStore((state) => {
    return state.itemList;
  });

  const updateIsCloseTargetWindow = useFileExplorerWindowStore((state) => {
    return state.updateIsCloseTargetWindow;
  });

  const updateTargetWindow = useFileExplorerWindowStore((state) => {
    return state.updateTargetWindow;
  });

  const updateTargetWindowName = useFileExplorerWindowStore((state) => {
    return state.updateTargetWindowName;
  });

  const updateItemList = useFileExplorerWindowStore((state) => {
    return state.updateItemList;
  });

  const updateAppList = useNavbarStore((state) => {
    return state.updateAppList;
  });

  const updateSettingTab = useSettingStore((state) => {
    return state.updateSettingTab;
  });

  const handleGetFileExplorerList = async () => {
    const res: any = await getFileExplorerList("asc");
    console.log(res);
    if (res?.documents) updateItemList(res?.documents);
  };

  const handleGetStorageFileList = async (path: string) => {
    const STORAGE_PATH = `gs://${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/${path}`;
    const files = await getStorageFileList(STORAGE_PATH);

    files?.map(async (file: { name: string; url: string }) => {
      const isExist = await checkIfExistKeyStorage(
        COLLECTION_NAME.FILE_EXPLORER_LIST,
        "content", // Firebase document format
        file?.url
      );

      const fileExtension = file?.name.split(".").pop()?.toLowerCase(); // Get file extension name

      // Create picture file for FILE EXPLORER LIST
      if (
        !isExist &&
        file?.url &&
        fileExtension &&
        IMAGE_TYPES.includes(fileExtension)
      ) {
        const res: any = await createNewTextDocument(
          FILE_EXPLORER_APP_NAME.pictures,
          file?.url,
          file?.name ? file?.name.split(".")[0]?.toLowerCase() : uuidv4()
        );

        console.log(res);
      }
    });

    handleGetFileExplorerList();
  };

  const handleCreateNewTextDocument = async () => {
    const fileName = autoGenerateName(itemList);

    const res: any = await createNewTextDocument(
      FILE_EXPLORER_APP_NAME.text_document,
      "",
      fileName ? fileName : uuidv4()
    );

    console.log(res);
    handleGetFileExplorerList();
  };

  useEffect(() => {
    if (parentChildRef?.current) {
      const { clientWidth, clientHeight } = parentChildRef?.current;

      setConstraints({
        left: -clientWidth / 2,
        right: clientWidth / 2,
        top: -clientHeight / 2 + 330,
        bottom: clientHeight / 2,
      });
    }
  }, [parentChildRef]);

  useEffect(() => {
    if (activeTab === FILE_EXPLORER_TAB_NAME.documents)
      handleGetFileExplorerList();
    if (activeTab === FILE_EXPLORER_TAB_NAME.pictures)
      handleGetStorageFileList("file_explorer/pictures");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const handleSearchClient = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchClient("");
  };

  return (
    <>
      {targetWindow !== null && !isCloseTargetSubWindow && (
        <WindowCpn
          constraints={constraints}
          contentCpn={targetWindow}
          isCloseTargetWindow={isCloseTargetWindow}
          isTargetWindowTab={isTargetWindowTab}
          targetWindowName={targetWindowName}
          targetWindowTabName={targetWindowTabName}
          targetWindowTabIcon={targetWindowTabIcon}
          updateIsCloseTargetWindow={updateIsCloseTargetWindow}
          updateTargetWindow={updateTargetWindow}
          updateTargetWindowName={updateTargetWindowName}
          updateAppList={updateAppList}
          updateSettingTab={updateSettingTab}
        />
      )}
      <div className="w-full h-full rounded-b-md text-black dark:text-white bg-[#efefef] dark:bg-[#252525]">
        <header className="h-[8%] min-h-[40px] pr-4 text-black dark:text-white bg-zinc-300 dark:bg-[#3c3c3c]">
          <div className="w-full h-full flex items-center justify-between gap-3">
            <div className="min-w-[230px] max-w-[230px] h-full flex items-center justify-center gap-3">
              <button className="p-3 rounded-md hover:bg-zinc-200 dark:hover:bg-[#4f4f4f]">
                <FaArrowLeft size={15} />
              </button>
              <button className="p-3 rounded-md hover:bg-zinc-200 dark:hover:bg-[#4f4f4f]">
                <FaArrowRight size={15} />
              </button>
              <button className="p-3 rounded-md hover:bg-zinc-200 dark:hover:bg-[#4f4f4f]">
                <FaArrowUp size={15} />
              </button>
              <button className="p-3 rounded-md hover:bg-zinc-200 dark:hover:bg-[#4f4f4f]">
                <TbReload size={18} />
              </button>
            </div>
            <div className="w-[58%] px-4 py-2 bg-[#efefef] dark:bg-[#282828] rounded-md flex items-center gap-4">
              <GoHome size={20} />
              <FaChevronRight size={12} />
              <p className="text-sm">{activeTab}</p>
            </div>
            <form
              className="relative w-[20%] flex items-center"
              onSubmit={(e) => {
                handleSearchClient(e);
              }}
            >
              <input
                className="w-full pl-4 pr-8 py-2 text-sm rounded-md bg-[#efefef] dark:bg-[#282828]
                            focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Search client"
                value={searchClient}
                onChange={(e) => {
                  setSearchClient(e.target.value);
                }}
              />
              <FaSearch size={15} className="absolute right-3" />
            </form>
          </div>
        </header>
        <div
          className="h-[8%] min-h-[40px] px-2 text-black dark:text-white bg-zinc-200 dark:bg-[#282828]
                        flex items-center gap-3"
        >
          <Menubar className="rounded-none bg-zinc-200 dark:bg-[#282828]">
            <MenubarMenu>
              <MenubarTrigger className="hover:bg-zinc-300 dark:hover:bg-zinc-700">
                <div className="flex items-center gap-3">
                  <IoMdAddCircleOutline size={25} />
                  <span className="text-sm">New</span>
                  <FaAngleDown size={15} />
                </div>
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  <FaFolder className="mr-3" size={15} />
                  <span>Folder</span>
                </MenubarItem>
                <MenubarItem>
                  <MdShortcut className="mr-3" size={15} />
                  <span>Shortcut</span>
                </MenubarItem>
                <MenubarItem>
                  <AiOutlineFileImage className="mr-3" size={15} />
                  <span>Bitmap image</span>
                </MenubarItem>
                <MenubarItem>
                  <SiMicrosoftword className="mr-3" size={15} />
                  <span>Microsoft Word Document</span>
                </MenubarItem>
                <MenubarItem>
                  <PiMicrosoftPowerpointLogoFill className="mr-3" size={15} />
                  <span>Microsoft PowerPoint Presentation</span>
                </MenubarItem>
                <MenubarItem>
                  <IoLibrary className="mr-3" size={15} />
                  <span>WinRAR archive</span>
                </MenubarItem>
                <MenubarItem
                  onClick={() => {
                    handleCreateNewTextDocument();
                  }}
                >
                  <PiNotepadFill className="mr-3" size={15} />
                  <span>Text Document</span>
                </MenubarItem>
                <MenubarItem>
                  <SiMicrosoftexcel className="mr-3" size={15} />
                  <span>Microsoft Excel Worksheet</span>
                </MenubarItem>
                <MenubarItem>
                  <MdOutlineFolderZip className="mr-3" size={15} />
                  <span>WinRAR ZIP archive</span>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
          <div className="w-[1px] h-[45%] bg-zinc-400 dark:bg-zinc-600"></div>
          <div className="p-2 rounded-md hover:bg-zinc-300 hover:dark:bg-zinc-700">
            <TbCut size={20} />
          </div>
          <div className="p-2 rounded-md hover:bg-zinc-300 hover:dark:bg-zinc-700">
            <FaCopy size={20} />
          </div>
          <div className="p-2 rounded-md hover:bg-zinc-300 hover:dark:bg-zinc-700">
            <FaPaste size={20} />
          </div>
          <div className="p-2 rounded-md hover:bg-zinc-300 hover:dark:bg-zinc-700">
            <BiSolidRename size={20} />
          </div>
          <div className="p-2 rounded-md hover:bg-zinc-300 hover:dark:bg-zinc-700">
            <FaShareFromSquare size={20} />
          </div>
          <div className="p-2 rounded-md hover:bg-zinc-300 hover:dark:bg-zinc-700">
            <FaTrashCan size={20} />
          </div>
          <div className="w-[1px] h-[45%] bg-zinc-400 dark:bg-zinc-600"></div>
          <div className="p-2 rounded-md hover:bg-zinc-300 hover:dark:bg-zinc-700">
            <MdMoreHoriz size={20} />
          </div>
        </div>
        <div className="h-[84%] flex items-center">
          <div
            className="w-[180px] h-full p-1 overflow-y-auto
                        border-r border-zinc-300 dark:border-zinc-600"
          >
            {SLIDEBAR_ITEMS?.map(
              (item: { name: string; icon: React.ReactElement }) => {
                if (item?.name === "separator")
                  return <div key={uuidv4()}>{item?.icon}</div>;

                return (
                  <Button
                    key={uuidv4()}
                    variant={"ghost"}
                    className={`relative w-full justify-start py-4 rounded-sm
                  hover:bg-zinc-200 dark:hover:text-white dark:hover:bg-zinc-600 ${
                    activeTab === item.name &&
                    "bg-zinc-300 dark:text-white dark:bg-zinc-700"
                  }`}
                    onClick={() => {
                      setActiveTab(item?.name);
                    }}
                  >
                    {item?.icon}
                    <span className="text-xs">{item?.name}</span>
                  </Button>
                );
              }
            )}
          </div>
          {activeTab === FILE_EXPLORER_TAB_NAME.documents && (
            <div className="h-full p-4 flex gap-1 flex-wrap overflow-y-auto">
              {itemList?.map((item: APP_TYPE) => {
                const itemData = getAppByName(
                  FILE_EXPLORER_APP_LIST,
                  item?.type ? item?.type : ""
                );

                // item.type === "text_document"
                if (item?.type === FILE_EXPLORER_APP_NAME.text_document) {
                  return (
                    <FileExplorerIcon
                      key={uuidv4()}
                      iconUrl={itemData?.iconUrl ? itemData?.iconUrl : ""}
                      iconName={
                        item?.targetElementTabName
                          ? item?.targetElementTabName
                          : ""
                      }
                      iconWidth={itemData?.iconWidth ? itemData?.iconWidth : 0}
                      iconHeight={
                        itemData?.iconHeight ? itemData?.iconHeight : 0
                      }
                      targetElement={
                        itemData?.targetElement ? (
                          itemData?.targetElement
                        ) : (
                          <></>
                        )
                      }
                      targetElementname={
                        itemData?.targetElementname
                          ? itemData?.targetElementname
                          : ""
                      }
                      targetElementTabName={
                        item?.targetElementTabName
                          ? item?.targetElementTabName
                          : ""
                      }
                      targetElementTabIcon={
                        itemData?.targetElementTabIcon ? (
                          itemData?.targetElementTabIcon
                        ) : (
                          <></>
                        )
                      }
                      isTargetElementTab={
                        itemData?.isTargetElementTab
                          ? itemData?.isTargetElementTab
                          : false
                      }
                      itemData={item ? item : null}
                    />
                  );
                }
              })}
            </div>
          )}
          {activeTab === FILE_EXPLORER_TAB_NAME.pictures && (
            <div className="h-full p-4 flex gap-1 flex-wrap overflow-y-auto">
              {itemList?.map((item: APP_TYPE) => {
                const itemData = getAppByName(
                  FILE_EXPLORER_APP_LIST,
                  item?.type ? item?.type : ""
                );

                // item.type === "pictures"
                if (item?.type === FILE_EXPLORER_APP_NAME.pictures) {
                  return (
                    <FileExplorerIcon
                      key={uuidv4()}
                      iconUrl={item?.content ? item?.content : ""}
                      iconName={
                        item?.targetElementTabName
                          ? item?.targetElementTabName
                          : ""
                      }
                      iconWidth={itemData?.iconWidth ? itemData?.iconWidth : 0}
                      iconHeight={
                        itemData?.iconHeight ? itemData?.iconHeight : 0
                      }
                      targetElement={
                        itemData?.targetElement ? (
                          itemData?.targetElement
                        ) : (
                          <></>
                        )
                      }
                      targetElementname={
                        itemData?.targetElementname
                          ? itemData?.targetElementname
                          : ""
                      }
                      targetElementTabName={
                        item?.targetElementTabName
                          ? item?.targetElementTabName
                          : ""
                      }
                      targetElementTabIcon={
                        itemData?.targetElementTabIcon ? (
                          itemData?.targetElementTabIcon
                        ) : (
                          <></>
                        )
                      }
                      isTargetElementTab={
                        itemData?.isTargetElementTab
                          ? itemData?.isTargetElementTab
                          : false
                      }
                      itemData={item ? item : null}
                    />
                  );
                }
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FolderContent;
