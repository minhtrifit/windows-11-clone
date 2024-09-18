import { useRef, useState } from "react";
import { useTheme } from "next-themes";
import { CODE_LANGUAGES, CODE_SNIPPETS } from "@/lib/utils";
import { excuteCode } from "@/lib/action.api";
import Editor from "@monaco-editor/react";

const VisualCodeContent = () => {
  const { theme } = useTheme();

  const editorRef = useRef<any>();
  const [code, setCode] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const onMount = (editor: any) => {
    editorRef.current = editor;
    editor.focus();
  };

  const handleExcuteCode = async () => {
    const res: any = await excuteCode(CODE_LANGUAGES.javascript.name, code);

    if (res?.run?.output) {
      console.log("RESULT:", res?.run?.output);
      setResult(res?.run?.output);
    }
  };

  return (
    <div className="w-full h-full flex text-black dark:text-white bg-[#efefef] dark:bg-[#252525]">
      <div className="w-[200px] h-full p-4 overflow-y-auto">Slidebar</div>
      <div className="w-[calc(100%-200px)] h-full flex flex-col">
        <div className="w-full h-[calc(100%-160px)]">
          <Editor
            options={{
              minimap: {
                enabled: false,
              },
            }}
            width="100%"
            height="100%"
            theme={`${theme === "light" ? "vs-light" : "vs-dark"}`}
            defaultLanguage="javascript"
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
                    bg-[#fcfcfc] dark:bg-[#282828] overflow-y-auto"
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
