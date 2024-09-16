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
import { FILE_EXPLORER_APP_NAME, getAppByName } from "@/lib/utils";
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
import { TbReload } from "react-icons/tb";
import { GoHome } from "react-icons/go";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdShortcut, MdOutlineFolderZip } from "react-icons/md";
import { AiOutlineFileImage } from "react-icons/ai";
import { SiMicrosoftword, SiMicrosoftexcel } from "react-icons/si";
import { PiMicrosoftPowerpointLogoFill } from "react-icons/pi";
import { IoLibrary } from "react-icons/io5";
import NotepadContent from "./NotepadContent/NotepadContent";
import FileExplorerIcon from "@/components/FileExplorerIcon/FileExplorerIcon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createNewTextDocument, getFileExplorerList } from "@/lib/firebase.api";

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
    isTargetElementTab: false,
  },
];

const FolderContent = () => {
  const [constraints, setConstraints] = useState<any>({});
  const [searchClient, setSearchClient] = useState<string>("");

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

  const handleCreateNewTextDocument = async () => {
    const res: any = await createNewTextDocument(
      FILE_EXPLORER_APP_NAME.text_document,
      "AAAAA",
      "Untitled"
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
    handleGetFileExplorerList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <div className="w-full h-full text-black dark:text-white bg-[#efefef] dark:bg-[#252525]">
        <header className="h-[8%] min-h-[40px] pr-4 text-black dark:text-white bg-zinc-300 dark:bg-[#3c3c3c]">
          <div className="w-full h-full flex items-center justify-between gap-3">
            <div className="w-[20%] h-full flex items-center justify-center gap-3">
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
              <p className="text-sm">This PC</p>
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
          className="h-[8%] min-h-[40px] px-6 text-black dark:text-white bg-zinc-200 dark:bg-[#282828]
                        flex items-center gap-3"
        >
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex items-center gap-3">
                <IoMdAddCircleOutline size={25} />
                <span className="text-sm">New</span>
                <FaAngleDown size={20} />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <div className="flex items-center gap-1">
                  <FaFolder className="mr-3" size={15} />
                  <span>Folder</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex items-center gap-1">
                  <MdShortcut className="mr-3" size={15} />
                  <span>Shortcut</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex items-center gap-1">
                  <AiOutlineFileImage className="mr-3" size={15} />
                  <span>Bitmap image</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex items-center gap-1">
                  <SiMicrosoftword className="mr-3" size={15} />
                  <span>Microsoft Word Document</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex items-center gap-1">
                  <PiMicrosoftPowerpointLogoFill className="mr-3" size={15} />
                  <span>Microsoft PowerPoint Presentation</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex items-center gap-1">
                  <IoLibrary className="mr-3" size={15} />
                  <span>WinRAR archive</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  handleCreateNewTextDocument();
                }}
              >
                <div className="flex items-center gap-1">
                  <PiNotepadFill className="mr-3" size={15} />
                  <span>Text Document</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex items-center gap-1">
                  <SiMicrosoftexcel className="mr-3" size={15} />
                  <span>Microsoft Excel Worksheet</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex items-center gap-1">
                  <MdOutlineFolderZip className="mr-3" size={15} />
                  <span>WinRAR ZIP archive</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="w-[1px] h-[45%] bg-black dark:bg-white"></div>
        </div>
        <div className="p-4 flex items-center flex-wrap">
          {itemList?.map((item: APP_TYPE) => {
            const itemData = getAppByName(
              FILE_EXPLORER_APP_LIST,
              item?.type ? item?.type : ""
            );

            return (
              <FileExplorerIcon
                key={uuidv4()}
                iconUrl={itemData?.iconUrl ? itemData?.iconUrl : ""}
                iconName={
                  item?.targetElementTabName ? item?.targetElementTabName : ""
                }
                iconWidth={itemData?.iconWidth ? itemData?.iconWidth : 0}
                iconHeight={itemData?.iconHeight ? itemData?.iconHeight : 0}
                targetElement={
                  itemData?.targetElement ? itemData?.targetElement : <></>
                }
                targetElementname={
                  itemData?.targetElementname ? itemData?.targetElementname : ""
                }
                targetElementTabName={
                  item?.targetElementTabName ? item?.targetElementTabName : ""
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
          })}
        </div>
      </div>
    </>
  );
};

export default FolderContent;
