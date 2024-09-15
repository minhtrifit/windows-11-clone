import { db } from "./firebase";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";

const COLLECTION_NAME = {
  ["FILE_EXPLORER_LIST"]: "file-explorer-list",
};

export const getFileExplorerList = async (sortOrder: string) => {
  if (sortOrder !== "asc" && sortOrder !== "desc") return [];

  const q = query(
    collection(db, COLLECTION_NAME.FILE_EXPLORER_LIST),
    orderBy("createdAt", sortOrder) // "desc" or "asc"
  );

  const querySnapshot = await getDocs(q);

  const documents = querySnapshot.docs.map((doc) => ({
    id: doc.id, // Get the document ID
    ...doc.data(), // Get the document data
  }));

  return documents;
};

export const createNewTextDocument = async (
  type: string,
  content: string,
  targetElementTabName: string
) => {
  const docRef = await addDoc(
    collection(db, COLLECTION_NAME.FILE_EXPLORER_LIST),
    {
      ["type"]: type,
      ["content"]: content,
      ["targetElementTabName"]: targetElementTabName,
      ["createdAt"]: serverTimestamp(),
    }
  );

  console.log(docRef);
};
