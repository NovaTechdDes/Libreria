import { useEffect, useState } from "react";
import { getUrl } from "@/utils/getURL";

export const useUrl = () => {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchUrl = async () => {
      const storedUrl = await getUrl();
      setUrl(storedUrl);
    };
    fetchUrl();
  }, []);

  return url;
};
