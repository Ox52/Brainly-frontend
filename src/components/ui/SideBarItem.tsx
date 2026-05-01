import type { ReactElement } from "react";

interface SideBarItemProps {
  text: string;
  icon: ReactElement;
  active?: boolean;
  onClick?: () => void;
  badge?: number;
}

export const SideBarItem = ({ text, icon, active, onClick, badge }: SideBarItemProps) => {
  return (
    <div
      onClick={onClick}
      className={`flex gap-3 px-3 py-2 items-center cursor-pointer transition-all duration-200 rounded-lg
        ${active
          ? "bg-purple-50 text-purple-600"
          : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
        }`}
    >
      <div className="shrink-0">{icon}</div>
      <span className="text-sm font-medium flex-1">{text}</span>
      {badge !== undefined && badge > 0 && (
        <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold min-w-5 text-center
          ${active ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-500"}`}>
          {badge}
        </span>
      )}
    </div>
  );
};
