import axios from "axios";
import { useEffect, useState } from "react";
import { type Tag } from "../constants/Tags";

interface Content {
  _id: string;
  title: string;
  link: string;
  types: "youtube" | "twitter";
  tag?: Tag | null;
}

export const useContent = () => {
  const [content, setContent] = useState<Content[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/content`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        });
        setContent(response.data.content);
      } catch (error) {
        console.error("Failed to fetch content", error);
      }
    };

    fetchContent();
  }, [refreshKey]);

  const refresh = () => setRefreshKey(prev => prev + 1);

  return { content, refresh };
};