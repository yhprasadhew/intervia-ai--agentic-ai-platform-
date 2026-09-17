import React from "react";
import { Link } from "react-router-dom";
import {
  FiGrid,
  FiMic,
  FiFileText,
  FiBarChart2,
  FiMap,
  FiLogOut,
  FiArrowLeft,
  FiX,
  FiAward,
  FiZap,
} from "react-icons/fi";

const Sidebar = ({
  activeTab,
  setActiveTab,
  user,
  onLogout,
  isOpen,
  onClose,
}) => {
  const navItems = [
    {
      id: "overview",
      label: "Overview",
      icon: <FiGrid className="w-4 h-4" />,
      badge: null,
    },
    {
      id: "create-interview",
      label: "Create an Interview",
      icon: <FiMic className="w-4 h-4" />,
      badge: "Voice AI",
      highlight: true,
    },
    {
      id: "resume-builder",
      label: "Resume Builder",
      icon: <FiFileText className="w-4 h-4" />,
      badge: "ATS",
    },
    {
      id: "resume-scorer",
      label: "Resume Scorer",
      icon: <FiBarChart2 className="w-4 h-4" />,
      badge: "Audit",
    },
    {
      id: "roadmap-builder",
      label: "Roadmap Builder",
      icon: <FiMap className="w-4 h-4" />,
      badge: "Milestones",
    },
  ];

  const sidebarContent = (
    <div className="flex flex-col justify-between h-full p-4 sm:p-5 font-sans">
      {/* Top Header & Brand */}
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#1C1B19]/10">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-sm bg-[#2F5D50] flex items-center justify-center text-white text-sm font-mono font-medium shadow-sm transition-transform group-hover:scale-105">
              iv
            </div>
            <div className="flex flex-col">
              <span className="text-[17px] font-medium tracking-tight leading-none text-[#1C1B19]">
                Intervia <span className="text-[#2F5D50]">AI</span>
              </span>
              <span className="text-[10px] font-mono text-[#1C1B19]/50 tracking-wider">
                CANDIDATE PORTAL
              </span>
            </div>
          </Link>

          {/* Close button for mobile */}
          <button
            type="button"
            onClick={onClose}
            className="lg:hidden p-1.5 text-[#1C1B19]/60 hover:text-[#1C1B19] rounded-sm"
            aria-label="Close sidebar"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Candidate Coins Preview */}
        <div className="p-3.5 rounded-lg bg-[#F7F5F0] border border-[#1C1B19]/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-[#2F5D50]/15 text-[#2F5D50] flex items-center justify-center">
              <FiAward className="w-4 h-4" />
            </div>
            <div>
              <p className="font-mono text-[10.5px] uppercase tracking-wider text-[#1C1B19]/50">
                Interview Coins
              </p>
              <p className="font-serif text-[17px] font-medium text-[#1C1B19] leading-tight">
                {user?.interviewCoins ?? 150} Coins
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 font-mono text-[11px] font-medium text-[#2F5D50] bg-white px-2 py-0.5 rounded-sm border border-[#2F5D50]/20 shadow-2xs">
            <FiZap className="w-3 h-3" />
            <span>Active</span>
          </span>
        </div>

        {/* Navigation List */}
        <div className="space-y-1">
          <p className="font-mono text-[11px] uppercase tracking-wider text-[#1C1B19]/45 px-3 mb-2 font-medium">
            Navigation
          </p>
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActiveTab(item.id);
                  if (onClose) onClose();
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-[13.5px] font-medium transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#2F5D50] text-white shadow-sm"
                    : item.highlight
                    ? "text-[#1C1B19] bg-[#2F5D50]/8 hover:bg-[#2F5D50]/15 hover:text-[#2F5D50]"
                    : "text-[#1C1B19]/75 hover:bg-[#1C1B19]/5 hover:text-[#1C1B19]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={isActive ? "text-white" : item.highlight ? "text-[#2F5D50]" : "text-[#1C1B19]/60"}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`font-mono text-[10px] px-1.5 py-0.5 rounded-sm border ${
                      isActive
                        ? "bg-white/20 text-white border-white/30"
                        : "bg-white text-[#2F5D50] border-[#2F5D50]/20"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Profile & Actions */}
      <div className="pt-4 border-t border-[#1C1B19]/10 space-y-3">
        {/* Candidate User Info */}
        <div className="flex items-center justify-between gap-2 px-1">
          <div className="flex items-center gap-2.5 min-w-0">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.name || "User"}
                className="w-8 h-8 rounded-full border border-[#1C1B19]/20 object-cover shrink-0"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#2F5D50] text-white flex items-center justify-center font-mono text-xs font-semibold shrink-0">
                {(user?.name || user?.email || "U").charAt(0).toUpperCase()}
              </div>
            )}
            <div className="min-w-0">
              <p className="text-[13px] font-medium text-[#1C1B19] truncate leading-tight">
                {user?.name || "Candidate"}
              </p>
              <p className="text-[11px] font-mono text-[#1C1B19]/50 truncate leading-tight">
                {user?.email || "candidate@intervia.ai"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onLogout}
            title="Sign out"
            className="p-1.5 rounded-sm text-[#1C1B19]/60 hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer shrink-0"
            aria-label="Sign out"
          >
            <FiLogOut className="w-4 h-4" />
          </button>
        </div>

        {/* Back to Home Link */}
        <Link
          to="/"
          className="flex items-center gap-1.5 text-[12px] font-mono text-[#1C1B19]/60 hover:text-[#1C1B19] px-2 py-1.5 rounded transition-colors"
        >
          <FiArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Landing Page</span>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 xl:w-72 shrink-0 bg-white border-r border-[#1C1B19]/10 min-h-screen sticky top-0 h-screen overflow-y-auto">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            onClick={onClose}
            className="fixed inset-0 bg-[#1C1B19]/60 backdrop-blur-xs transition-opacity"
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-white shadow-2xl z-10 flex flex-col">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
