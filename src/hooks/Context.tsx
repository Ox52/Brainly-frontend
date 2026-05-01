import { createContext, useContext, useMemo, useState } from "react";
import { useContent } from "./useContent";
import { type Tag } from "../constants/Tags";

type ContentFilter = "all" | "twitter" | "youtube" | "favourites" | "recent" | "tag";

interface ContentItem {
  _id: string;
  title: string;
  link: string;
  types: "youtube" | "twitter";
  tag?: Tag | null;
}

interface ContentContextValue {
  content: ContentItem[];
  refresh: () => void;
  displayedContent: ContentItem[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
  markVisited: (id: string) => void;
  filter: ContentFilter;
  activeTag: string | null;
  setFilter: (filter: ContentFilter, tag?: string) => void;
  favorites: Set<string>;
  recents: string[];
  allTags: string[];
}

export const ContentContext = createContext<ContentContextValue | null>(null);

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { content, refresh } = useContent();
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [visited, setVisited] = useState<Set<string>>(new Set());
  const [filter, setFilterState] = useState<ContentFilter>("all");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const setFilter = (nextFilter: ContentFilter, tag?: string) => {
    setFilterState(nextFilter);
    setActiveTag(nextFilter === "tag" ? tag ?? null : null);
  };

  const displayedContent = useMemo(() => {
    if (filter === "all") return content;
    if (filter === "youtube" || filter === "twitter") {
      return content.filter((item) => item.types === filter);
    }
    if (filter === "favourites") {
      return content.filter((item) => favorites.has(item._id));
    }
    if (filter === "recent") {
      return content.filter((item) => visited.has(item._id));
    }
    if (filter === "tag") {
      if (!activeTag) return [];
      return content.filter((item) => item.tag === activeTag);
    }
    return content;
  }, [activeTag, content, favorites, filter, visited]);

  const allTags = useMemo(
    () => [...new Set(content.map((item) => item.tag).filter(Boolean) as string[])],
    [content]
  );

  const value = useMemo<ContentContextValue>(
    () => ({
      content,
      refresh,
      displayedContent,
      isFavorite: (id: string) => favorites.has(id),
      toggleFavorite: (id: string) => {
        setFavorites((prev) => {
          const next = new Set(prev);
          if (next.has(id)) {
            next.delete(id);
          } else {
            next.add(id);
          }
          return next;
        });
      },
      markVisited: (id: string) => {
        setVisited((prev) => new Set(prev).add(id));
      },
      filter,
      activeTag,
      setFilter,
      favorites,
      recents: Array.from(visited),
      allTags,
    }),
    [activeTag, allTags, content, displayedContent, favorites, filter, refresh, visited]
  );

  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  );
};

export const useContentContext = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useContentContext must be used within ContextProvider");
  }
  return context;
};