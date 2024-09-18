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

export const excuteCode = async (
  name: string,
  version: string,
  language: string,
  content: string
) => {
  try {
    const response = await axios.post(
      "https://emkc.org/api/v2/piston/execute",
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
};
