import { useState, useEffect, useContext } from "react";

import { TAG_STYLES, type Tag } from "../../constants/Tags";
import { YoutubeBadgeIcon } from "../../icons/YoutubeIcon";
import { TwitterBadgeIcon } from "../../icons/TwitterIcon";
import { DeleteIcon } from "../../icons/DeleteIcon";
import { FavouriteIcon } from "../../icons/FavouriteIcon";
import { ContentContext } from "../../hooks/Context";


interface CardProps {

    _id:        string;
    title:      string;
    link:       string;
    types:      "twitter"|"youtube";
    tag?:       Tag| null;
    onDelete?:  ()=> void;
    readonly?:  boolean; 
}


interface YoutubeThumbnailProps {

    videoId:     string;
    title:       string;
    link:        string;
}


const YoutubeThumbnail = ({videoId , title, link}: YoutubeThumbnailProps) =>{

    const [failed , setFailed ] = useState(false);
    

    return failed ? (

<div className="w-full h-full items-center justify-center bg-gray-50 ">

    <p className="text-gray-400 text-xs">No thumbnail available</p>
</div>


    ):(


        <a href={link} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
        <img src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
         alt={title}
          onError={() => setFailed(true)}
        className="w-full h-full object-cover"
          />
        
        </a>
    )
};

export const Card = ({ _id, title, link, types, tag, onDelete, readonly }: CardProps) => {
    const [videoId, setVideoId] = useState<string | null>(null);
    const context = useContext(ContentContext);
    const isFavorite = context?.isFavorite ?? (() => false);
    const toggleFavorite = context?.toggleFavorite ?? (() => {});
    const markVisited = context?.markVisited ?? (() => {});
  
    const fav = isFavorite(_id);
  
    const getYoutubeId = (url: string): string | null => {
      const regularFormat = url.split("v=");
      if (regularFormat.length > 1) return regularFormat[1].split("&")[0];
      const shortFormat = url.split("youtu.be/");
      if (shortFormat.length > 1) return shortFormat[1].split("?")[0];
      return null;
    };
  
    const normalizeTwitterLink = (url: string): string =>
      url.replace("x.com", "twitter.com").split("?")[0];
  
    useEffect(() => {
      if (types === "youtube") {
        const id = getYoutubeId(link);
        setVideoId(id);
      }
    }, [link, types]);
  
    useEffect(() => {
      if (types === "twitter") {
        const win = window as any;
        if (win.twttr?.widgets) {
          win.twttr.widgets.load();
        }
      }
    }, [types]);
  
    const isYoutube = types === "youtube";
    const isTwitter = types === "twitter";
    const tagStyle = tag ? TAG_STYLES[tag] : null;
  
    return (
      <div
        className="group relative w-80 bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        onClick={() => markVisited(_id)}
      >
  
        <div className="relative w-full h-44 overflow-hidden bg-gray-50">
          {isYoutube && (
            videoId
              ? <YoutubeThumbnail videoId={videoId} title={title} link={link} />
              : <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">Invalid link</div>
          )}
          {isTwitter && (
            <div className="w-full h-full overflow-hidden">
              <blockquote className="twitter-tweet" style={{ margin: 0 }}>
                <a href={normalizeTwitterLink(link)}></a>
              </blockquote>
            </div>
          )}
  
  
          <div className={`absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-sm shadow-sm
            ${isYoutube ? "bg-red-500/90 text-white" : "bg-black/80 text-white"}`}>
            {isYoutube ? <YoutubeBadgeIcon /> : <TwitterBadgeIcon />}
            {isYoutube ? "YouTube" : "Twitter"}
          </div>
  
          {!readonly &&
          <button
            onClick={(e) => { e.stopPropagation(); onDelete?.(); }}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-white/90 text-gray-500 hover:bg-red-50 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-sm"
            title="Delete"
          >
            <DeleteIcon />
          </button>
          }
  
  
          {!readonly &&
          <button
            onClick={(e) => { e.stopPropagation(); toggleFavorite(_id); }}
            className={`absolute bottom-3 right-3 p-1.5 rounded-full bg-white/90 transition-all duration-200 shadow-sm
              ${fav
                ? "text-red-400 opacity-100"
                : "text-gray-400 hover:text-red-400 opacity-0 group-hover:opacity-100"
              }`}
            title={fav ? "Remove from favourites" : "Add to favourites"}
          >
            <FavouriteIcon  />
          </button>
          }
        </div>
  
        <div className="px-4 py-3 flex flex-col gap-2">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold text-gray-800 truncate">{title}</h2>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="shrink-0 text-xs text-gray-400 hover:text-gray-700 transition-colors duration-150 flex items-center gap-1"
            >
              View
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>
  
          {tagStyle && tag && (
            <div className="flex">
              <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${tagStyle.bg} ${tagStyle.text}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${tagStyle.dot}`} />
                {tag}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  };

