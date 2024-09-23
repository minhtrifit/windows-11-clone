import React, { useState } from "react";
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
import {
  HiOutlineArrowTopRightOnSquare,
  HiOutlineCurrencyEuro,
} from "react-icons/hi2";
import { LuHistory } from "react-icons/lu";
import {
  FaSquareRootAlt,
  FaChevronDown,
  FaVolumeUp,
  FaWeightHanging,
  FaFire,
} from "react-icons/fa";
import { RiDeleteBack2Line } from "react-icons/ri";
import { TbArrowsDoubleNeSw } from "react-icons/tb";
import { PiCalculatorFill } from "react-icons/pi";
import { MdOutlineScience } from "react-icons/md";
import { BsGraphDown } from "react-icons/bs";
import { IoCodeSlashSharp } from "react-icons/io5";
import { CgCalendarDates } from "react-icons/cg";
import { LiaRulerVerticalSolid } from "react-icons/lia";
import { FaTemperatureFull } from "react-icons/fa6";

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

const TAB_LIST = [
  {
    name: "Standard",
    icon: <PiCalculatorFill size={25} />,
  },
  {
    name: "Scentific",
    icon: <MdOutlineScience size={25} />,
  },
  {
    name: "Graphing",
    icon: <BsGraphDown size={20} />,
  },
  {
    name: "Programmer",
    icon: <IoCodeSlashSharp size={20} />,
  },
  {
    name: "Date calculation",
    icon: <CgCalendarDates size={25} />,
  },
];

const TAB2_LIST = [
  {
    name: "Currency",
    icon: <HiOutlineCurrencyEuro size={25} />,
  },
  {
    name: "Volume",
    icon: <FaVolumeUp size={25} />,
  },
  {
    name: "Length",
    icon: <LiaRulerVerticalSolid size={20} />,
  },
  {
    name: "Weight and mass",
    icon: <FaWeightHanging size={20} />,
  },
  {
    name: "Temperature",
    icon: <FaTemperatureFull size={25} />,
  },
  {
    name: "Energy",
    icon: <FaFire size={25} />,
  },
];

const CalculatorContent = () => {
  const [mode, setMode] = useState<string>(TAB_LIST[0]?.name);
  const [calcValue, setCalcValue] = useState<string>("");
  const [result, setResult] = useState<number>(0);

  const getLastNumber = (expression: string) => {
    const matches = expression.match(/(\d+)(?!.*\d)/);
    return matches ? matches[0] : null;
  };

  const replaceLastNumberWithSqrt = (expression: string) => {
    return expression.replace(/(\d+)(?=$)/, "sqrt($1)");
  };

  const exponentiateLastNumber = (expression: string) => {
    const numbers: any = expression.match(/\d+/g);

    if (numbers.length === 1) {
      return `${numbers[0]}^2`;
    }

    const lastNumber: string = numbers[numbers.length - 1];

    const newExpression: string = expression.replace(
      lastNumber,
      `${lastNumber}^2`
    );

    return newExpression;
  };

  const reciprocalLastNumber = (expression: string) => {
    const numbers: any = expression.match(/\d+/g);

    if (numbers.length === 1) {
      return `1/${numbers[0]}`;
    }

    const lastNumber: string = numbers[numbers.length - 1];

    const newExpression: string = expression.replace(
      lastNumber,
      `1/${lastNumber}`
    );

    return newExpression;
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
    } else if (value === "1/x") {
      const newValue = reciprocalLastNumber(calcValue);
      setCalcValue(newValue);
    } else if (value === "squared") {
      const newValue = exponentiateLastNumber(calcValue);
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
                  <SheetTitle className="text-zinc-400 dark:text-zinc-500">
                    Calculator
                  </SheetTitle>
                  <SheetDescription></SheetDescription>
                  <div className="w-full flex flex-col gap-3">
                    {TAB_LIST?.map(
                      (tab: { name: string; icon: React.ReactElement }) => {
                        return (
                          <div
                            key={uuidv4()}
                            className="p-2 flex items-center gap-3 rounded-md text-black dark:text-white
                                          hover:bg-zinc-200 dark:hover:bg-zinc-600"
                            onClick={() => {
                              setMode(tab?.name);
                            }}
                          >
                            {tab?.icon}
                            <p className="text-[1.05rem] hover:cursor-default">
                              {tab?.name}
                            </p>
                          </div>
                        );
                      }
                    )}
                  </div>
                </SheetHeader>
                <SheetHeader>
                  <SheetTitle className="text-zinc-400 dark:text-zinc-500">
                    Converter
                  </SheetTitle>
                  <SheetDescription></SheetDescription>
                  <div className="w-full flex flex-col gap-3">
                    {TAB2_LIST?.map(
                      (tab: { name: string; icon: React.ReactElement }) => {
                        return (
                          <div
                            key={uuidv4()}
                            className="p-2 flex items-center gap-3 rounded-md text-black dark:text-white
                                          hover:bg-zinc-200 dark:hover:bg-zinc-600"
                            onClick={() => {
                              setMode(tab?.name);
                            }}
                          >
                            <div>{tab?.icon}</div>
                            <div className="text-[1.05rem] hover:cursor-default">
                              {tab?.name}
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </SheetHeader>
              </SheetContent>
            </Sheet>
            <h1 className="text-xl font-bold max-w-[200px] truncate">{mode}</h1>
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
      <div className="self-end">
        <div className="grid grid-rows-1 grid-cols-6 gap-1 p-1">
          <div className="p-2 rounded-md hover:bg-zinc-300 hover:dark:bg-zinc-700 flex items-center justify-center">
            <span className="text-sm hover:cursor-default">MC</span>
          </div>
          <div className="p-2 rounded-md hover:bg-zinc-300 hover:dark:bg-zinc-700 flex items-center justify-center">
            <span className="text-sm hover:cursor-default">MR</span>
          </div>
          <div className="p-2 rounded-md hover:bg-zinc-300 hover:dark:bg-zinc-700 flex items-center justify-center">
            <span className="text-sm hover:cursor-default">M+</span>
          </div>
          <div className="p-2 rounded-md hover:bg-zinc-300 hover:dark:bg-zinc-700 flex items-center justify-center">
            <span className="text-sm hover:cursor-default">M-</span>
          </div>
          <div className="p-2 rounded-md hover:bg-zinc-300 hover:dark:bg-zinc-700 flex items-center justify-center">
            <span className="text-sm hover:cursor-default">MS</span>
          </div>
          <div className="p-2 rounded-md hover:bg-zinc-300 hover:dark:bg-zinc-700 flex items-center justify-center">
            <span className="text-sm hover:cursor-default flex items-center gap-1 justify-center">
              M <FaChevronDown size={10} />
            </span>
          </div>
        </div>
        <div className="grid grid-rows-6 grid-cols-4 gap-1 p-1">
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
    </div>
  );
};

export default CalculatorContent;
