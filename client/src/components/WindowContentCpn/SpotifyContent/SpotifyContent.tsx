import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { v4 as uuidv4 } from "uuid";
import {
  checkIfExistKeyStorage,
  COLLECTION_NAME,
  createNewFileStoreFile,
  getFileExplorerList,
  getStorageFileList,
} from "@/lib/firebase.api";
import { APP_TYPE } from "@/lib/types";
import {
  FILE_EXPLORER_APP_NAME,
  AUDIO_TYPES,
  capitalizeFirstLetter,
} from "@/lib/utils";
import { FILEBASE_STORAGE_PATH } from "../FolderContent/FolderContent";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const SpotifyContent = () => {
  const { theme } = useTheme();

  const [itemList, setItemList] = useState<APP_TYPE[]>([]);
  const [targetFile, setTargetFile] = useState<APP_TYPE | null>(null);

  const handleGetFileExplorerList = async () => {
    const res: any = await getFileExplorerList("asc");
    console.log("FILE EXPLORER LIST:", res?.documents);

    if (res?.documents)
      setItemList(
        res?.documents?.filter((file: APP_TYPE) => {
          return file?.type === FILE_EXPLORER_APP_NAME.music;
        })
      );
  };

  const handleGetStorageFileList = async (path: string) => {
    const STORAGE_PATH = `gs://${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/${path}`;
    const files = await getStorageFileList(STORAGE_PATH);

    files?.map(async (file: { name: string; url: string; size: number }) => {
      const isExist = await checkIfExistKeyStorage(
        COLLECTION_NAME.FILE_EXPLORER_LIST,
        "content", // Firebase document format
        file?.url
      );

      const fileExtension = file?.name.split(".").pop()?.toLowerCase(); // Get file extension name

      // Create music file for FILE EXPLORER LIST
      if (
        !isExist &&
        file?.url &&
        fileExtension &&
        AUDIO_TYPES.includes(fileExtension)
      ) {
        const res: any = await createNewFileStoreFile(
          FILE_EXPLORER_APP_NAME.music,
          file?.url,
          file?.name
            ? capitalizeFirstLetter(file?.name.split(".")[0])
            : uuidv4(),
          file?.size
        );

        console.log(res);
      }
    });

    handleGetFileExplorerList();
  };

  useEffect(() => {
    handleGetStorageFileList(
      process.env.NEXT_PUBLIC_FIREBASE_MUSIC_STORAGE_PATH
        ? process.env.NEXT_PUBLIC_FIREBASE_MUSIC_STORAGE_PATH
        : FILEBASE_STORAGE_PATH.music
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="w-full h-full rounded-b-md text-black dark:text-white bg-[#efefef] dark:bg-[#252525]
                    flex flex-col justify-between"
    >
      <div className="h-full overflow-x-hidden overflow-y-auto">
        {itemList?.map((item: APP_TYPE) => {
          return (
            <div
              key={uuidv4()}
              onClick={() => {
                setTargetFile(item);
              }}
            >
              {item?.targetElementTabName}
            </div>
          );
        })}
      </div>
      <AudioPlayer
        style={{
          backgroundColor: theme === "light" ? "white" : "black",
        }}
        src={targetFile?.content}
        autoPlay={false}
        showSkipControls
        onPlay={() => {
          console.log("play");
        }}
        onPause={() => {
          console.log("pause");
        }}
        onEnded={() => {
          console.log("ended");
        }}
        onClickNext={() => {
          console.log("next");
        }}
        onClickPrevious={() => {
          console.log("previous");
        }}
      />
    </div>
  );
};

export default SpotifyContent;
