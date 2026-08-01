import axios from "axios";

export const vercelApi = axios.create({
    baseURL: "https://api.vercel.com/v1",
    headers: {
        Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
    },
});