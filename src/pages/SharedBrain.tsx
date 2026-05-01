import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Card } from "../components/ui/Card";
import { type Tag } from "../constants/Tags";
import { BrainIcon } from "../icons/BrainIcon";

interface SharedContent {
  _id: string;
  title: string;
  link: string;
  types: "youtube" | "twitter";
  tag?: Tag | null;
}

interface SharedBrainData {
  username: string;
  content: SharedContent[];
}

export const SharedBrain = () => {
  const { shareLink } = useParams<{ shareLink: string }>();
  const [data, setData] = useState<SharedBrainData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchShared = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/brainly/${shareLink}`);
        console.log(response.data);
        setData(response.data)
      } catch(err) {
        console.log("Shared brain fetch error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchShared();
  }, [shareLink]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-400 font-medium">Loading brain...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-center px-4">
          <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center text-red-400">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>
          <h2 className="text-lg font-bold text-gray-800">Brain not found</h2>
          <p className="text-sm text-gray-400">This link may have expired or been removed.</p>
        </div>
      </div>
    );
  }

  const youtubeCount = data.content.filter(c => c.types === "youtube").length;
  const twitterCount = data.content.filter(c => c.types === "twitter").length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center text-white">
              <BrainIcon />
            </div>
            <span className="font-bold text-gray-800 text-lg">Brainly</span>
          </div>
          <div className="text-xs text-gray-400 font-medium bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full">
            Read-only view
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 pt-12 pb-8">
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-purple-400">
            shared brain
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            {data.username}'s Brain
            <span className="text-purple-500">.</span>
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            A curated collection of {data.content.length} saved {data.content.length === 1 ? "resource" : "resources"}
          </p>
        </div>

        <div className="flex items-center gap-3 mt-6">
          <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-4 py-2 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-gray-400" />
            <span className="text-sm font-medium text-gray-600">All</span>
            <span className="text-xs font-bold text-gray-700 bg-gray-100 rounded-full px-2 py-0.5">{data.content.length}</span>
          </div>
          {youtubeCount > 0 && (
            <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-4 py-2 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-red-400" />
              <span className="text-sm font-medium text-gray-600">YouTube</span>
              <span className="text-xs font-bold text-red-600 bg-red-50 rounded-full px-2 py-0.5">{youtubeCount}</span>
            </div>
          )}
          {twitterCount > 0 && (
            <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-4 py-2 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-sky-400" />
              <span className="text-sm font-medium text-gray-600">Twitter</span>
              <span className="text-xs font-bold text-sky-600 bg-sky-50 rounded-full px-2 py-0.5">{twitterCount}</span>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 pb-16">
        {data.content.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 gap-3">
            <p className="text-gray-400 font-medium">This brain is empty</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-5">
            {data.content.map((item) => (
              <Card
                key={item._id}
                _id={item._id}
                title={item.title}
                link={item.link}
                types={item.types}
                tag={item.tag}
                readonly={true}               
              />
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-gray-100 bg-white py-6">
        <div className="max-w-6xl mx-auto px-8 flex items-center justify-between">
          <p className="text-xs text-gray-400">Made with ❤️ by <span className="font-semibold text-purple-500">harsh</span></p>
          <a href="/signup" className="text-xs text-purple-600 font-medium hover:underline">
            Build your own brain →
          </a>
        </div>
      </div>
    </div>
  );
};