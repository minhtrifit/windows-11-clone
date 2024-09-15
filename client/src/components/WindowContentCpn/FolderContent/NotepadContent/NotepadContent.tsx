import { useTextDocumentStore } from "@/lib/store";

const NotepadContent = () => {
  const itemData = useTextDocumentStore((state) => {
    return state.itemData;
  });

  const handleSaveFile = () => {
    if (itemData !== null) {
      console.log("Save:", itemData);
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
