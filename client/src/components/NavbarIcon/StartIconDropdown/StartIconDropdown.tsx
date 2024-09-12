import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaRegMoon, FaMicrosoft, FaSearch } from "react-icons/fa";
import { IoPower } from "react-icons/io5";
import { VscDebugRestart, VscSignOut } from "react-icons/vsc";
import { IoIosMore } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface PropType {
  isOpenStart: boolean;
  setIsOpenStart: Dispatch<SetStateAction<boolean>>;
}

const StartIconDropdown = (props: PropType) => {
  const { isOpenStart, setIsOpenStart } = props;

  const [windowStatus, setWindowStatus] = useState<string>("turn on");
  const [search, setSearch] = useState<string>("");

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

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search !== "") {
      console.log("Search:", search);
      setSearch("");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickElement);

    return () => {
      document.removeEventListener("mousedown", handleClickElement);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <div className="px-12 py-3 bg-[#efefef] dark:bg-[#252525] rounded-t-md flex flex-col gap-5">
            <form
              className="relative w-full"
              onSubmit={(e) => {
                handleSearch(e);
              }}
            >
              <FaSearch className="absolute left-3 top-0 bottom-0 my-auto" />
              <input
                className="w-full px-10 py-2 rounded-2xl text-sm outline-none"
                placeholder="Search for apps, settings and documents"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </form>
          </div>
          <div
            className="w-full bg-white px-12 py-3 dark:bg-[#161616]
                        flex items-center justify-between rounded-b-md"
          >
            <div className="h-full flex gap-5 items-center">
              <Popover>
                <PopoverTrigger>
                  <div
                    className="px-4 py-1 rounded-md flex gap-5 items-center
                                  hover:bg-[#efefef] dark:hover:bg-[#4f4f4f]"
                  >
                    <Avatar className="w-9 h-9">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>T</AvatarFallback>
                    </Avatar>
                    <p className="text-sm hover:cursor-default">Minh Tri</p>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-[350px] flex">
                  <div className="w-full h-full flex flex-col gap-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FaMicrosoft size={20} />
                        <h1 className="text-md font-bold">Microsoft</h1>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <IoIosMore size={20} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <VscSignOut className="mr-3" size={20} />
                            <span>Sign out</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="h-full flex gap-5">
                      <div className="h-full flex items-center gap-5">
                        <Avatar className="w-16 h-16">
                          <AvatarImage
                            src="https://github.com/shadcn.png"
                            alt="@shadcn"
                          />
                          <AvatarFallback>T</AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="h-full flex flex-col items-start">
                        <h1 className="text-lg font-bold">Minh Tri</h1>
                        <p className="text-sm text-zinc-400">Local account</p>
                        <p className="text-sm text-sky-500 hover:text-sky-400 hover:cursor-pointer">
                          Manage my account
                        </p>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <div className="h-full flex gap-5 items-center">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="p-2 rounded-md hover:bg-[#efefef] dark:hover:bg-[#4f4f4f] hover:cursor-default">
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
