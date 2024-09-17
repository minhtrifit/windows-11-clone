import { db, storage } from "./firebase";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, listAll } from "firebase/storage";

export const COLLECTION_NAME = {
  ["FILE_EXPLORER_LIST"]: "file-explorer-list",
};

export const getFileExplorerList = async (sortOrder: string) => {
  if (sortOrder !== "asc" && sortOrder !== "desc") return [];

  try {
    const q = query(
      collection(db, COLLECTION_NAME.FILE_EXPLORER_LIST),
      orderBy("createdAt", sortOrder) // "desc" or "asc"
    );

    const querySnapshot = await getDocs(q);

    const documents = querySnapshot.docs.map((doc) => ({
      id: doc.id, // Get the document ID
      ...doc.data(), // Get the document data
    }));

    return { message: "Get file explorer list successfully", documents };
  } catch (error) {
    console.error("Get file explorer list failed: ", error);
    return { message: "Get file explorer list failed" };
  }
};

export const createNewTextDocument = async (
  type: string,
  content: string,
  targetElementTabName: string
) => {
  try {
    const docRef = await addDoc(
      collection(db, COLLECTION_NAME.FILE_EXPLORER_LIST),
      {
        ["type"]: type,
        ["content"]: content,
        ["targetElementTabName"]: targetElementTabName,
        ["createdAt"]: serverTimestamp(),
      }
    );

    return { message: "Create document successfully", data: docRef };
  } catch (error) {
    console.error("Create document failed: ", error);
    return { message: "Create document failed" };
  }
};

export const updateTextDocumentById = async (body: {
  id: string;
  data: any;
}) => {
  const { id, data } = body;

  if (!id || !data) {
    return { message: "Invalid request" };
  }

  try {
    const docRef = doc(db, COLLECTION_NAME.FILE_EXPLORER_LIST, id);
    await updateDoc(docRef, data);

    return { message: "Update document successfully" };
  } catch (error) {
    console.error("Update document failed", error);
    return { message: "Update document failed" };
  }
};

export const deleteTextDocumentById = async (id: string) => {
  if (!id) {
    return { message: "Invalid request" };
  }

  try {
    const docRef = doc(db, COLLECTION_NAME.FILE_EXPLORER_LIST, id);
    await deleteDoc(docRef);

    return { message: `Delete document with id: ${id} successfully` };
  } catch (error) {
    console.error("Delete document failed", error);
    return { message: "Delete document failed" };
  }
};

export const checkIfExistKeyStorage = async (
  collectionName: string,
  keyName: string,
  typeValue: string
) => {
  const q = query(
    collection(db, collectionName),
    where(keyName, "==", typeValue)
  );

  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) return true;
  else return false;
};

export const getStorageFileList = async (
  directoryPath: string
): Promise<{ name: string; url: string }[]> => {
  try {
    const directoryRef = ref(storage, directoryPath);
    const fileList = await listAll(directoryRef);

    // Map through each file and get both name and download URL
    const fileDetails = await Promise.all(
      fileList.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef);
        return {
          name: itemRef.name, // Get the file name
          url: url, // Get the download URL
        };
      })
    );

    return fileDetails;
  } catch (error) {
    console.error("Error listing files in Firebase Storage:", error);
    throw new Error("Failed to list files");
  }
};
