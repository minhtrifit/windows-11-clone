import { motion } from "framer-motion";

interface PropType {
  width: number;
  height: number;
}

const Loading = (props: PropType) => {
  const { width, height } = props;

  return (
    <div className="flex justify-center items-center h-screen">
      <motion.div
        style={{
          width: `${width}px`,
          height: `${height}px`,
        }}
        className="border-4 border-sky-500 border-t-transparent border-solid rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, ease: "linear", repeat: Infinity }}
      />
    </div>
  );
};

export default Loading;
