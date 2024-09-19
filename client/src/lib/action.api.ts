"use server";

import axios from "axios";

export const getAllUsers = async () => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
    return res.data;
  } catch (err: any) {
    console.log("API CALL ERROR:", err?.response?.data);
    return err?.response?.data;
  }
};

export const executeCode = async (
  name: string,
  version: string,
  language: string,
  content: string
) => {
  if (process.env.NEXT_PUBLIC_CODE_EXCUTE_API_URL) {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_CODE_EXCUTE_API_URL}/execute`,
        {
          language: language,
          version: version,
          files: [
            {
              name: name,
              content: content,
            },
          ],
        }
      );
      return response.data;
    } catch (err: any) {
      console.log("API CALL ERROR:", err?.response?.data);
      return err?.response?.data;
    }
  }
};
