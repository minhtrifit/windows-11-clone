import { useState } from "react";
import Image from "next/image";
import StartIconDropdown from "../StartIconDropdown/StartIconDropdown";

interface PropType {
  iconUrl: string;
}

const StartIcon = (props: PropType) => {
  const { iconUrl } = props;

  const [isOpenStart, setIsOpenStart] = useState<boolean>(false);

  return (
    <>
      <StartIconDropdown
        isOpenStart={isOpenStart}
        setIsOpenStart={setIsOpenStart}
      />
      <div
        className="start-icon relative h-full flex items-center justify-center gap-2 p-2 rounded-md
                    hover:bg-zinc-200 dark:hover:bg-zinc-800"
        onClick={() => {
          setIsOpenStart(!isOpenStart);
        }}
      >
        <Image
          className="start-icon"
          src={iconUrl}
          alt="favicon"
          width={28}
          height={28}
        />
      </div>
    </>
  );
};

export default StartIcon;
