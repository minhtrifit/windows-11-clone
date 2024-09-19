import Image from "next/image";
import { FormEvent, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useTheme } from "next-themes";
import { CODE_LANGUAGES, CODE_SNIPPETS } from "@/lib/utils";
import { executeCode } from "@/lib/action.api";
import Editor from "@monaco-editor/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  FaRegCopy,
  FaSearch,
  FaEye,
  FaPython,
  FaFile,
  FaJava,
} from "react-icons/fa";
import { FaCodeFork } from "react-icons/fa6";
import { IoSettings, IoClose } from "react-icons/io5";
import { MdMoreHoriz } from "react-icons/md";
import { BiLogoJavascript, BiLogoTypescript, BiLogoPhp } from "react-icons/bi";
import { VscNewFile } from "react-icons/vsc";
import { TbBrandCSharp } from "react-icons/tb";
import TerminalCmd from "./TerminalCmd/TerminalCmd";

export interface FILE_TYPE {
  id: string;
  name: string;
  content: string;
  editMode: boolean;
}

const VisualCodeContent = () => {
  const { theme } = useTheme();

  const editorRef = useRef<any>();
  const inputRef = useRef<any>(null);
  const inputCmdRef = useRef<any>(null);

  const [language, setLanguage] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [files, setFiles] = useState<FILE_TYPE[]>([
    {
      id: uuidv4(),
      name: "main.js",
      content: CODE_SNIPPETS.javascript,
      editMode: false,
    },
    {
      id: uuidv4(),
      name: "main.ts",
      content: CODE_SNIPPETS.typescript,
      editMode: false,
    },
    {
      id: uuidv4(),
      name: "main.py",
      content: CODE_SNIPPETS.python,
      editMode: false,
    },
    {
      id: uuidv4(),
      name: "main.java",
      content: CODE_SNIPPETS.java,
      editMode: false,
    },
    {
      id: uuidv4(),
      name: "main.cs",
      content: CODE_SNIPPETS.csharp,
      editMode: false,
    },
    {
      id: uuidv4(),
      name: "main.php",
      content: CODE_SNIPPETS.php,
      editMode: false,
    },
  ]);
  const [targetFile, setTargetFile] = useState<FILE_TYPE | null>(null);
  const [editValueInput, setEditValueInput] = useState<string>("new.js");
  const [executeValueInput, setExecuteValueInput] = useState<string>("");

  const onMount = (editor: any) => {
    editorRef.current = editor;
    editor.focus();
  };

  const handleGetFileIcon = (fileName: string) => {
    if (fileName.includes(CODE_LANGUAGES.javascript.extension))
      return <BiLogoJavascript size={18} />;
    if (fileName.includes(CODE_LANGUAGES.typescript.extension))
      return <BiLogoTypescript size={18} />;
    if (fileName.includes(CODE_LANGUAGES.python.extension))
      return <FaPython size={18} />;
    if (fileName.includes(CODE_LANGUAGES.java.extension))
      return <FaJava size={18} />;
    if (fileName.includes(CODE_LANGUAGES.csharp.extension))
      return <TbBrandCSharp size={18} />;
    if (fileName.includes(CODE_LANGUAGES.php.extension))
      return <BiLogoPhp size={18} />;

    return <FaFile size={18} />;
  };

  const handleGetFileLanguage = (fileName: string) => {
    if (fileName.includes(CODE_LANGUAGES.javascript.extension))
      return CODE_LANGUAGES.javascript.name;
    if (fileName.includes(CODE_LANGUAGES.typescript.extension))
      return CODE_LANGUAGES.typescript.name;
    if (fileName.includes(CODE_LANGUAGES.python.extension))
      return CODE_LANGUAGES.python.name;
    if (fileName.includes(CODE_LANGUAGES.java.extension))
      return CODE_LANGUAGES.java.name;
    if (fileName.includes(CODE_LANGUAGES.csharp.extension))
      return CODE_LANGUAGES.csharp.name;
    if (fileName.includes(CODE_LANGUAGES.php.extension))
      return CODE_LANGUAGES.php.name;

    return "";
  };

  const handleCheckLanguageCommand = (
    cmd: string,
    fileNameExtension: string
  ) => {
    const language = Object.values(CODE_LANGUAGES).find(
      (lang) => lang.command === cmd
    );

    if (language?.command && language?.extension === fileNameExtension)
      return true;
    else return false;
  };

  const handleGetLanguageVersion = (name: string) => {
    const language = Object.values(CODE_LANGUAGES).find(
      (lang) => lang.name === name
    );
    return language ? language.version : "";
  };

  const handleGetLanguageName = (fileNameExtension: string) => {
    const language = Object.values(CODE_LANGUAGES).find(
      (lang) => lang.extension === fileNameExtension
    );
    return language ? language.name : "";
  };

  const handleExecuteCode = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("EXECUTE CODE:", executeValueInput);
    const codes = executeValueInput.split(" ");
    const [exCmd, exFileName] = codes;

    // Ex: Check command = "node" with javascript file
    const languageCommand: boolean = handleCheckLanguageCommand(
      exCmd,
      `.${exFileName.split(".")[1]}`
    );

    const exFile = files?.filter((file: FILE_TYPE) => {
      return file?.name === exFileName;
    })[0];

    // Ex: Javascript for ".js" extension
    const languageName: string = handleGetLanguageName(
      `.${exFileName.split(".")[1]}`
    );

    if (
      exFile &&
      targetFile?.name === exFileName &&
      languageCommand &&
      languageName !== "" &&
      code !== ""
    ) {
      console.log("EXECUTE CODE SUCCESSFULLY:", executeValueInput);
      const languageVersion: string = handleGetLanguageVersion(languageName);

      const res: any = await executeCode(
        exFile?.name,
        languageVersion,
        languageName,
        code
      );

      console.log("RESULT:", res?.run?.output);
      setResult(res?.run?.output);
    } else {
      console.log("EXECUTE CODE FAILED");
      setResult("execute code failed :(");
    }
  };

  const handleCreateNewFile = () => {
    console.log("Create new file");
    setFiles([
      ...files,
      { id: uuidv4(), name: editValueInput, content: "", editMode: true },
    ]);
  };

  const handleConfirmNewFile = (
    e: FormEvent<HTMLFormElement>,
    file: FILE_TYPE
  ) => {
    e.preventDefault();

    if (editValueInput) {
      const updatedFiles = files?.map((f: FILE_TYPE) =>
        f?.id === file?.id ? { ...f, name: editValueInput, editMode: false } : f
      );

      const newTargetFile = updatedFiles?.filter((f: FILE_TYPE) => {
        return f?.id === file?.id;
      })[0];

      const newLanguage = handleGetFileLanguage(newTargetFile?.name);

      if (newLanguage !== "") {
        console.log("NEW FILE:", newTargetFile);

        setFiles(updatedFiles);
        setTargetFile(newTargetFile);
        setLanguage(newLanguage);
        setCode(newTargetFile?.content);
      }
    }
  };

  const handleDeleteFile = (id: string) => {
    const filterFiles = files?.filter((file: FILE_TYPE) => {
      return file?.id !== id;
    });

    setFiles(filterFiles);
    const initFile = filterFiles[0];

    if (initFile) {
      const newLanguage = handleGetFileLanguage(initFile?.name);
      setTargetFile(initFile);
      setLanguage(newLanguage);
      setCode(initFile?.content);
    }
  };

  useEffect(() => {
    if (files[0]) {
      setTargetFile(files[0]);
      setLanguage(handleGetFileLanguage(files[0]?.name));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (files.length > 0) {
      console.log("FILES:", files);
      inputRef.current?.focus(); // Focus new file input
    }
  }, [files]);

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
        <div className="px-4 py-2 flex items-center justify-between">
          <span className="text-[0.75rem]">PROJECT</span>
          <div
            className="p-[1px] rounded-sm flex items-center justify-center
                          hover:bg-zinc-300 hover:dark:bg-zinc-600 hover:cursor-pointer"
          >
            <MdMoreHoriz size={20} />
          </div>
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
            <AccordionContent className="h-[400px] border-0 overflow-y-auto">
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
                if (file?.editMode) {
                  return (
                    <form
                      key={uuidv4()}
                      className="px-4 py-1"
                      onSubmit={(e) => {
                        handleConfirmNewFile(e, file);
                      }}
                    >
                      <input
                        ref={inputRef}
                        className="px-2 outline-none"
                        value={editValueInput}
                        onChange={(e) => {
                          setEditValueInput(e.target.value);
                        }}
                      />
                    </form>
                  );
                }

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
            <div
              className="p-[1px] rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:cursor-pointer"
              onClick={() => {
                if (targetFile?.id) handleDeleteFile(targetFile?.id);
              }}
            >
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
          className="w-full h-[160px] px-4 py-4 flex flex-col items-start gap-3
                    border-t border-zinc-300 dark:border-zinc-700
                    bg-[#fcfcfc] dark:bg-[#1e1e1e] overflow-y-auto"
          onClick={() => {
            console.log("FOCUS TERMINAL");
            inputCmdRef.current?.focus();
          }}
        >
          <TerminalCmd
            childrenEl={
              <form
                onSubmit={(e) => {
                  handleExecuteCode(e);
                }}
              >
                <input
                  ref={inputCmdRef}
                  className="text-sm text-orange-500 font-semibold bg-[#fcfcfc] dark:bg-[#1e1e1e] outline-none"
                  value={executeValueInput}
                  onChange={(e) => {
                    setExecuteValueInput(e.target.value);
                  }}
                />
              </form>
            }
          />
          {result && <TerminalCmd childrenEl={<span>{result}</span>} />}
        </div>
      </div>
    </div>
  );
};

export default VisualCodeContent;
