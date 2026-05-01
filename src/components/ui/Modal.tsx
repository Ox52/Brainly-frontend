import { useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { CloseIcon } from "../../icons/CloseIcon";
import { Button } from "./button";
import { Input } from "./input";
import { TAG_STYLES, TAGS, type Tag } from "../../constants/Tags";


interface ModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const ContentType = {
  Youtube: "youtube",
  Twitter: "twitter",
} as const;

type ContentType = (typeof ContentType)[keyof typeof ContentType];

export const Modal = ({ open, onClose, onSuccess }: ModalProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState<ContentType>(ContentType.Youtube);
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);

  const addContent = async () => {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/content`, {
      title,
      link,
      types: type,
      tag: selectedTag,
    }, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });
    toast.success("Saved to your brain 🧠");

    if (titleRef.current) titleRef.current.value = "";
    if (linkRef.current) linkRef.current.value = "";
    setSelectedTag(null);

    onClose();
    onSuccess?.();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-105 flex flex-col gap-5 z-10">

        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Add Content</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <CloseIcon />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <Input inputRef={titleRef} placeholder="Title" label="Title" />
          <Input inputRef={linkRef} placeholder="https://" label="Link" />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Type</p>
          <div className="flex gap-2">
            <button
              onClick={() => setType(ContentType.Youtube)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all duration-150
                ${type === ContentType.Youtube
                  ? "bg-red-500 text-white border-red-500"
                  : "bg-white text-gray-600 border-gray-200 hover:border-red-300"}`}
            >
              YouTube
            </button>
            <button
              onClick={() => setType(ContentType.Twitter)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all duration-150
                ${type === ContentType.Twitter
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"}`}
            >
              Twitter
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Tag <span className="normal-case text-gray-400 font-normal">(optional)</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {TAGS.map((tag) => {
              const colors = TAG_STYLES[tag];
              const isActive = selectedTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(isActive ? null : tag)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150
                    ${isActive
                      ? `${colors.activeBg} text-white border-transparent`
                      : `${colors.bg} ${colors.text} border-transparent`}`}
                >
                  {!isActive && <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />}
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        <Button variant="primary" size="md" text="Add to Brain" fullWidth onClick={addContent} />
      </div>
    </div>
  );
};