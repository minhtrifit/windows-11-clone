import { useFileExplorerWindowStore } from "@/lib/store";

const NotepadContent = () => {
  const targetSubWindowName = useFileExplorerWindowStore((state) => {
    return state.targetSubWindowName;
  });
  return (
    <div className="w-full h-full text-black dark:text-white bg-[#efefef] dark:bg-[#252525]">
      {targetSubWindowName}
    </div>
  );
};

export default NotepadContent;
