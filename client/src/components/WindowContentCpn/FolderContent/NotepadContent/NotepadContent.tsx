import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useFileExplorerWindowStore, useTextDocumentStore } from "@/lib/store";
import { autoGenerateName, FILE_EXPLORER_APP_NAME } from "@/lib/utils";
import {
  createNewTextDocument,
  getFileExplorerList,
  updateTextDocumentById,
} from "@/lib/firebase.api";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";

const NotepadContent = () => {
  const itemList = useFileExplorerWindowStore((state) => {
    return state.itemList;
  });

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
      handleGetFileExplorerList();
      const fileName = autoGenerateName(itemList);

      const res: any = await createNewTextDocument(
        FILE_EXPLORER_APP_NAME.text_document,
        content,
        fileName ? fileName : uuidv4()
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
      <Menubar className="w-full rounded-none bg-zinc-200 dark:bg-[#282828]">
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent className="w-60">
            <MenubarItem>
              <span>New Tab</span>
              <MenubarShortcut>Ctrl+N</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              <span>New Window</span>
              <MenubarShortcut>Ctrl+Shift+N</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              <span>Open</span>
              <MenubarShortcut>Ctrl+O</MenubarShortcut>
            </MenubarItem>
            <MenubarItem
              onClick={() => {
                handleSaveFile();
              }}
            >
              <span>Save</span>
              <MenubarShortcut>Ctrl+S</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              <span>Save as</span>
              <MenubarShortcut>Ctrl+Shift+S</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              <span>Save all</span>
              <MenubarShortcut>Ctrl+Alt+S</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              <span>Page setup</span>
            </MenubarItem>
            <MenubarItem>
              <span>Print</span>
              <MenubarShortcut>Ctrl+P</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              <span>Close Tab</span>
              <MenubarShortcut>Ctrl+W</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              <span>Close window</span>
              <MenubarShortcut>Ctrl+Shift+W</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              <span>Exit</span>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem disabled>
              <span>Undo</span>
              <MenubarShortcut>Ctrl+Z</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem disabled>
              <span>Cut</span>
              <MenubarShortcut>Ctrl+X</MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled>
              <span>Copy</span>
              <MenubarShortcut>Ctrl+C</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              <span>Paste</span>
              <MenubarShortcut>Ctrl+V</MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled>
              <span>Delete</span>
              <MenubarShortcut>Del</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem disabled>
              <span>Search with Bing</span>
              <MenubarShortcut>Ctrl+E</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem disabled>
              <span>Find</span>
              <MenubarShortcut>Ctrl+F</MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled>
              <span>Find next</span>
              <MenubarShortcut>F3</MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled>
              <span>Find previous</span>
              <MenubarShortcut>Shift+F3</MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled>
              <span>Replace</span>
              <MenubarShortcut>Ctrl+H</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              <span>Go to</span>
              <MenubarShortcut>Ctrl+G</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              <span>Select all</span>
              <MenubarShortcut>Ctrl+A</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              <span>Time/Date</span>
              <MenubarShortcut>F5</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              <span>Font</span>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarSub>
              <MenubarSubTrigger inset>Zoom</MenubarSubTrigger>
              <MenubarSubContent className="w-64">
                <MenubarItem>
                  <span>Zoom in</span>
                  <MenubarShortcut>Ctrl+Plus</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                  <span>Zoom out</span>
                  <MenubarShortcut>Ctrl+Minus</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                  <span>Restore default zoom</span>
                  <MenubarShortcut>Ctrl+O</MenubarShortcut>
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarCheckboxItem checked>Status bar</MenubarCheckboxItem>
            <MenubarCheckboxItem checked>Word wrap</MenubarCheckboxItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
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
