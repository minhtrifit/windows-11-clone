import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

interface PropType {
  name: string;
  process: number;
  tabUrl: string;
  fileCounts: number;
  setActiveTab?: Dispatch<SetStateAction<string>>;
}

const Disk = (props: PropType) => {
  const { name, process, tabUrl, fileCounts, setActiveTab } = props;

  return (
    <div
      className="h-[70px] px-2 flex items-center gap-3 rounded-sm hover:bg-zinc-200 dark:hover:bg-zinc-700"
      onDoubleClick={() => {
        if (setActiveTab) setActiveTab(tabUrl);
      }}
    >
      <Image
        src={"/Icons/devices/drives/drive.ico"}
        alt="favicon"
        width={52}
        height={52}
      />
      <div className="flex flex-col gap-1">
        <p className="text-sm select-none">{name}</p>
        <div className="w-[200px] h-[12px] bg-white">
          <div
            className="h-full bg-sky-500"
            style={{ width: `${process}%` }}
          ></div>
        </div>
        <p className="text-xs select-none">{fileCounts} of files is stored</p>
      </div>
    </div>
  );
};

export default Disk;
