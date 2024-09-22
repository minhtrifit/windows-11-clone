import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { VscThreeBars } from "react-icons/vsc";
import { HiOutlineArrowTopRightOnSquare } from "react-icons/hi2";
import { LuHistory } from "react-icons/lu";
import { FaSquareRootAlt } from "react-icons/fa";
import { RiDeleteBack2Line } from "react-icons/ri";
import { TbArrowsDoubleNeSw } from "react-icons/tb";

const BUTTON_LIST = [
  { name: "%", icon: null },
  { name: "CE", icon: null },
  { name: "C", icon: null },
  { name: "delete", icon: <RiDeleteBack2Line size={18} /> },
  { name: "1/x", icon: null },
  { name: "squared", icon: <TbArrowsDoubleNeSw /> },
  { name: "square", icon: <FaSquareRootAlt /> },
  { name: "/", icon: null },
  { name: "7", icon: null },
  { name: "8", icon: null },
  { name: "9", icon: null },
  { name: "x", icon: null },
  { name: "4", icon: null },
  { name: "5", icon: null },
  { name: "6", icon: null },
  { name: "-", icon: null },
  { name: "1", icon: null },
  { name: "2", icon: null },
  { name: "3", icon: null },
  { name: "+", icon: null },
  { name: "+/_", icon: null },
  { name: "0", icon: null },
  { name: ".", icon: null },
  { name: "=", icon: null },
];

const CalculatorContent = () => {
  const [calcValue, setCalcValue] = useState<string>("");
  const [result, setResult] = useState<number>(0);

  const getLastNumber = (expression: string) => {
    const matches = expression.match(/(\d+)(?!.*\d)/);
    return matches ? matches[0] : null;
  };

  const replaceLastNumberWithSqrt = (expression: string) => {
    return expression.replace(/(\d+)(?=$)/, "sqrt($1)");
  };

  const formatNumber = (num: number) => {
    if (num % 1 !== 0 && num.toString().split(".")[1].length > 5) {
      return parseFloat(num.toFixed(5));
    }
    return num;
  };

  const calculateExpression = (expression: string) => {
    try {
      if (expression.includes("sqrt")) {
        expression = expression.replace(/sqrt\((.*?)\)/g, (_, number) => {
          return String(Math.sqrt(Number(number)));
        });
      }

      const result = eval(expression.replace(/\^/g, "**"));
      return result;
    } catch (error) {
      console.error("Invalid expression", error);
      return null;
    }
  };

  const handleCalc = (value: string) => {
    if (value === "=") {
      const res = calculateExpression(calcValue);
      if (res === null) setResult(0);
      else setResult(res);
    } else if (value === "delete") {
      // setCalcValue(calcValue.slice(0, -1));
      setCalcValue("");
    } else if (value === "x") {
      const newValue = calcValue + "*";
      setCalcValue(newValue);
    } else if (value === "squared") {
      const lastValue = calcValue.charAt(calcValue.length - 1);
      const newValue = lastValue + "^2";
      setCalcValue(newValue);
    } else if (value === "square") {
      const lastNumber = getLastNumber(calcValue);
      if (lastNumber !== null) {
        const recentValue = replaceLastNumberWithSqrt(calcValue);
        setCalcValue(recentValue);
      }
    } else {
      const newValue = calcValue + value;
      setCalcValue(newValue);
    }
  };

  return (
    <div
      className="w-[350px] h-[99%] mx-auto text-black dark:text-white bg-[#efefef] dark:bg-[#252525]
                    grid grid-cols-1 rounded-b-md"
    >
      <div className="self-start">
        <div className="w-full flex items-center justify-between p-1">
          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger>
                <div className="p-2 rounded-md hover:bg-zinc-300 hover:dark:bg-zinc-700">
                  <VscThreeBars size={20} />
                </div>
              </SheetTrigger>
              <SheetContent side={"left"} className="flex flex-col gap-5">
                <SheetHeader>
                  <SheetTitle>Calculator</SheetTitle>
                  <SheetDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </SheetDescription>
                </SheetHeader>
                <SheetHeader>
                  <SheetTitle>Converter</SheetTitle>
                  <SheetDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
            <h1 className="text-xl font-bold">Standard</h1>
            <div className="p-2 rounded-md hover:bg-zinc-300 hover:dark:bg-zinc-700">
              <HiOutlineArrowTopRightOnSquare size={20} />
            </div>
          </div>
          <div className="p-2 rounded-md hover:bg-zinc-300 hover:dark:bg-zinc-700">
            <LuHistory size={20} />
          </div>
        </div>
        <div className="px-1 py-2 flex flex-col items-end gap-5">
          <p className="h-[20px] text-sm dark:text-zinc-400">{calcValue}</p>
          <p className="text-5xl font-bold">{formatNumber(result)}</p>
        </div>
      </div>
      <div className="self-end grid grid-row-6 grid-cols-4 gap-1 p-1">
        {BUTTON_LIST?.map(
          (btn: { name: string; icon: React.ReactElement | null }) => {
            return (
              <div
                key={uuidv4()}
                className="p-4 rounded-md text-center flex items-center justify-center
                            bg-zinc-300 dark:bg-zinc-700
                            hover:bg-zinc-200 hover:dark:bg-zinc-600 hover:cursor-default"
                onClick={() => {
                  handleCalc(btn?.name);
                }}
              >
                {btn?.icon !== null ? btn?.icon : btn?.name}
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default CalculatorContent;
