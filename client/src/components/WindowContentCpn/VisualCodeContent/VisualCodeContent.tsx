import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useTheme } from "next-themes";
import { CODE_LANGUAGES, CODE_SNIPPETS } from "@/lib/utils";
import { excuteCode } from "@/lib/action.api";
import Editor from "@monaco-editor/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FaRegCopy, FaSearch, FaEye, FaPython, FaFile } from "react-icons/fa";
import { FaCodeFork } from "react-icons/fa6";
import { IoSettings, IoClose } from "react-icons/io5";
import { MdMoreHoriz } from "react-icons/md";
import { BiLogoJavascript } from "react-icons/bi";
import { VscNewFile } from "react-icons/vsc";

const LANGUAGE_EXTENSION = {
  javascipt: ".js",
  python: ".py",
};

export interface FILE_TYPE {
  id: string;
  name: string;
  content: string;
}

const VisualCodeContent = () => {
  const { theme } = useTheme();

  const editorRef = useRef<any>();
  const [language, setLanguage] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [files, setFiles] = useState<FILE_TYPE[]>([
    { id: "1", name: "main.js", content: CODE_SNIPPETS.javascript },
    { id: "2", name: "app.py", content: CODE_SNIPPETS.python },
  ]);
  const [targetFile, setTargetFile] = useState<FILE_TYPE | null>(null);

  const onMount = (editor: any) => {
    editorRef.current = editor;
    editor.focus();
  };

  const handleGetFileIcon = (fileName: string) => {
    if (fileName.includes(LANGUAGE_EXTENSION.javascipt))
      return <BiLogoJavascript size={18} />;
    if (fileName.includes(LANGUAGE_EXTENSION.python))
      return <FaPython size={18} />;

    return <FaFile size={18} />;
  };

  const handleGetFileLanguage = (fileName: string) => {
    if (fileName.includes(LANGUAGE_EXTENSION.javascipt))
      return CODE_LANGUAGES.javascript.name;
    if (fileName.includes(LANGUAGE_EXTENSION.python))
      return CODE_LANGUAGES.python.name;

    return CODE_LANGUAGES.javascript.name;
  };

  const handleGetLanguageVersion = (name: string) => {
    const language = Object.values(CODE_LANGUAGES).find(
      (lang) => lang.name === name
    );
    return language ? language.version : "";
  };

  const handleExcuteCode = async () => {
    const languageVersion: string = handleGetLanguageVersion(language);

    if (
      targetFile &&
      languageVersion !== "" &&
      language !== "" &&
      code !== ""
    ) {
      const res: any = await excuteCode(
        targetFile?.name,
        languageVersion,
        language,
        code
      );

      console.log("RESULT:", res?.run?.output);
      setResult(res?.run?.output);
    }
  };

  const handleCreateNewFile = () => {
    console.log("Create new file");
    setFiles([]);
  };

  useEffect(() => {
    if (files[0]) {
      setTargetFile(files[0]);
      setLanguage(handleGetFileLanguage(files[0]?.name));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full h-full flex text-black dark:text-white">
      <div className="w-[60px] h-full bg-[#eaeaea] dark:bg-[#2e3138] flex flex-col gap-2 rounded-b-md">
        <Image
          className="pt-2"
          src={"/assets/logo.png"}
          alt="logo"
          width={60}
          height={60}
        />
        <div
          className="py-3 flex items-center justify-center text-zinc-400
                        hover:text-zinc-500 dark:hover:text-white hover:cursor-pointer"
        >
          <FaRegCopy size={26} />
        </div>
        <div
          className="py-3 flex items-center justify-center text-zinc-400
                        hover:text-zinc-500 dark:hover:text-white hover:cursor-pointer"
        >
          <FaSearch size={24} />
        </div>
        <div
          className="py-3 flex items-center justify-center text-zinc-400
                        hover:text-zinc-500 dark:hover:text-white hover:cursor-pointer"
        >
          <FaCodeFork size={24} />
        </div>
        <div
          className="py-3 flex items-center justify-center text-zinc-400
                        hover:text-zinc-500 dark:hover:text-white hover:cursor-pointer"
        >
          <IoSettings size={26} />
        </div>
      </div>
      <div className="w-[230px] h-full overflow-y-auto bg-[#f3f3f3] dark:bg-[#202327]">
        <div className="p-4 flex items-center justify-between">
          <span className="text-[0.75rem]">PROJECT</span>
          <MdMoreHoriz size={25} />
        </div>
        <Accordion type="multiple" defaultValue={["item-1", "item-2"]}>
          <AccordionItem value="item-1">
            <AccordionTrigger
              className="px-4 py-1 bg-[#eaeaea] dark:bg-[#2e3138]
                            text-[0.75rem] font-bold hover:no-underline"
            >
              INFO
            </AccordionTrigger>
            <AccordionContent className="px-4 py-2 border-0">
              <span className="text-[0.85rem] font-semibold">
                Windows 11 Clone
              </span>
              <div className="mt-3 flex items-center gap-5">
                <div className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
                  <FaEye size={15} />
                  <span className="text-[0.8rem]">1 views</span>
                </div>
                <div className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
                  <FaCodeFork size={15} />
                  <span className="text-[0.8rem]">1 forks</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="relative">
            <AccordionTrigger
              className="px-4 py-1 bg-[#eaeaea] dark:bg-[#2e3138]
                            text-[0.75rem] font-bold hover:no-underline"
            >
              <div className="w-full flex items-center justify-between">
                <span>FILES</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="h-[430px] border-0 overflow-y-auto">
              <div
                className="absolute top-[2px] right-[45px] p-[3px] rounded-sm flex items-center justify-center
                            hover:bg-zinc-300 hover:dark:bg-zinc-600 hover:cursor-pointer"
                onClick={() => {
                  handleCreateNewFile();
                }}
              >
                <VscNewFile size={16} />
              </div>
              {files?.map((file: FILE_TYPE) => {
                return (
                  <div
                    key={uuidv4()}
                    className={`w-full px-4 py-1 flex items-center gap-2
                            hover:bg-zinc-200 dark:hover:bg-zinc-600 hover:cursor-pointer ${
                              file?.id === targetFile?.id &&
                              "bg-zinc-300 dark:bg-zinc-700"
                            }`}
                    onClick={() => {
                      setCode(file?.content);
                      setTargetFile(file);
                      setLanguage(handleGetFileLanguage(file?.name));
                    }}
                  >
                    {handleGetFileIcon(file?.name)}
                    <span>{file?.name}</span>
                  </div>
                );
              })}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="w-[calc(100%-290px)] h-full flex flex-col">
        <div className="w-full h-[40px] bg-[#f3f3f3] dark:bg-[#202327] flex">
          <div className="px-4 py-2 text-[0.95rem] bg-[#fcfcfc] dark:bg-[#1e1e1e] flex items-center justify-center gap-3">
            {targetFile?.name && handleGetFileIcon(targetFile?.name)}
            <span>{targetFile?.name ? targetFile?.name : "untitled"}</span>
            <div className="p-[1px] rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:cursor-pointer">
              <IoClose size={18} />
            </div>
          </div>
        </div>
        <div className="w-full h-[calc(100%-200px)]">
          <Editor
            options={{
              minimap: {
                enabled: false,
              },
            }}
            width="100%"
            height="100%"
            theme={`${theme === "light" ? "vs-light" : "vs-dark"}`}
            language={language}
            defaultValue={CODE_SNIPPETS.javascript}
            onMount={onMount}
            value={code}
            onChange={(value) => {
              if (value) setCode(value);
            }}
          />
        </div>
        <div
          className="w-full h-[160px] px-4 py-4 border-t border-zinc-300 dark:border-zinc-700
                    bg-[#fcfcfc] dark:bg-[#1e1e1e] overflow-y-auto"
        >
          <button
            onClick={() => {
              handleExcuteCode();
            }}
          >
            Excute
          </button>
          {result}
        </div>
      </div>
    </div>
  );
};

export default VisualCodeContent;
