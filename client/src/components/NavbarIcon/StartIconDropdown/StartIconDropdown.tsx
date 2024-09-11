import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PropType {
  isOpenStart: boolean;
  setIsOpenStart: Dispatch<SetStateAction<boolean>>;
}

const StartIconDropdown = (props: PropType) => {
  const { isOpenStart, setIsOpenStart } = props;

  const startDropdownRef = useRef<any>(null);

  const handleClickElement = (event: any) => {
    if (
      startDropdownRef.current &&
      !startDropdownRef.current.contains(event.target)
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
          <div className="p-4 bg-[#252525] rounded-t-md">Hello</div>
          <footer
            className="w-full h-[50px] bg-[#efefef] px-12 py-4 dark:bg-[#161616]
                            flex items-center justify-between rounded-b-md"
          >
            <div>Avatar</div>
            <div>Start</div>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StartIconDropdown;
