import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaRegMoon } from "react-icons/fa";
import { IoPower } from "react-icons/io5";
import { VscDebugRestart } from "react-icons/vsc";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PropType {
  isOpenStart: boolean;
  setIsOpenStart: Dispatch<SetStateAction<boolean>>;
}

const StartIconDropdown = (props: PropType) => {
  const { isOpenStart, setIsOpenStart } = props;

  const [windowStatus, setWindowStatus] = useState<string>("turn on");

  const startDropdownRef = useRef<any>(null);

  const handleClickElement = (event: any) => {
    if (
      startDropdownRef.current &&
      !startDropdownRef.current.contains(event.target) &&
      !event.target.className.includes("start-icon")
    ) {
      console.log("Clicked outside start menu dropdown");
      setIsOpenStart(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickElement);

    return () => {
      document.removeEventListener("mousedown", handleClickElement);
    };
  }, []);

  useEffect(() => {
    if (windowStatus !== "turn on") {
      console.log(windowStatus);
    }
  }, [windowStatus]);

  return (
    <AnimatePresence>
      {isOpenStart && (
        <motion.div
          ref={startDropdownRef}
          className="absolute z-[999] min-w-[600px] bottom-[60px]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        >
          <div className="p-4 bg-zinc-100 dark:bg-[#252525] rounded-t-md">
            Hello
          </div>
          <div
            className="w-full bg-white px-12 py-5 dark:bg-[#161616]
                        flex items-center justify-between rounded-b-md"
          >
            <div className="h-full flex gap-5 items-center">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>T</AvatarFallback>
              </Avatar>
              <p>Minh Tri dep trai</p>
            </div>
            <div className="h-full flex gap-5 items-center">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="p-2 rounded-md hover:bg-[#efefef] dark:hover:bg-[#4f4f4f]">
                    <IoPower size={22} />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => {
                      setWindowStatus("sleep");
                    }}
                  >
                    <FaRegMoon className="mr-3" size={18} />
                    <span>Sleep</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setWindowStatus("shutdown");
                    }}
                  >
                    <IoPower className="mr-3" size={18} />
                    <span>Shutdown</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setWindowStatus("restart");
                    }}
                  >
                    <VscDebugRestart className="mr-3" size={20} />
                    <span>Restart</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StartIconDropdown;
