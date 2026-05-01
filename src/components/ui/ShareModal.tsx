import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { CloseIcon } from "../../icons/CloseIcon";


interface ShareModalProps {
  open: boolean;
  onClose: () => void;
}

const ShareModal = ({ open, onClose }: ShareModalProps) => {
  const [hash, setHash] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  const shareLink = hash ? `${window.location.origin}/brainly/${hash}` : null;

  const handleShare = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/brainly/share`, { share: true }, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
      });
      setHash(res.data.hash);
      setShared(true);
      toast.success("Brain link generated 🔗");
    } catch {
      toast.error("Unable to generate share link");
    } finally {
      setLoading(false);
    }
  };

  const handleRevoke = async () => {
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/brainly/share`, { share: false }, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
      });
      setHash(null);
      setShared(false);
    } catch {
      alert("Failed to revoke link");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!shareLink) return;
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-105 flex flex-col gap-5 z-10">

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Share your Brain</h2>
            <p className="text-xs text-gray-400 mt-0.5">Anyone with the link can view your saved content</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <CloseIcon />
          </button>
        </div>

        {shared && shareLink ? (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
              <span className="text-xs text-gray-600 truncate flex-1">{shareLink}</span>
              <button
                onClick={handleCopy}
                className={`shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-150
                  ${copied ? "bg-green-500 text-white" : "bg-purple-600 text-white hover:bg-purple-700"}`}
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <button
              onClick={handleRevoke}
              disabled={loading}
              className="text-xs text-red-500 hover:text-red-700 font-medium text-center transition-colors"
            >
              Revoke link
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="bg-purple-50 rounded-xl p-4 text-sm text-purple-700 font-medium">
              Generate a shareable link to let others view your brain — no login required.
            </div>
            <button
              onClick={handleShare}
              disabled={loading}
              className="w-full py-2.5 bg-purple-600 text-white rounded-xl text-sm font-semibold hover:bg-purple-700 transition-all duration-150 disabled:opacity-50"
            >
              {loading ? "Generating..." : "Generate share link"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShareModal;