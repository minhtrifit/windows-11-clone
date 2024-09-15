"use client";

import { FormEvent, useRef, useState } from "react";
import { GrFormPreviousLink, GrFormNextLink } from "react-icons/gr";
import { TbReload } from "react-icons/tb";
import { MdOutlineMoreVert } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const GOOGLE_URL = "https://www.google.com";

const BrowserContent = () => {
  const url = "https://google.com/search?igu=1";
  const iframeRef = useRef<any>(null);
  const [search, setSearch] = useState<string>(GOOGLE_URL);

  const handleReload = () => {
    iframeRef.current.src = url;
    setSearch(GOOGLE_URL);
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search !== "") iframeRef.current.src = search;
  };

  return (
    <div className="w-full h-full">
      <header className="h-[8%] min-h-[40px] text-black dark:text-white bg-zinc-300 dark:bg-[#3c3c3c]">
        <div className="w-full h-full flex">
          <div className="w-[12%] min-w-[130px] h-full p-2 flex items-center justify-center gap-3">
            <button
              className="p-1 rounded-full hover:bg-zinc-200 dark:hover:bg-[#4f4f4f]"
              onClick={() => {
                iframeRef.current.src = url;
              }}
            >
              <GrFormPreviousLink size={25} />
            </button>
            <button className="p-1 rounded-full hover:bg-zinc-200 dark:hover:bg-[#4f4f4f]">
              <GrFormNextLink size={25} />
            </button>
            <button
              className="p-1 rounded-full mt-[2px] hover:bg-zinc-200 dark:hover:bg-[#4f4f4f]"
              onClick={() => {
                handleReload();
              }}
            >
              <TbReload size={20} />
            </button>
          </div>
          <form
            className="w-[78%] h-full p-2 flex items-center justify-center"
            onSubmit={(e) => {
              handleSearch(e);
            }}
          >
            <input
              className="w-full h-full bg-[#efefef] dark:bg-[#282828] rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </form>
          <div className="w-[10%] h-full flex gap-3 items-center justify-center">
            <button className="p-1 rounded-full hover:bg-zinc-200 dark:hover:bg-[#4f4f4f]">
              <Avatar className="w-7 h-7">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>T</AvatarFallback>
              </Avatar>
            </button>
            <button className="p-1 rounded-full hover:bg-zinc-200 dark:hover:bg-[#4f4f4f]">
              <MdOutlineMoreVert size={25} />
            </button>
          </div>
        </div>
      </header>
      <iframe
        ref={iframeRef}
        src={url}
        className="w-full h-[92%] rounded-b-[10px]"
        onLoad={() => {
          console.log("Load:", iframeRef.current.src);
        }}
      />
    </div>
  );
};

export default BrowserContent;
