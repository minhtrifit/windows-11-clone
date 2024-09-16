import {
  getFileExplorerList,
  updateTextDocumentById,
} from "@/lib/firebase.api";
import { useFileExplorerWindowStore, useTextDocumentStore } from "@/lib/store";

const NotepadContent = () => {
  const updateItemList = useFileExplorerWindowStore((state) => {
    return state.updateItemList;
  });

  const itemData = useTextDocumentStore((state) => {
    return state.itemData;
  });

  const handleGetFileExplorerList = async () => {
    const res: any = await getFileExplorerList("asc");
    console.log(res);
    if (res?.documents) updateItemList(res?.documents);
  };

  const handleSaveFile = async () => {
    if (itemData !== null && itemData?.id) {
      const res: any = await updateTextDocumentById({
        id: itemData?.id,
        data: { targetElementTabName: "UPDATE TEXT", content: "AHIHI" },
      });

      console.log("Save:", itemData, res);
      handleGetFileExplorerList();
    }
  };

  return (
    <div
      className="w-full h-full text-black dark:text-white bg-[#efefef] dark:bg-[#252525]
                    flex flex-col items-start"
    >
      <div className="flex items-center">
        <button
          onClick={() => {
            handleSaveFile();
          }}
        >
          Save
        </button>
      </div>
      <p>{itemData?.content}</p>
    </div>
  );
};

export default NotepadContent;
