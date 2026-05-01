import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";



import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { SideBar } from "../components/ui/Sidebar";
import { Card } from "../components/ui/Card";
import { Modal } from "../components/ui/Modal";
import { LogoutIcon } from "../icons/Logout";
import ShareModal from "../components/ui/ShareModal";
import { useContentContext } from "../hooks/Context";
import { CloseIcon } from "../icons/CloseIcon";
import { MenuIcon } from "../icons/MenuIcon";


export const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const { content, refresh, displayedContent, filter, setFilter } = useContentContext();

  const youtubeCount = content.filter((c) => c.types === "youtube").length;
  const twitterCount = content.filter((c) => c.types === "twitter").length;

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.error("Log out successfully");
    navigate("/login");
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/v1/content/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success("Removed from brain 🗑");
      refresh();
    } catch (error) {
      toast.error("Could not delete content");
      console.error("Failed to delete the content", error);
    }
  };

  return (
    <div className="flex overflow-hidden h-screen bg-gray-50">

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`
          fixed inset-y-0 left-0 z-30 transition-transform duration-300 shrink-0
          md:static md:translate-x-0 md:z-auto
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <SideBar />
      </div>


      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <div className="shrink-0 bg-white border-b border-gray-100 px-4 md:px-8 py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button
              className="md:hidden flex items-center justify-center p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
              onClick={() => setSidebarOpen((prev) => !prev)}
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <CloseIcon /> : <MenuIcon />}
            </button>

            <div className="flex flex-col gap-0.5 min-w-0">
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-purple-400">
                workspace
              </span>
              <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-gray-900 leading-none truncate">
                My Brain<span className="text-purple-500">.</span>
              </h1>
              <p className="text-[11px] text-gray-400 font-medium tracking-wide">
                {displayedContent.length}{" "}
                {displayedContent.length === 1 ? "item saved" : "items saved"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShareModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-all duration-200 font-medium cursor-pointer"
              aria-label="Share"
            >
              <ShareIcon size="md" />
              <span className="hidden sm:inline">Share</span>
            </button>

            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition-all duration-200 cursor-pointer"
              aria-label="Add Content"
            >
              <PlusIcon size="md" />
              <span className="hidden sm:inline">Add Content</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-gray-500 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
              aria-label="Logout"
            >
              <LogoutIcon />
              <span className="hidden sm:inline font-medium">Logout</span>
            </button>
          </div>
        </div>

        {(filter === "all" || filter === "youtube" || filter === "twitter") && (
          <div className="shrink-0 px-4 md:px-8 py-3 bg-white border-b border-gray-50">
            <div className="flex gap-2 overflow-x-auto pb-0.5 [&::-webkit-scrollbar]:hidden"
              style={{ scrollbarWidth: "none" }}>
              {(["all", "youtube", "twitter"] as const).map((f) => {
                const count =
                  f === "all" ? content.length : f === "youtube" ? youtubeCount : twitterCount;
                const label = f === "all" ? "All" : f === "youtube" ? "YouTube" : "Twitter";
                const activeColors = {
                  all: "bg-gray-800 text-white border-gray-800",
                  youtube: "bg-red-500 text-white border-red-500",
                  twitter: "bg-sky-500 text-white border-sky-500",
                };
                const dotColors = {
                  all: "bg-gray-400",
                  youtube: "bg-red-400",
                  twitter: "bg-sky-400",
                };
                const isActive = filter === f;
                return (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-150 whitespace-nowrap
                      ${isActive ? activeColors[f] : "bg-white border-gray-100 text-gray-600 hover:border-gray-300 shadow-sm"}`}
                  >
                    {!isActive && <div className={`w-2 h-2 rounded-full ${dotColors[f]}`} />}
                    {label}
                    <span
                      className={`text-xs font-bold rounded-full px-2 py-0.5
                        ${isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-700"}`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6">
          {displayedContent.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 gap-3">
              <div className="w-16 h-16 rounded-2xl bg-purple-50 flex items-center justify-center">
                <PlusIcon size="md" />
              </div>
              <p className="text-gray-500 font-medium">No content here</p>
              <p className="text-gray-400 text-sm text-center">
                {filter === "all"
                  ? `Click "Add Content" to get started`
                  : filter === "favourites"
                  ? "Star a card to save it here"
                  : filter === "recent"
                  ? "Click any card to mark it as visited"
                  : filter === "tag"
                  ? "No cards with this tag yet"
                  : `No ${filter} content saved yet`}
              </p>
            </div>
          ) : (
            /* Responsive grid: 1 col → 2 col → 3 col → auto-wrap */
            <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
              {displayedContent.map(({ _id, title, link, types, tag }) => (
                <Card
                  key={_id}
                  _id={_id}
                  title={title}
                  link={link}
                  types={types}
                  tag={tag}
                  onDelete={() => handleDelete(_id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} onSuccess={refresh} />
      <ShareModal open={shareModalOpen} onClose={() => setShareModalOpen(false)} />
    </div>
  );
};