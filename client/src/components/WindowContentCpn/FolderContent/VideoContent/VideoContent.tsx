import { useTextDocumentStore } from "@/lib/store";

const VideoContent = () => {
  const itemData = useTextDocumentStore((state) => {
    return state.itemData;
  });

  return (
    <video className="w-full h-full rounded-b-md" controls autoPlay={true}>
      <source src={itemData?.content} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoContent;
