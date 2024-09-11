"use client";

import { useRef, useState } from "react";
import { motion, useDragControls } from "framer-motion";
import { MdMinimize } from "react-icons/md";
import { FaRegSquare } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";
import { useWindowStore } from "@/lib/store";

interface PropType {
  constraints: any;
  contentCpn: React.ReactElement;
}

const WindowCpn = (props: PropType) => {
  const { constraints, contentCpn } = props;

  const updateTargetWindow = useWindowStore((state) => {
    return state.updateTargetWindow;
  });

  const parentControls = useDragControls();

  const [isClose, setIsClose] = useState<boolean>(false);

  const windowRef = useRef<HTMLDivElement>(null);
  const windowHeaderRef = useRef<HTMLHeadingElement>(null);
  const windowBodyRef = useRef<HTMLHeadingElement>(null);

  const handleFocusWindow = () => {
    console.log("Focus window");
  };

  const handleMinimizeScreen = () => {
    console.log("Minimize screen");
  };

  const handleFullScreen = () => {
    console.log("Full screen");
  };

  const handleClose = () => {
    console.log("Close");
    setIsClose(true);
    updateTargetWindow(null);
  };

  return (
    <motion.div
      ref={windowRef}
      className={`absolute inset-0 m-auto w-[60%] h-[70%] min-h-[600px]
                  border-[1px] border-zinc-300 dark:border-zinc-800 rounded-[10px]`}
      drag
      dragConstraints={constraints}
      dragControls={parentControls}
      dragMomentum={false}
      dragListener={false}
      initial={{ opacity: 1 }}
      animate={{ opacity: isClose ? 0 : 1 }}
      transition={{ duration: 0.2 }}
      onClick={() => {
        handleFocusWindow();
      }}
    >
      <header
        ref={windowHeaderRef}
        className={`w-full h-[7%] min-h-[40px] dark:bg-black rounded-t-[10px]
                      dark:text-white flex justify-between items-center`}
        onPointerDown={(e) => {
          parentControls.start(e);
        }}
      >
        <div className="h-full flex items-end px-4">
          <div className="h-[70%] px-4 text-sm text-white flex items-center justify-start gap-3 bg-[#3c3c3c] rounded-t-[6px]">
            <p>New Tab</p>
          </div>
        </div>
        <div className="h-[100%] pb-2 flex items-center">
          <button
            className={`h-full px-4 flex hover:bg-[#efefef] dark:hover:bg-[#171717]`}
            onClick={() => {
              handleMinimizeScreen();
            }}
          >
            <MdMinimize size={23} />
          </button>
          <button
            className={`h-full px-4 flex items-center hover:bg-[#efefef] dark:hover:bg-[#171717]`}
            onClick={() => {
              handleFullScreen();
            }}
          >
            <FaRegSquare size={13} />
          </button>
          <button
            className={`h-full px-4 flex items-center hover:bg-red-500 hover:rounded-se-[10px]`}
            onClick={() => {
              handleClose();
            }}
          >
            <AiOutlineClose size={16} />
          </button>
        </div>
      </header>
      <div
        ref={windowBodyRef}
        className={`w-full h-[93%] bg-[#171717] text-white rounded-b-[10px]`}
      >
        {contentCpn}
      </div>
    </motion.div>
  );
};

export default WindowCpn;
