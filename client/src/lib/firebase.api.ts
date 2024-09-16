import { db } from "./firebase";
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
} from "firebase/firestore";

const COLLECTION_NAME = {
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
