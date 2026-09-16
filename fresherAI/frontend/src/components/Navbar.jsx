import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 left-0 right-0 z-50">
      {/* Top Announcement Banner */}
      <div className="bg-[#1C1B19] text-[#F7F5F0] text-center py-2 px-4 text-[13px] font-mono flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-[#2F5D50] animate-pulse" />
        <span>v1.2 Released: Next-gen Real-time Voice & System Design Canvas</span>
        <Link
          to="/dashboard"
          className="underline text-slate-300 hover:text-white ml-2 text-[12px]"
        >
          Try simulation →
        </Link>
      </div>

      {/* Main Navbar */}
      <nav className="border-b border-[#1C1B19]/10 bg-[#F7F5F0]/90 backdrop-blur-md transition-all">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-sm bg-[#2F5D50] flex items-center justify-center text-white text-sm font-mono font-medium shadow-sm transition-transform group-hover:scale-105">
              iv
            </div>
            <div className="flex flex-col">
              <span className="text-[17px] font-medium tracking-tight leading-none">
                Intervia <span className="text-[#2F5D50]">AI</span>
              </span>
              <span className="text-[10px] font-mono text-[#1C1B19]/50 tracking-wider">
                AGENTIC PLATFORM
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-[14px] text-[#1C1B19]/70 font-medium">
            <a href="#agents" className="hover:text-[#1C1B19] transition-colors">
              Agents
            </a>
            <a href="#tracks" className="hover:text-[#1C1B19] transition-colors">
              Interview Tracks
            </a>
            <a href="#comparison" className="hover:text-[#1C1B19] transition-colors">
              Comparison
            </a>
            <a href="#faq" className="hover:text-[#1C1B19] transition-colors">
              FAQ
            </a>
          </div>

          {/* Desktop Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/dashboard"
              className="px-4 py-2 text-[14px] text-[#1C1B19]/70 hover:text-[#1C1B19] transition-colors font-medium"
            >
              Log in
            </Link>
            <Link
              to="/dashboard"
              className="px-4 py-2 rounded-sm bg-[#1C1B19] hover:bg-[#2F5D50] text-white text-[14px] font-medium transition-colors shadow-sm flex items-center gap-1.5"
            >
              <span>Start practicing</span>
              <FiArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#1C1B19]/80 hover:text-[#1C1B19]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#1C1B19]/10 bg-[#F7F5F0] px-6 py-5 space-y-4 shadow-lg">
            <div className="flex flex-col space-y-3 text-[15px] font-medium text-[#1C1B19]/80">
              <a
                href="#agents"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#1C1B19]"
              >
                Agents
              </a>
              <a
                href="#tracks"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#1C1B19]"
              >
                Interview Tracks
              </a>
              <a
                href="#comparison"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#1C1B19]"
              >
                Comparison
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#1C1B19]"
              >
                FAQ
              </a>
            </div>
            <div className="pt-4 border-t border-[#1C1B19]/10 flex flex-col gap-2.5">
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-sm border border-[#1C1B19]/20 text-[14px] font-medium text-[#1C1B19]"
              >
                Log in
              </Link>
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-sm bg-[#1C1B19] text-white text-[14px] font-medium flex items-center justify-center gap-1.5"
              >
                <span>Start practicing</span>
                <FiArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
