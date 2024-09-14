import Image from "next/image";
import { useTheme } from "next-themes";
import { v4 as uuidv4 } from "uuid";
import { usePersonalizeSettingStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BackgroundContent = () => {
  const { theme } = useTheme();

  const backgroundUrl = usePersonalizeSettingStore((state) => {
    return state.backgroundUrl;
  });

  const backgroundUrlList = usePersonalizeSettingStore((state) => {
    return state.backgroundUrlList;
  });

  const updateBackgroundUrl = usePersonalizeSettingStore((state) => {
    return state.updateBackgroundUrl;
  });

  const handleUpdateImage = (url: string) => {
    updateBackgroundUrl(url);
    localStorage.setItem("bgUrl", url);
  };

  return (
    <div className="px-12 py-2 flex flex-col gap-5">
      <h1>Recent images</h1>
      <div className="flex items-center flex-wrap gap-2">
        {backgroundUrlList?.map((url: string) => {
          return (
            <div
              key={uuidv4()}
              className={`relative w-[140px] h-[100px] flex rounded-md border-[4px] ${
                backgroundUrl === url && "border-sky-600"
              }`}
              onClick={() => {
                handleUpdateImage(url);
              }}
            >
              <Image
                src={url}
                alt="background"
                layout="fill"
                objectFit="cover"
                style={{ borderRadius: "6px" }}
                // width={0}
                // height={0}
                // sizes="100vw"
                // style={{ width: "100%", height: "100%" }}
              />
            </div>
          );
        })}
      </div>
      <div className="px-4 py-2 rounded-md bg-zinc-300 dark:bg-zinc-700 flex items-center justify-between">
        <h1>Choose a photo</h1>
        <Button variant={theme === "light" ? "secondary" : "outline"}>
          Browse photos
        </Button>
      </div>
      <div className="px-4 py-2 rounded-md bg-zinc-300 dark:bg-zinc-700 flex items-center justify-between">
        <h1>Choose a fit for your destop image</h1>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="fill">Fill</SelectItem>
              <SelectItem value="fit">Fit</SelectItem>
              <SelectItem value="stretch">Stretch</SelectItem>
              <SelectItem value="tile">Tile</SelectItem>
              <SelectItem value="center">Center</SelectItem>
              <SelectItem value="span">Span</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default BackgroundContent;
