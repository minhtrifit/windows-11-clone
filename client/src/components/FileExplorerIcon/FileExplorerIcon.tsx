"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  useFileExplorerWindowStore,
  useNavbarStore,
  useTextDocumentStore,
} from "@/lib/store";
import {
  checkIsExistNavbarAppList,
  FILE_EXPLORER_APP_NAME,
  getAppByName,
} from "@/lib/utils";
import {
  NAVBAR_APP_LIST,
  OPTION_NAVBAR_APP_LIST,
} from "../DestopNavbar/DestopNavbar";
import { APP_TYPE } from "@/lib/types";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
} from "@/components/ui/context-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TbCut } from "react-icons/tb";
import { FaCopy, FaShareFromSquare, FaTrashCan } from "react-icons/fa6";
import { BiSolidRename } from "react-icons/bi";
import { FiFileText } from "react-icons/fi";
import { FaRegStar } from "react-icons/fa";
import { LuClipboardCopy } from "react-icons/lu";
import { VscSymbolProperty } from "react-icons/vsc";
import { MdMoreHoriz } from "react-icons/md";
import { RiFolderZipLine } from "react-icons/ri";
import { IoApps } from "react-icons/io5";
import { SiMicrosoftstore } from "react-icons/si";
import {
  deleteTextDocumentById,
  getFileExplorerList,
  updateTextDocumentById,
} from "@/lib/firebase.api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface PropType {
  iconUrl: string;
  iconName: string;
  iconWidth: number;
  iconHeight: number;
  targetElement: React.ReactElement;
  targetElementname: string;
  targetElementTabName: string;
  targetElementTabIcon: React.ReactElement;
  isTargetElementTab: boolean;
  itemData?: APP_TYPE | null;
}

const FILE_EXPLORER_CONTEXT_ICON = [
  {
    name: FILE_EXPLORER_APP_NAME.text_document,
    icon: <FiFileText className="mr-3" size={20} />,
  },
];

const FileExplorerIcon = (props: PropType) => {
  const {
    iconUrl,
    iconName,
    iconWidth,
    iconHeight,
    targetElement,
    targetElementname,
    targetElementTabName,
    targetElementTabIcon,
    isTargetElementTab,
    itemData,
  } = props;
  const [isRename, setIsRename] = useState<boolean>(false);
  const [renameValue, setRenameValue] = useState<string>(
    itemData?.targetElementTabName ? itemData?.targetElementTabName : ""
  );

  const renameInputRef = useRef<any>(null);
  const deleteConfirmDialogRef = useRef<HTMLDivElement>(null);

  const appList = useNavbarStore((state) => {
    return state.appList;
  });

  const updateIsCloseTargetWindow = useFileExplorerWindowStore((state) => {
    return state.updateIsCloseTargetWindow;
  });

  const updateIsTargetWindowTab = useFileExplorerWindowStore((state) => {
    return state.updateIsTargetWindowTab;
  });

  const updateTargetWindow = useFileExplorerWindowStore((state) => {
    return state.updateTargetWindow;
  });

  const updateTargetWindowName = useFileExplorerWindowStore((state) => {
    return state.updateTargetWindowName;
  });

  const updateTargetWindowTabName = useFileExplorerWindowStore((state) => {
    return state.updateTargetWindowTabName;
  });

  const updateTargetWindowTabIcon = useFileExplorerWindowStore((state) => {
    return state.updateTargetWindowTabIcon;
  });

  const updateTargetSubWindowName = useFileExplorerWindowStore((state) => {
    return state.updateTargetSubWindowName;
  });

  const updateIsCloseTargetSubWindow = useFileExplorerWindowStore((state) => {
    return state.updateIsCloseTargetSubWindow;
  });

  const updateItemList = useFileExplorerWindowStore((state) => {
    return state.updateItemList;
  });

  const addAppList = useNavbarStore((state) => {
    return state.addAppList;
  });

  const updateAppList = useNavbarStore((state) => {
    return state.updateAppList;
  });

  const updateItemData = useTextDocumentStore((state) => {
    return state.updateItemData;
  });

  const handleGetFileExplorerList = async () => {
    const res: any = await getFileExplorerList("asc");
    console.log(res);
    if (res?.documents) updateItemList(res?.documents);
  };

  const getIconByTargetName = (name: string) => {
    const icon = FILE_EXPLORER_CONTEXT_ICON.filter(
      (item) => item.name === name
    ).map((item) => item.icon)[0];

    if (icon) return icon;
    else return <></>;
  };

  const handleOpenApp = () => {
    console.log(
      "Open file explorer target element:",
      targetElementname,
      itemData
    );
    updateIsCloseTargetWindow(false);
    updateTargetWindow(targetElement);
    updateTargetWindowName(targetElementname);
    updateTargetWindowTabName(targetElementTabName);
    updateTargetWindowTabIcon(targetElementTabIcon);
    updateIsTargetWindowTab(isTargetElementTab);
    updateTargetSubWindowName(targetElementname);
    updateIsCloseTargetSubWindow(false);
    if (itemData) updateItemData(itemData);

    // Navbar item update
    const isOptionNavbarApp = checkIsExistNavbarAppList(
      OPTION_NAVBAR_APP_LIST,
      targetElementname
    );

    if (isOptionNavbarApp) {
      const newApp = getAppByName(OPTION_NAVBAR_APP_LIST, targetElementname);
      const isExistNavbarList = checkIsExistNavbarAppList(
        appList,
        targetElementname
      );
      if (newApp !== null && !isExistNavbarList) addAppList(newApp);
    } else {
      updateAppList(NAVBAR_APP_LIST);
    }
  };

  const handleRenameItem = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      itemData?.id &&
      renameValue !== "" &&
      renameValue !== itemData?.targetElementTabName
    ) {
      const res: any = await updateTextDocumentById({
        id: itemData?.id,
        data: { targetElementTabName: renameValue },
      });

      console.log(res, targetElementname, itemData);
      handleGetFileExplorerList();
    }
    setIsRename(false);
  };

  const handleDeleteItem = async () => {
    if (itemData?.id) {
      const res: any = await deleteTextDocumentById(itemData?.id);
      console.log(res);
      handleGetFileExplorerList();
    }
  };

  const handleClickElement = (event: any) => {
    if (
      renameInputRef.current &&
      !renameInputRef.current.contains(event.target) &&
      !event.target.className.includes("rename-input")
    ) {
      console.log("Clicked outside rename input");
      setIsRename(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickElement);

    return () => {
      document.removeEventListener("mousedown", handleClickElement);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <div hidden ref={deleteConfirmDialogRef}>
            Open delete confirm
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure to delete this file?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              file from your computer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                handleDeleteItem();
              }}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <ContextMenu>
        <ContextMenuTrigger>
          <div
            className="w-[90px] h-[90px] p-[1px] rounded-lg flex gap-2 flex-col items-center justify-center
              hover:border hover:border-gray-400"
            onDoubleClick={() => {
              if (!isRename) handleOpenApp();
            }}
          >
            <Image
              src={iconUrl}
              alt="favicon"
              width={iconWidth}
              height={iconHeight}
            />
            <div className={`max-w-[100%] flex justify-center`}>
              {isRename ? (
                <form
                  ref={renameInputRef}
                  className="rename-input w-[90%]"
                  onSubmit={(e) => {
                    handleRenameItem(e);
                  }}
                >
                  <input
                    className="rename-input w-full px-2 text-sm"
                    value={renameValue}
                    onChange={(e) => {
                      setRenameValue(e.target.value);
                    }}
                  />
                </form>
              ) : (
                <p className="text-xs text-black dark:text-white select-none text-center line-clamp-2">
                  {iconName}
                </p>
              )}
            </div>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>
            <div className="flex items-center gap-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="p-2 rounded-md hover:bg-zinc-200 hover:dark:bg-zinc-700">
                      <TbCut size={20} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Cut</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="p-2 rounded-md hover:bg-zinc-200 hover:dark:bg-zinc-700">
                      <FaCopy size={20} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className="p-2 rounded-md hover:bg-zinc-200 hover:dark:bg-zinc-700"
                      onClick={() => {
                        setIsRename(true);
                      }}
                    >
                      <BiSolidRename size={20} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Rename</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="p-2 rounded-md hover:bg-zinc-200 hover:dark:bg-zinc-700">
                      <FaShareFromSquare size={20} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Share</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className="p-2 rounded-md hover:bg-zinc-200 hover:dark:bg-zinc-700"
                      onClick={() => {
                        // handleDeleteItem();
                        deleteConfirmDialogRef?.current?.click();
                      }}
                    >
                      <FaTrashCan size={20} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Delete</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>
            <div>
              <ContextMenuShortcut>
                {getIconByTargetName(targetElementname)}
              </ContextMenuShortcut>
            </div>
            Open
            <ContextMenuShortcut>Enter</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>
              <div>
                <ContextMenuShortcut>
                  <IoApps className="mr-3" size={20} />
                </ContextMenuShortcut>
              </div>
              <span>Open with</span>
            </ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-64">
              <ContextMenuItem>
                <div>
                  <ContextMenuShortcut>
                    <FiFileText className="mr-3" size={20} />
                  </ContextMenuShortcut>
                </div>
                <span>Notepad</span>
              </ContextMenuItem>
              <ContextMenuItem>
                <div>
                  <ContextMenuShortcut>
                    <SiMicrosoftstore className="mr-3" size={20} />
                  </ContextMenuShortcut>
                </div>
                <span>Search the Microsoft Store</span>
              </ContextMenuItem>
              <ContextMenuItem inset>Choose another app</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuItem>
            <div>
              <ContextMenuShortcut>
                <FaShareFromSquare className="mr-3" size={20} />
              </ContextMenuShortcut>
            </div>
            <span>Share</span>
          </ContextMenuItem>
          <ContextMenuItem>
            <div>
              <ContextMenuShortcut>
                <FaRegStar className="mr-3" size={20} />
              </ContextMenuShortcut>
            </div>
            <span>Add to Favorites</span>
          </ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>
              <div>
                <ContextMenuShortcut>
                  <RiFolderZipLine className="mr-3" size={20} />
                </ContextMenuShortcut>
              </div>
              <span>Compress to...</span>
            </ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              <ContextMenuItem>ZIP File</ContextMenuItem>
              <ContextMenuItem>7z File</ContextMenuItem>
              <ContextMenuItem>TAR File</ContextMenuItem>
              <ContextMenuItem>Addtional options</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuItem>
            <div>
              <ContextMenuShortcut>
                <LuClipboardCopy className="mr-3" size={20} />
              </ContextMenuShortcut>
            </div>
            Copy as path
            <ContextMenuShortcut>Ctrl+Shift+C</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            <div>
              <ContextMenuShortcut>
                <VscSymbolProperty className="mr-3" size={20} />
              </ContextMenuShortcut>
            </div>
            Properites
            <ContextMenuShortcut>Alt+Enter</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>
            <div>
              <ContextMenuShortcut>
                <FiFileText className="mr-3" size={20} />
              </ContextMenuShortcut>
            </div>
            <span>Edit in notepad</span>
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>
            <div>
              <ContextMenuShortcut>
                <MdMoreHoriz className="mr-3" size={20} />
              </ContextMenuShortcut>
            </div>
            <span>Show more options</span>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </>
  );
};

export default FileExplorerIcon;
