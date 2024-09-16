import { useState } from "react";
import { useFileExplorerWindowStore, useTextDocumentStore } from "@/lib/store";
import { FILE_EXPLORER_APP_NAME } from "@/lib/utils";
import {
  createNewTextDocument,
  getFileExplorerList,
  updateTextDocumentById,
} from "@/lib/firebase.api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";

const NotepadContent = () => {
  const updateItemList = useFileExplorerWindowStore((state) => {
    return state.updateItemList;
  });

  const itemData = useTextDocumentStore((state) => {
    return state.itemData;
  });

  const [content, setContent] = useState<string>(
    itemData?.content ? itemData?.content : ""
  );

  const handleGetFileExplorerList = async () => {
    const res: any = await getFileExplorerList("asc");
    console.log(res);
    if (res?.documents) updateItemList(res?.documents);
  };

  const handleSaveFile = async () => {
    if (itemData !== null && itemData?.id && content !== itemData?.content) {
      const res: any = await updateTextDocumentById({
        id: itemData?.id,
        data: { content: content },
      });

      console.log("Save exist:", itemData, res);
    } else {
      const res: any = await createNewTextDocument(
        FILE_EXPLORER_APP_NAME.text_document,
        content,
        "Untitled"
      );

      console.log("Save new:", itemData, res);
    }
    handleGetFileExplorerList();
  };

  return (
    <div
      className="w-full h-full rounded-b-md text-black dark:text-white bg-[#efefef] dark:bg-[#252525]
                    flex flex-col items-start"
    >
      <div className="w-full px-2 py-1 flex items-center gap-3 bg-zinc-200 dark:bg-[#282828]">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="px-2 rounded-sm dark:hover:bg-zinc-700">File</div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-60">
            <DropdownMenuItem>
              <span>New tab</span>
              <DropdownMenuShortcut>Ctrl+N</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>New window</span>
              <DropdownMenuShortcut>Ctrl+Shift+N</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Open</span>
              <DropdownMenuShortcut>Ctrl+O</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                handleSaveFile();
              }}
            >
              <span>Save</span>
              <DropdownMenuShortcut>Ctrl+S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Save as</span>
              <DropdownMenuShortcut>Ctrl+Shift+S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Save all</span>
              <DropdownMenuShortcut>Ctrl+Alt+S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <span>Page setup</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Print</span>
              <DropdownMenuShortcut>Ctrl+P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <span>Close tab</span>
              <DropdownMenuShortcut>Ctrl+W</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Close all</span>
              <DropdownMenuShortcut>Ctrl+Shift+W</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Exit</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <textarea
        className="w-full h-full p-4 outline-none text-black rounded-b-md
                    dark:text-white bg-[#efefef] dark:bg-[#252525]"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </div>
  );
};

export default NotepadContent;
