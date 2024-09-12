import Image from "next/image";
import { useNavbarStore } from "@/lib/store";
import StartIconDropdown from "../StartIconDropdown/StartIconDropdown";

interface PropType {
  iconUrl: string;
}

const StartIcon = (props: PropType) => {
  const { iconUrl } = props;

  const isOpenStart = useNavbarStore((state) => {
    return state.isOpenStart;
  });

  const updateIsOpenStart = useNavbarStore((state) => {
    return state.updateIsOpenStart;
  });

  return (
    <>
      <StartIconDropdown />
      <div
        className="start-icon relative h-full flex items-center justify-center gap-2 p-2 rounded-md
                    hover:bg-zinc-200 dark:hover:bg-zinc-800"
        onClick={() => {
          updateIsOpenStart(!isOpenStart);
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
