import WindowContainer from "@/components/WindowContainer/WindowContainer";

const page = () => {
  return (
    <div
      className={`w-screen h-screen bg-[url('/Images/3.jpg')] bg-cover bg-center overflow-hidden`}
    >
      <WindowContainer />
    </div>
  );
};

export default page;
