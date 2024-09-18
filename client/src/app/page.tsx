import LoginCpn from "@/components/LoginCpn/LoginCpn";

const Home = () => {
  return (
    <div
      className="w-screen h-screen overflow-hidden
                  flex items-center justify-center backdrop-blur-[1px] bg-black/30"
    >
      <LoginCpn />
    </div>
  );
};

export default Home;
