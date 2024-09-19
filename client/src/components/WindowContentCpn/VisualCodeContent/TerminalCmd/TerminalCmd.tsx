import { FaTerminal } from "react-icons/fa";
import { GiOpenFolder } from "react-icons/gi";
import { BiGitBranch } from "react-icons/bi";
import { VscThreeBars } from "react-icons/vsc";

interface PropType {
  childrenEl: React.ReactElement;
}

const TerminalCmd = (props: PropType) => {
  const { childrenEl } = props;

  return (
    <div className="flex items-center">
      <div className="flex items-center">
        <div className="flex gap-2 items-center text-white bg-blue-600 px-2 rounded-l-sm">
          <FaTerminal />
          <h1 className="max-w-[150px] text-sm truncate">minhtrifit</h1>
        </div>
        <div
          className=" w-5 h-5 bg-blue-600 border-l-2 border-blue-600 z-20"
          style={{
            clipPath: "polygon(0 0, 100% 50%, 0 100%)",
          }}
        />
      </div>
      <div className="flex items-center">
        <div className=" bg-orange-500 -translate-x-5">
          <div className="flex gap-2 items-center justify-center pl-8 text-white pr-2">
            <GiOpenFolder />
            <h1 className="max-w-[150px] text-sm truncate">
              ~/windows-11-clone
            </h1>
          </div>
        </div>
        <div
          className="-translate-x-5 w-5 h-5 border-l-2 border-orange-500 bg-orange-500 z-20"
          style={{
            clipPath: "polygon(0 0, 100% 50%, 0 100%)",
          }}
        />
      </div>
      <div className="flex items-center">
        <div className=" bg-yellow-400 -translate-x-10">
          <div className="flex gap-2 items-center justify-center pl-8 text-black pr-2">
            <BiGitBranch />
            <h1 className="text-sm max-w-[150px] truncate">master</h1>
            <VscThreeBars />
          </div>
        </div>
        <div
          className="-translate-x-10 w-5 h-5 border-l-2 border-yellow-400 bg-yellow-400 z-20"
          style={{
            clipPath: "polygon(0 0, 100% 50%, 0 100%)",
          }}
        ></div>
      </div>
      {childrenEl}
    </div>
  );
};

export default TerminalCmd;
