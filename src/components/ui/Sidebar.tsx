import { useState } from "react";

import { BrainIcon } from "../../icons/BrainIcon";
import { AllIcon, RecentIcon, StarIcon, TagIcon } from "../../icons/SideBarIcon";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { YouTubeIcon } from "../../icons/YoutubeIcon";
import { SideBarItem } from "./SideBarItem";
import { useContentContext} from "../../hooks/Context";


export const SideBar = () => {
  const { filter, setFilter, activeTag, favorites, recents, allTags } = useContentContext();
  const [tagsExpanded, setTagsExpanded] = useState(filter === "tag");

  const favCount = favorites.size;
  const recentCount = recents.length;

  const handleTagsClick = () => {
    if (filter === "tag") {
      setTagsExpanded(prev => !prev);
    } else {
      setTagsExpanded(true);
      setFilter("tag", allTags[0]);
    }
  };

  return (
    <div className="h-screen bg-white border-r border-gray-100 w-64 flex flex-col shadow-sm">

      <div className="flex items-center gap-3 px-6 py-6 border-b border-gray-100">
        <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center text-white">
          <BrainIcon />
        </div>
        <span className="text-gray-800 font-semibold text-lg tracking-tight">Brainly</span>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-6">
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest px-3 mb-2">Library</p>
          <div className="flex flex-col gap-0.5">
            <SideBarItem
              text="All"
              icon={<AllIcon />}
              active={filter === "all"}
              onClick={() => setFilter("all")}
            />
            <SideBarItem
              text="Twitter"
              icon={<TwitterIcon />}
              active={filter === "twitter"}
              onClick={() => setFilter("twitter")}
            />
            <SideBarItem
              text="Youtube"
              icon={<YouTubeIcon />}
              active={filter === "youtube"}
              onClick={() => setFilter("youtube")}
            />
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest px-3 mb-2">Organize</p>
          <div className="flex flex-col gap-0.5">

            <SideBarItem
              text="Favourites"
              icon={<StarIcon />}
              active={filter === "favourites"}
              badge={favCount}
              onClick={() => setFilter("favourites")}
            />

            <SideBarItem
              text="Recent"
              icon={<RecentIcon />}
              active={filter === "recent"}
              badge={recentCount}
              onClick={() => setFilter("recent")}
            />

            <SideBarItem
              text="Tags"
              icon={<TagIcon />}
              active={filter === "tag"}
              onClick={handleTagsClick}
            />

            {filter === "tag" && tagsExpanded && (
              <div className="ml-4 flex flex-col gap-0.5 border-l-2 border-gray-100 pl-2 mt-0.5">
                {allTags.length === 0 ? (
                  <p className="text-xs text-gray-400 px-2 py-1.5">No tags yet</p>
                ) : (
                  allTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => setFilter("tag", tag)}
                      className={`text-left px-2 py-1.5 rounded-md text-xs font-medium transition-all
                        ${activeTag === tag
                          ? "bg-purple-50 text-purple-700"
                          : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"}`}
                    >
                      #{tag}
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="px-5 py-5 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-semibold text-sm">
            B
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-700">My Brain</span>
            <span className="text-xs text-gray-400">Personal workspace</span>
          </div>
        </div>
      </div>
    </div>
  );
};