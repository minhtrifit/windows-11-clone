import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
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
  fetchAudioDuration,
} from "@/lib/utils";
import { FILEBASE_STORAGE_PATH } from "../FolderContent/FolderContent";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { FaPlay, FaRegEdit } from "react-icons/fa";
import Loading from "@/components/Loading/Loading";

const SpotifyContent = () => {
  const { theme } = useTheme();

  const [loading, setLoading] = useState<boolean>(false);
  const [itemList, setItemList] = useState<APP_TYPE[]>([]);
  const [targetFile, setTargetFile] = useState<APP_TYPE | null>(null);
  const [durations, setDurations] = useState<any[]>([]);
  const [playlistName, setPlaylistName] = useState<string>("Chilling Mix");
  const [isEditName, setIsEditName] = useState<boolean>(false);
  const [editInput, setEditInput] = useState<string>("");

  const handleGetFileExplorerList = async () => {
    const res: any = await getFileExplorerList("asc");
    // console.log("FILE EXPLORER LIST:", res?.documents);

    if (res?.documents)
      setItemList(
        res?.documents?.filter((file: APP_TYPE) => {
          return file?.type === FILE_EXPLORER_APP_NAME.music;
        })
      );
  };

  const handleGetStorageFileList = async (path: string) => {
    setLoading(true);

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
    setLoading(false);
  };

  const fetchDurations = async () => {
    try {
      if (itemList) {
        const durationPromises = itemList.map((audio: APP_TYPE) => {
          if (audio?.content) {
            return fetchAudioDuration(audio?.content); // Return the promise
          }
          return null; // Return null for falsy audio.content values
        });

        const formattedDurations = await Promise.all(
          durationPromises.filter(Boolean)
        ); // Filter out null values

        setDurations(formattedDurations);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlePrevious = () => {
    const currentIndex = itemList.findIndex(
      (item) => item?.id === targetFile?.id
    );

    if (currentIndex !== -1) {
      let previousIndex = -1;

      if (currentIndex === 0) previousIndex = itemList?.length - 1;
      else previousIndex = currentIndex - 1;

      const previousSong: APP_TYPE = itemList[previousIndex];
      setTargetFile(previousSong);
    }
  };

  const handleNext = () => {
    const currentIndex = itemList.findIndex(
      (item) => item?.id === targetFile?.id
    );

    if (currentIndex !== -1) {
      let nextIndex = -1;

      if (currentIndex === itemList?.length - 1) nextIndex = 0;
      else nextIndex = currentIndex + 1;

      const nextSong: APP_TYPE = itemList[nextIndex];
      setTargetFile(nextSong);
    }
  };

  const handleEditPlaylistName = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editInput !== "") {
      setPlaylistName(editInput);
      localStorage.setItem("spotifyPlaylistName", editInput);
    }
    setIsEditName(false);
  };

  useEffect(() => {
    handleGetStorageFileList(
      process.env.NEXT_PUBLIC_FIREBASE_MUSIC_STORAGE_PATH
        ? process.env.NEXT_PUBLIC_FIREBASE_MUSIC_STORAGE_PATH
        : FILEBASE_STORAGE_PATH.music
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchDurations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemList]);

  useEffect(() => {
    const playlistName = localStorage.getItem("spotifyPlaylistName");

    if (playlistName === null) {
      localStorage.setItem("spotifyPlaylistName", "Chilling Mix");
    } else {
      setPlaylistName(playlistName);
    }
  }, []);

  return (
    <div
      className="w-full h-full rounded-b-md text-black dark:text-white bg-[#efefef] dark:bg-[#252525]
                    flex flex-col justify-between"
    >
      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <Loading width={60} height={60} />
        </div>
      ) : (
        <>
          <div className="w-full h-full bg-gradient-to-b from-zinc-300 dark:from-zinc-700">
            <div className="fixed h-[254px] p-4 flex flex-col gap-3">
              <div className="flex items-center gap-5">
                <Image
                  src={"/assets/avatar.png"}
                  alt="photo"
                  width={150}
                  height={150}
                />
                <div className="flex flex-col gap-1 items-start">
                  <p className="text-xs font-bold">PLAYLIST</p>
                  {isEditName ? (
                    <form
                      className="w-[400px] h-[60px]"
                      onSubmit={(e) => {
                        handleEditPlaylistName(e);
                      }}
                    >
                      <input
                        className="w-full h-full forcus:none px-4 rounded-md focus:outline outline-green-500"
                        value={editInput}
                        onChange={(e) => {
                          setEditInput(e.target.value);
                        }}
                      />
                    </form>
                  ) : (
                    <div className="h-[60px] flex items-center gap-5">
                      <h1 className="h-full flex items-center max-w-[600px] truncate text-5xl font-black text-sky-500">
                        {playlistName}
                      </h1>
                      <button
                        onClick={() => {
                          setIsEditName(true);
                        }}
                      >
                        <FaRegEdit size={25} />
                      </button>
                    </div>
                  )}
                  <p className="text-xs font-bold">{itemList?.length} songs</p>
                </div>
              </div>
              <div className="h-[60px] flex items-center gap-3">
                <div
                  className="w-[50px] h-[50px] rounded-full text-white bg-green-500
                          flex items-center justify-center"
                >
                  <FaPlay size={20} />
                </div>
                <div className="h-full flex items-center gap-2">
                  <h1 className="text-xl font-black">PLAYING</h1>
                  <p>{targetFile?.targetElementTabName}</p>
                </div>
              </div>
            </div>
            <div className="mt-[254px] h-[calc(100%-180px)] max-h-[268px] overflow-y-auto">
              {itemList?.map((item: APP_TYPE, index: number) => {
                return (
                  <div
                    className={`${
                      targetFile?.id === item?.id &&
                      "text-green-500 font-semibold"
                    } flex items-center justify-between rounded-sm p-4
                  hover:bg-zinc-300 dark:hover:bg-zinc-700 hover:cursor-default`}
                    key={uuidv4()}
                    onDoubleClick={() => {
                      setTargetFile(item);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <p>{index + 1}</p>
                      <p className="max-w-[800px] truncate">
                        {item?.targetElementTabName}
                      </p>
                    </div>
                    <p
                      className={`${
                        targetFile?.id === item?.id
                          ? "text-green-500"
                          : "text-zinc-600 dark:text-zinc-400"
                      } text-sm `}
                    >
                      {durations[index]}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <AudioPlayer
            style={{
              height: "90px",
              backgroundColor: theme === "light" ? "white" : "black",
              borderBottomLeftRadius: "6px",
              borderBottomRightRadius: "6px",
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
              handleNext();
            }}
            onClickPrevious={() => {
              console.log("previous");
              handlePrevious();
            }}
            onClickNext={() => {
              console.log("next");
              handleNext();
            }}
          />
        </>
      )}
    </div>
  );
};

export default SpotifyContent;
