"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useContext, useEffect, useState } from "react";
import { getFormattedTime } from "@/lib/utils";
import { signIn } from "@/lib/firebase.auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Loading from "../Loading/Loading";
import { FaChevronRight } from "react-icons/fa";
import { AuthContext } from "../Providers/AuthProvider/AuthProvider";

const LoginCpn = () => {
  const { loading }: any = useContext(AuthContext);
  const router = useRouter();

  const [time, setTime] = useState<string>(getFormattedTime());
  const [loginForm, setLoginForm] = useState<{
    userName: string;
    password: string;
  }>({ userName: "", password: "" });

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (loginForm.userName !== "" && loginForm.password !== "") {
        console.log(loginForm);
        await signIn(loginForm.userName, loginForm.password);
        router.push("/main");
        setLoginForm({ userName: "", password: "" });
      }
    } catch (error) {
      console.log("LOGIN ERROR:", error);
    }
  };

  // Update time every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(getFormattedTime());
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col items-center gap-5">
      <h1 className="text-6xl text-white font-bold mb-10">{time}</h1>
      {loading ? (
        <Loading width={60} height={60} />
      ) : (
        <div className="flex flex-col items-center gap-5">
          <Avatar className="w-40 h-40 text-5xl">
            <AvatarImage src="/assets/avatar.png" />
            <AvatarFallback>T</AvatarFallback>
          </Avatar>
          <form
            className="w-[350px] flex flex-col items-center gap-5"
            onSubmit={(e) => {
              handleLogin(e);
            }}
          >
            <input
              className="w-full bg-inherit outline-none font-bold text-2xl text-white placeholder: text-center"
              placeholder="Enter your name"
              value={loginForm.userName}
              onChange={(e) => {
                setLoginForm({ ...loginForm, userName: e.target.value });
              }}
            />
            <div className="w-full flex items-center gap-3">
              <input
                type="password"
                className="w-full px-4 py-3 rounded-md text-sm text-white outline-none
                        backdrop-blur-sm bg-black/30 border-b border-b-zinc-400 focus:border-inherit"
                placeholder="Password"
                value={loginForm.password}
                onChange={(e) => {
                  setLoginForm({ ...loginForm, password: e.target.value });
                }}
              />
              <button className="p-2 rounded-full text-white bg-black">
                <FaChevronRight size={18} />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginCpn;
