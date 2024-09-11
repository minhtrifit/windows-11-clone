"use client";

import { FormEvent, useRef, useState } from "react";
import { GrFormPreviousLink, GrFormNextLink } from "react-icons/gr";
import { TbReload } from "react-icons/tb";

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
      <header className="h-[8%] min-h-[40px] bg-[#3c3c3c]">
        <div className="w-full h-full flex">
          <div className="w-[12%] min-w-[130px] h-full p-2 flex items-center justify-center gap-3">
            <button
              className="p-1 rounded-full hover:bg-[#4f4f4f]"
              onClick={() => {
                iframeRef.current.src = url;
              }}
            >
              <GrFormPreviousLink size={25} />
            </button>
            <button className="p-1 rounded-full hover:bg-[#4f4f4f]">
              <GrFormNextLink size={25} />
            </button>
            <button
              className="p-1 rounded-full mt-[2px] hover:bg-[#4f4f4f]"
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
              className="w-full h-full bg-[#282828] rounded-xl px-4"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </form>
          <div className="w-[10%] h-full flex items-center justify-center">
            Right
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
