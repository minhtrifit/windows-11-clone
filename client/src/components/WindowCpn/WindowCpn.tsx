"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useDragControls } from "framer-motion";
import { MdMinimize } from "react-icons/md";
import { FaRegSquare } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";

interface PropType {
  contentCpn: React.ReactElement;
}

const WindowCpn = (props: PropType) => {
  const { contentCpn } = props;

  const parentControls = useDragControls();

  const [constraints, setConstraints] = useState({});
  const [isClose, setIsClose] = useState<boolean>(false);

  const parentRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const windowHeaderRef = useRef<HTMLHeadingElement>(null);
  const windowBodyRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (parentRef.current) {
      const { clientWidth, clientHeight } = parentRef.current;

      setConstraints({
        left: -clientWidth / 2,
        right: clientWidth / 2,
        top: -clientHeight / 2,
        bottom: clientHeight / 2,
      });
    }
  }, [parentRef]);

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
  };

  return (
    <div
      ref={parentRef}
      className="w-[100%] h-[100%] flex justify-center items-center"
    >
      <motion.div
        ref={windowRef}
        className={`w-[60%] h-[70%] border-[1px] border-black rounded-[10px]`}
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
          className={`w-full h-[7%] min-h-[40px] bg-black rounded-t-[10px]
                      text-white flex justify-between items-center`}
          onPointerDown={(e) => {
            parentControls.start(e);
          }}
        >
          <div></div>
          <div className="h-[100%] pb-2 flex items-center">
            <button
              className={`h-full px-4 flex hover:bg-[#171717]`}
              onClick={() => {
                handleMinimizeScreen();
              }}
            >
              <MdMinimize size={23} />
            </button>
            <button
              className={`h-full px-4 flex items-center hover:bg-[#171717]`}
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
    </div>
  );
};

export default WindowCpn;
