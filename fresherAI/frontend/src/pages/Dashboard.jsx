import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiLogOut,
  FiAward,
  FiPlay,
  FiCheckCircle,
  FiUser,
  FiShield,
  FiCpu,
  FiLayers,
  FiCode,
  FiMessageSquare,
  FiMenu,
  FiMic,
  FiFileText,
  FiBarChart2,
  FiMap,
  FiUploadCloud,
  FiCheck,
  FiDownload,
  FiPlus,
  FiZap,
  FiClock,
  FiBriefcase,
  FiTrendingUp,
} from "react-icons/fi";
import { auth, signOut } from "../configs/firebase.js";
import Sidebar from "../components/Sidebar.jsx";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Active view tab: "overview" | "create-interview" | "resume-builder" | "resume-scorer" | "roadmap-builder"
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Create Interview Form State
  const [selectedTrack, setSelectedTrack] = useState("backend");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Senior / Staff (L5-L6)");
  const [selectedDuration, setSelectedDuration] = useState("45 mins");
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [companyPreset, setCompanyPreset] = useState("Tier-1 Big Tech (Meta / Google / Stripe)");

  // Resume Builder Form State
  const [resumeRole, setResumeRole] = useState("Staff Distributed Systems Engineer");
  const [resumeSummary, setResumeSummary] = useState(
    "High-performance backend engineer with 7+ years architecting fault-tolerant microservices, Kafka event streams, and PostgreSQL clusters serving 150k+ QPS with 99.99% SLA."
  );
  const [resumeBullets, setResumeBullets] = useState([
    "Architected distributed caching layer with Redis Cluster, slashing p99 latency from 180ms to 24ms.",
    "Led migration of monolith services to Kubernetes microservices, cutting cloud infrastructure spend by $320k/year.",
    "Implemented automated chaos engineering pipelines with 100% test coverage on mission-critical payment webhooks.",
  ]);
  const [newBullet, setNewBullet] = useState("");

  // Resume Scorer State
  const [resumeText, setResumeText] = useState("");
  const [jobSpecText, setJobSpecText] = useState("");
  const [scoreResult, setScoreResult] = useState(null);
  const [isScoring, setIsScoring] = useState(false);

  // Roadmap State
  const [roadmapMilestones, setRoadmapMilestones] = useState([
    {
      week: "Week 1",
      topic: "Deep Distributed Systems & Cache Invalidation",
      status: "completed",
      items: [
        "Cache stampede mitigation (Probabilistic early expiration)",
        "Write-through vs Write-back patterns in PostgreSQL + Redis",
        "Master-replica replication lag & read-your-writes consistency",
      ],
    },
    {
      week: "Week 2",
      topic: "High-Throughput Streaming with Apache Kafka",
      status: "in-progress",
      items: [
        "Partition key hashing & consumer group rebalancing",
        "Exactly-once semantics (EOS) and idempotency keys",
        "Dead-letter queues and backpressure strategies",
      ],
    },
    {
      week: "Week 3",
      topic: "Concurrent Systems & Database Locking",
      status: "upcoming",
      items: [
        "Optimistic vs Pessimistic locking under high contention",
        "Distributed locks using Redis Redlock & etcd leases",
        "Two-phase commit (2PC) vs Saga orchestration patterns",
      ],
    },
    {
      week: "Week 4",
      topic: "Live AI Simulation & System Architecture Defense",
      status: "upcoming",
      items: [
        "Full 60-min simulation with Agent Elena (Principal Solutions Architect)",
        "Defense of global multi-region failover and geo-DNS routing",
        "Comprehensive scorecard review and weak-spot calibration",
      ],
    },
  ]);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

  useEffect(() => {
    const initUser = async () => {
      // 1. Try reading from localStorage first
      const stored = localStorage.getItem("intervia_user");
      if (stored) {
        try {
          setUser(JSON.parse(stored));
        } catch (e) {
          console.error("Failed to parse stored user", e);
        }
      }

      // 2. Validate session with backend /auth/me
      try {
        const res = await fetch(`${API_BASE_URL}/auth/me`, {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.user) {
            setUser((prev) => ({
              ...prev,
              ...data.user,
            }));
            localStorage.setItem(
              "intervia_user",
              JSON.stringify({
                ...JSON.parse(stored || "{}"),
                ...data.user,
              })
            );
          }
        }
      } catch (err) {
        console.warn("Session check fallback:", err.message);
      } finally {
        setLoading(false);
      }
    };

    initUser();
  }, [API_BASE_URL]);

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        credentials: "include",
      });
    } catch (e) {
      console.warn("Backend logout error:", e);
    }

    try {
      await signOut(auth);
    } catch (e) {
      console.warn("Firebase signout error:", e);
    }

    localStorage.removeItem("intervia_user");
    setUser(null);
    navigate("/login");
  };

  const handleAddBullet = (e) => {
    e.preventDefault();
    if (!newBullet.trim()) return;
    setResumeBullets([...resumeBullets, newBullet.trim()]);
    setNewBullet("");
  };

  const handleScoreResume = () => {
    setIsScoring(true);
    setTimeout(() => {
      setScoreResult({
        overall: 89,
        atsMatch: "94%",
        quantImpact: "88%",
        techAlignment: "92%",
        strengths: [
          "Strong quantitative metrics on p99 latency reduction and cost savings.",
          "Excellent alignment with distributed systems concepts (Kafka, Redis, K8s).",
          "Clear ownership and Staff-level architectural scope.",
        ],
        gaps: [
          "Recommend highlighting fault-injection testing or DR drill frequency.",
          "Add mention of team leadership, mentoring, or RFC governance.",
        ],
      });
      setIsScoring(false);
    }, 900);
  };

  const tracks = [
    {
      id: "backend",
      title: "Backend & Distributed Systems",
      agent: "Agent Marcus",
      role: "Staff Infrastructure Engineer",
      duration: "45 mins",
      difficulty: "Senior / Staff (L5-L6)",
      coins: "40 Coins",
      icon: <FiCpu className="w-5 h-5 text-[#2F5D50]" />,
    },
    {
      id: "architecture",
      title: "System Design & Architecture",
      agent: "Agent Elena",
      role: "Principal Solutions Architect",
      duration: "60 mins",
      difficulty: "Staff / Principal (L6-L7)",
      coins: "50 Coins",
      icon: <FiLayers className="w-5 h-5 text-[#2F5D50]" />,
    },
    {
      id: "algorithms",
      title: "Data Structures & Concurrency",
      agent: "Agent Alex",
      role: "Senior Algorithms Specialist",
      duration: "45 mins",
      difficulty: "L4 / L5 Intermediate",
      coins: "35 Coins",
      icon: <FiCode className="w-5 h-5 text-[#2F5D50]" />,
    },
    {
      id: "leadership",
      title: "Behavioral & Cross-Functional",
      agent: "Agent Sarah",
      role: "Engineering Director",
      duration: "30 mins",
      difficulty: "All Senior Levels",
      coins: "25 Coins",
      icon: <FiMessageSquare className="w-5 h-5 text-[#2F5D50]" />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#1C1B19] font-sans selection:bg-[#2F5D50] selection:text-white flex">
      {/* ================= REUSABLE SIDEBAR ================= */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        onLogout={handleLogout}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* ================= MAIN CONTENT WRAPPER ================= */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Mobile/Header Bar */}
        <header className="sticky top-0 z-30 bg-[#F7F5F0]/90 backdrop-blur-md border-b border-[#1C1B19]/10 px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Hamburger Button for Mobile */}
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-[#1C1B19] hover:bg-[#1C1B19]/5 rounded-md"
              aria-label="Open sidebar"
            >
              <FiMenu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] px-2 py-0.5 rounded-sm bg-[#2F5D50]/10 text-[#2F5D50] font-medium border border-[#2F5D50]/20 uppercase">
                {activeTab.replace("-", " ")}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Coin Balance Pill */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-white border border-[#1C1B19]/15 font-mono text-[12px] text-[#1C1B19] shadow-2xs">
              <FiAward className="w-3.5 h-3.5 text-[#2F5D50]" />
              <span>{user?.interviewCoins ?? 150} Coins</span>
            </div>

            {/* Candidate Avatar */}
            {user && (
              <div className="flex items-center gap-2">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.name || "User"}
                    className="w-7 h-7 rounded-full border border-[#1C1B19]/20 object-cover"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-[#2F5D50] text-white flex items-center justify-center font-mono text-xs font-semibold">
                    {(user.name || user.email || "U").charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="hidden md:inline text-[13px] font-medium text-[#1C1B19]">
                  {user.name || "Candidate"}
                </span>
              </div>
            )}
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-8 max-w-6xl w-full mx-auto space-y-8">
          {/* Offline notice if backend is disconnected */}
          {user?.isOfflineMode && (
            <div className="p-3.5 bg-amber-50 border border-amber-200 text-amber-900 rounded-lg text-[13px] flex items-center gap-2.5 shadow-2xs">
              <span>ℹ️</span>
              <span>
                Signed in via Firebase. Backend gateway on port 8000 is not reachable yet. Run{" "}
                <code className="bg-amber-100 px-1 py-0.5 rounded font-mono text-[11px]">npm run dev</code> in{" "}
                <code className="bg-amber-100 px-1 py-0.5 rounded font-mono text-[11px]">fresherAI/backend</code>.
              </span>
            </div>
          )}

          {/* ================= TAB 1: OVERVIEW ================= */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Welcome Section */}
              <div className="bg-white border border-[#1C1B19]/10 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-[#2F5D50]/10 text-[#2F5D50] font-mono text-[11px] font-medium mb-3">
                    <FiShield className="w-3.5 h-3.5" />
                    <span>ACTIVE SESSION VERIFIED</span>
                  </div>
                  <h1 className="font-serif text-[28px] sm:text-[34px] font-medium tracking-tight text-[#1C1B19] leading-tight">
                    Welcome back, {user?.name || "Candidate"}
                  </h1>
                  <p className="mt-1.5 text-[14.5px] text-[#1C1B19]/65 max-w-xl">
                    Your AI engineering prep hub is ready. Create a real-time interview simulation, audit your resume against target job specs, or follow your weekly roadmap.
                  </p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                  <button
                    type="button"
                    onClick={() => setActiveTab("create-interview")}
                    className="px-5 py-2.5 rounded-sm bg-[#2F5D50] hover:bg-[#254a40] text-white text-[13.5px] font-medium transition-colors shadow-sm flex items-center justify-center gap-2 flex-1 md:flex-none cursor-pointer"
                  >
                    <FiMic className="w-4 h-4" />
                    <span>Create an Interview</span>
                  </button>
                </div>
              </div>

              {/* Stats Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-[#1C1B19]/10 rounded-xl p-5 shadow-sm">
                  <div className="flex items-center justify-between text-[#1C1B19]/60 mb-2">
                    <span className="font-mono text-[11px] uppercase tracking-wider">Interview Coins</span>
                    <FiAward className="w-4 h-4 text-[#2F5D50]" />
                  </div>
                  <p className="font-serif text-[32px] font-medium text-[#1C1B19]">
                    {user?.interviewCoins ?? 150}
                  </p>
                  <p className="text-[12px] font-mono text-[#2F5D50] mt-1">+50 starter bonus active</p>
                </div>

                <div className="bg-white border border-[#1C1B19]/10 rounded-xl p-5 shadow-sm">
                  <div className="flex items-center justify-between text-[#1C1B19]/60 mb-2">
                    <span className="font-mono text-[11px] uppercase tracking-wider">Simulations Done</span>
                    <FiCheckCircle className="w-4 h-4 text-[#2F5D50]" />
                  </div>
                  <p className="font-serif text-[32px] font-medium text-[#1C1B19]">0</p>
                  <p className="text-[12px] font-mono text-[#1C1B19]/50 mt-1">Ready for first session</p>
                </div>

                <div className="bg-white border border-[#1C1B19]/10 rounded-xl p-5 shadow-sm">
                  <div className="flex items-center justify-between text-[#1C1B19]/60 mb-2">
                    <span className="font-mono text-[11px] uppercase tracking-wider">Readiness Score</span>
                    <span className="text-[11px] font-mono text-[#2F5D50]">Goal: 95%</span>
                  </div>
                  <p className="font-serif text-[32px] font-medium text-[#1C1B19]">--%</p>
                  <p className="text-[12px] font-mono text-[#1C1B19]/50 mt-1">Calculated after 1 mock</p>
                </div>

                <div className="bg-white border border-[#1C1B19]/10 rounded-xl p-5 shadow-sm">
                  <div className="flex items-center justify-between text-[#1C1B19]/60 mb-2">
                    <span className="font-mono text-[11px] uppercase tracking-wider">Target Level</span>
                    <FiUser className="w-4 h-4 text-[#2F5D50]" />
                  </div>
                  <p className="font-serif text-[24px] font-medium text-[#1C1B19] truncate">Senior / Staff</p>
                  <p className="text-[12px] font-mono text-[#1C1B19]/50 mt-1">L5/L6 Calibrated</p>
                </div>
              </div>

              {/* Quick Pillars Launcher Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div
                  onClick={() => setActiveTab("resume-builder")}
                  className="bg-white border border-[#1C1B19]/10 rounded-xl p-6 shadow-sm hover:border-[#2F5D50]/50 transition-all cursor-pointer group"
                >
                  <div className="w-9 h-9 rounded-md bg-[#2F5D50]/10 text-[#2F5D50] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <FiFileText className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-[18px] font-medium text-[#1C1B19]">Resume Builder</h3>
                  <p className="text-[13px] text-[#1C1B19]/65 mt-1">
                    Craft an ATS-optimized, high-impact resume with quantified engineering accomplishments.
                  </p>
                  <span className="inline-flex items-center gap-1 font-mono text-[12px] text-[#2F5D50] mt-4 font-medium">
                    Open Builder →
                  </span>
                </div>

                <div
                  onClick={() => setActiveTab("resume-scorer")}
                  className="bg-white border border-[#1C1B19]/10 rounded-xl p-6 shadow-sm hover:border-[#2F5D50]/50 transition-all cursor-pointer group"
                >
                  <div className="w-9 h-9 rounded-md bg-[#2F5D50]/10 text-[#2F5D50] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <FiBarChart2 className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-[18px] font-medium text-[#1C1B19]">Resume Scorer</h3>
                  <p className="text-[13px] text-[#1C1B19]/65 mt-1">
                    Audit your resume against FAANG job descriptions with AI keyword & gap analysis.
                  </p>
                  <span className="inline-flex items-center gap-1 font-mono text-[12px] text-[#2F5D50] mt-4 font-medium">
                    Audit Resume →
                  </span>
                </div>

                <div
                  onClick={() => setActiveTab("roadmap-builder")}
                  className="bg-white border border-[#1C1B19]/10 rounded-xl p-6 shadow-sm hover:border-[#2F5D50]/50 transition-all cursor-pointer group"
                >
                  <div className="w-9 h-9 rounded-md bg-[#2F5D50]/10 text-[#2F5D50] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <FiMap className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-[18px] font-medium text-[#1C1B19]">Roadmap Builder</h3>
                  <p className="text-[13px] text-[#1C1B19]/65 mt-1">
                    Track your 4-week interview preparation milestones from distributed caching to architecture defense.
                  </p>
                  <span className="inline-flex items-center gap-1 font-mono text-[12px] text-[#2F5D50] mt-4 font-medium">
                    View Milestones →
                  </span>
                </div>
              </div>

              {/* Tracks Section */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-[22px] font-medium text-[#1C1B19]">
                    Available AI Interview Tracks
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tracks.map((track) => (
                    <div
                      key={track.id}
                      className="bg-white border border-[#1C1B19]/10 rounded-xl p-6 shadow-sm hover:border-[#2F5D50]/40 transition-all flex flex-col justify-between space-y-4 group"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="p-2.5 rounded-sm bg-[#F7F5F0] border border-[#1C1B19]/10 group-hover:border-[#2F5D50]/30 transition-colors">
                            {track.icon}
                          </div>
                          <span className="font-mono text-[11px] px-2 py-0.5 rounded-sm bg-[#F7F5F0] text-[#1C1B19]/70 border border-[#1C1B19]/10">
                            {track.duration}
                          </span>
                        </div>

                        <div>
                          <h3 className="font-serif text-[18px] font-medium text-[#1C1B19]">
                            {track.title}
                          </h3>
                          <p className="text-[12.5px] font-mono text-[#2F5D50] mt-0.5">
                            {track.agent} • {track.role}
                          </p>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-[#1C1B19]/10 flex items-center justify-between">
                        <span className="font-mono text-[11.5px] text-[#1C1B19]/60">
                          Difficulty: <strong className="text-[#1C1B19]">{track.difficulty}</strong>
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedTrack(track.id);
                            setActiveTab("create-interview");
                          }}
                          className="px-3.5 py-1.5 rounded-sm bg-[#1C1B19] hover:bg-[#2F5D50] text-white text-[12.5px] font-medium transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                        >
                          <span>Configure</span>
                          <FiPlay className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* ================= TAB 2: CREATE AN INTERVIEW ================= */}
          {activeTab === "create-interview" && (
            <div className="space-y-8">
              {/* Header */}
              <div className="bg-white border border-[#1C1B19]/10 rounded-xl p-6 sm:p-8 shadow-sm">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-[#2F5D50]/10 text-[#2F5D50] font-mono text-[11px] font-medium mb-3">
                  <FiMic className="w-3.5 h-3.5" />
                  <span>SIMULATION CONFIGURATOR</span>
                </div>
                <h1 className="font-serif text-[28px] sm:text-[34px] font-medium tracking-tight text-[#1C1B19]">
                  Create an Interview Simulation
                </h1>
                <p className="mt-1.5 text-[14.5px] text-[#1C1B19]/65 max-w-2xl">
                  Configure your interview target role, persona difficulty, audio modes, and company presets.
                </p>
              </div>

              {/* Config Form Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Form Controls */}
                <div className="lg:col-span-8 bg-white border border-[#1C1B19]/10 rounded-xl p-6 sm:p-8 shadow-sm space-y-6">
                  {/* Step 1: Select Track */}
                  <div>
                    <label className="block font-mono text-[11.5px] uppercase tracking-wider text-[#1C1B19]/70 mb-3 font-semibold">
                      1. Select Interview Track
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {tracks.map((t) => (
                        <div
                          key={t.id}
                          onClick={() => setSelectedTrack(t.id)}
                          className={`p-4 rounded-lg border text-left cursor-pointer transition-all flex items-start gap-3 ${
                            selectedTrack === t.id
                              ? "border-[#2F5D50] bg-[#2F5D50]/5 ring-1 ring-[#2F5D50]"
                              : "border-[#1C1B19]/15 hover:border-[#1C1B19]/30 bg-[#FAF9F5]/40"
                          }`}
                        >
                          <div className="p-2 rounded bg-white shadow-2xs mt-0.5">{t.icon}</div>
                          <div>
                            <p className="text-[14px] font-medium text-[#1C1B19]">{t.title}</p>
                            <p className="text-[11.5px] font-mono text-[#2F5D50] mt-0.5">{t.agent}</p>
                            <p className="text-[11px] text-[#1C1B19]/50 mt-1 font-mono">{t.coins}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Step 2: Target Company & Level */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#1C1B19]/10">
                    <div>
                      <label className="block font-mono text-[11.5px] uppercase tracking-wider text-[#1C1B19]/70 mb-2 font-semibold">
                        2. Target Company Calibration
                      </label>
                      <select
                        value={companyPreset}
                        onChange={(e) => setCompanyPreset(e.target.value)}
                        className="w-full px-3 py-2 rounded-sm border border-[#1C1B19]/20 text-[13.5px] bg-[#FAF9F5]/50 focus:outline-none focus:border-[#2F5D50]"
                      >
                        <option>Tier-1 Big Tech (Meta / Google / Stripe)</option>
                        <option>High-Growth Fintech / Unicorn</option>
                        <option>Early-Stage Fast-Paced Startup</option>
                        <option>Enterprise Cloud & Infrastructure</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-mono text-[11.5px] uppercase tracking-wider text-[#1C1B19]/70 mb-2 font-semibold">
                        3. Seniority Calibration
                      </label>
                      <select
                        value={selectedDifficulty}
                        onChange={(e) => setSelectedDifficulty(e.target.value)}
                        className="w-full px-3 py-2 rounded-sm border border-[#1C1B19]/20 text-[13.5px] bg-[#FAF9F5]/50 focus:outline-none focus:border-[#2F5D50]"
                      >
                        <option>Senior Engineer (L5)</option>
                        <option>Staff / Tech Lead (L6)</option>
                        <option>Principal Architect (L7)</option>
                        <option>Mid-Level Engineer (L4)</option>
                      </select>
                    </div>
                  </div>

                  {/* Step 3: Duration & Voice Toggle */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#1C1B19]/10">
                    <div>
                      <label className="block font-mono text-[11.5px] uppercase tracking-wider text-[#1C1B19]/70 mb-2 font-semibold">
                        4. Simulation Duration
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {["30 mins", "45 mins", "60 mins"].map((d) => (
                          <button
                            key={d}
                            type="button"
                            onClick={() => setSelectedDuration(d)}
                            className={`py-2 px-2 text-[12.5px] font-mono rounded-sm border transition-all cursor-pointer text-center ${
                              selectedDuration === d
                                ? "border-[#2F5D50] bg-[#2F5D50] text-white font-medium shadow-sm"
                                : "border-[#1C1B19]/20 hover:border-[#1C1B19]/40 bg-white"
                            }`}
                          >
                            {d}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-[11.5px] uppercase tracking-wider text-[#1C1B19]/70 mb-2 font-semibold">
                        5. Real-Time Audio
                      </label>
                      <div
                        onClick={() => setVoiceEnabled(!voiceEnabled)}
                        className="p-2.5 rounded-sm border border-[#1C1B19]/20 bg-[#FAF9F5]/50 flex items-center justify-between cursor-pointer hover:border-[#2F5D50]"
                      >
                        <div className="flex items-center gap-2">
                          <FiMic className={`w-4 h-4 ${voiceEnabled ? "text-[#2F5D50]" : "text-[#1C1B19]/40"}`} />
                          <span className="text-[13px] font-medium">Sub-250ms Voice AI</span>
                        </div>
                        <span
                          className={`font-mono text-[11px] px-2 py-0.5 rounded-xs ${
                            voiceEnabled ? "bg-[#2F5D50] text-white" : "bg-slate-200 text-slate-700"
                          }`}
                        >
                          {voiceEnabled ? "ON" : "OFF"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Launch Summary */}
                <div className="lg:col-span-4 space-y-5">
                  <div className="bg-[#1C1B19] text-[#F7F5F0] rounded-xl p-6 shadow-xl space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <span className="font-mono text-[11px] text-[#2F5D50] uppercase font-semibold">
                        Configuration Summary
                      </span>
                      <span className="font-mono text-[11px] text-slate-400">{selectedDuration}</span>
                    </div>

                    <div className="space-y-2 text-[13.5px]">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Track:</span>
                        <span className="font-medium text-right capitalize">{selectedTrack}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Target Level:</span>
                        <span className="font-medium text-right">{selectedDifficulty.split(" ")[0]}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Voice Mode:</span>
                        <span className="font-medium text-right">{voiceEnabled ? "Low-latency Voice" : "Text/Code"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Session Cost:</span>
                        <span className="font-medium text-emerald-400 font-mono">40 Coins</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() =>
                          alert(
                            `Starting AI interview simulation session for ${selectedTrack} (${selectedDuration}). Microphone connected.`
                          )
                        }
                        className="w-full py-3 rounded-sm bg-[#2F5D50] hover:bg-[#254a40] text-white font-medium text-[14px] transition-colors flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                      >
                        <FiPlay className="w-4 h-4" />
                        <span>Launch Simulation</span>
                      </button>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-[#1C1B19]/10 text-[13px] text-[#1C1B19]/70 space-y-2">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-[#1C1B19]/50 font-semibold">
                      What happens after clicking:
                    </p>
                    <p>• Your AI interviewer joins the interactive room.</p>
                    <p>• Speech-to-speech audio connects in browser.</p>
                    <p>• Real-time system design whiteboard or code editor loads.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 3: RESUME BUILDER ================= */}
          {activeTab === "resume-builder" && (
            <div className="space-y-8">
              <div className="bg-white border border-[#1C1B19]/10 rounded-xl p-6 sm:p-8 shadow-sm">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-[#2F5D50]/10 text-[#2F5D50] font-mono text-[11px] font-medium mb-3">
                  <FiFileText className="w-3.5 h-3.5" />
                  <span>ATS-OPTIMIZED RESUME WORKSPACE</span>
                </div>
                <h1 className="font-serif text-[28px] sm:text-[34px] font-medium tracking-tight text-[#1C1B19]">
                  AI Engineering Resume Builder
                </h1>
                <p className="mt-1.5 text-[14.5px] text-[#1C1B19]/65 max-w-2xl">
                  Draft an engineering resume tailored for Staff & Senior roles with quantified metrics and keyword density.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left: Editor */}
                <div className="lg:col-span-7 bg-white border border-[#1C1B19]/10 rounded-xl p-6 sm:p-8 shadow-sm space-y-5">
                  <div>
                    <label className="block font-mono text-[11.5px] uppercase tracking-wider text-[#1C1B19]/70 mb-1.5 font-semibold">
                      Target Role Title
                    </label>
                    <input
                      type="text"
                      value={resumeRole}
                      onChange={(e) => setResumeRole(e.target.value)}
                      className="w-full px-3 py-2 rounded-sm border border-[#1C1B19]/20 text-[14px] bg-[#FAF9F5]/50 focus:outline-none focus:border-[#2F5D50]"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="font-mono text-[11.5px] uppercase tracking-wider text-[#1C1B19]/70 font-semibold">
                        Executive Engineering Summary
                      </label>
                      <button
                        type="button"
                        onClick={() =>
                          setResumeSummary(
                            "Staff Infrastructure Engineer with 8+ years specializing in distributed systems, high-throughput message brokers (Kafka/RabbitMQ), and multi-region failover architecture with proven 99.999% uptime."
                          )
                        }
                        className="font-mono text-[11px] text-[#2F5D50] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <FiZap className="w-3 h-3" />
                        <span>AI Polish</span>
                      </button>
                    </div>
                    <textarea
                      rows={3}
                      value={resumeSummary}
                      onChange={(e) => setResumeSummary(e.target.value)}
                      className="w-full px-3 py-2 rounded-sm border border-[#1C1B19]/20 text-[13.5px] bg-[#FAF9F5]/50 focus:outline-none focus:border-[#2F5D50]"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[11.5px] uppercase tracking-wider text-[#1C1B19]/70 mb-2 font-semibold">
                      Quantified Engineering Impact Bullets
                    </label>
                    <div className="space-y-2">
                      {resumeBullets.map((bullet, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded-sm bg-[#F7F5F0] border border-[#1C1B19]/10 text-[13px] flex items-start justify-between gap-2"
                        >
                          <div className="flex items-start gap-2">
                            <span className="text-[#2F5D50] font-mono font-bold mt-0.5">•</span>
                            <span>{bullet}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setResumeBullets(resumeBullets.filter((_, i) => i !== idx))}
                            className="text-[#1C1B19]/40 hover:text-red-700 font-mono text-xs cursor-pointer"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>

                    <form onSubmit={handleAddBullet} className="mt-3 flex gap-2">
                      <input
                        type="text"
                        value={newBullet}
                        onChange={(e) => setNewBullet(e.target.value)}
                        placeholder="e.g. Optimized PostgreSQL queries, cutting p95 response time by 45%..."
                        className="flex-1 px-3 py-2 rounded-sm border border-[#1C1B19]/20 text-[13px] bg-[#FAF9F5]/50 focus:outline-none focus:border-[#2F5D50]"
                      />
                      <button
                        type="submit"
                        className="px-3.5 py-2 rounded-sm bg-[#1C1B19] text-white text-[13px] hover:bg-[#2F5D50] transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                      >
                        <FiPlus className="w-4 h-4" />
                        <span>Add</span>
                      </button>
                    </form>
                  </div>
                </div>

                {/* Right: Live Preview */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="bg-white border border-[#1C1B19]/20 rounded-xl p-6 shadow-md font-serif text-[#1C1B19] space-y-4">
                    <div className="border-b border-[#1C1B19]/15 pb-4">
                      <h2 className="text-[20px] font-bold tracking-tight">
                        {user?.name || "Candidate Name"}
                      </h2>
                      <p className="font-mono text-[11px] text-[#2F5D50] mt-0.5">{resumeRole}</p>
                      <p className="font-mono text-[10.5px] text-[#1C1B19]/50 mt-1">
                        {user?.email || "candidate@intervia.ai"} • San Francisco, CA • LinkedIn / GitHub
                      </p>
                    </div>

                    <div>
                      <h4 className="font-mono text-[11px] uppercase tracking-wider text-[#1C1B19]/50 font-bold mb-1">
                        Summary
                      </h4>
                      <p className="text-[12.5px] leading-relaxed text-[#1C1B19]/80 font-sans">
                        {resumeSummary}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-mono text-[11px] uppercase tracking-wider text-[#1C1B19]/50 font-bold mb-2">
                        Key Accomplishments
                      </h4>
                      <ul className="space-y-2 text-[12px] font-sans text-[#1C1B19]/85">
                        {resumeBullets.map((b, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-[#2F5D50] font-mono">•</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-[#1C1B19]/15 flex items-center justify-between font-sans">
                      <span className="font-mono text-[11px] text-[#2F5D50]">ATS Ready • 1 Page</span>
                      <button
                        type="button"
                        onClick={() => alert("Downloading formatted ATS PDF...")}
                        className="px-3 py-1.5 rounded-sm bg-[#2F5D50] text-white text-[12px] font-medium flex items-center gap-1.5 cursor-pointer shadow-sm"
                      >
                        <FiDownload className="w-3.5 h-3.5" />
                        <span>Export PDF</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 4: RESUME SCORER ================= */}
          {activeTab === "resume-scorer" && (
            <div className="space-y-8">
              <div className="bg-white border border-[#1C1B19]/10 rounded-xl p-6 sm:p-8 shadow-sm">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-[#2F5D50]/10 text-[#2F5D50] font-mono text-[11px] font-medium mb-3">
                  <FiBarChart2 className="w-3.5 h-3.5" />
                  <span>AI RESUME AUDIT & GAP DETECTION</span>
                </div>
                <h1 className="font-serif text-[28px] sm:text-[34px] font-medium tracking-tight text-[#1C1B19]">
                  Resume Scorer & Gap Detector
                </h1>
                <p className="mt-1.5 text-[14.5px] text-[#1C1B19]/65 max-w-2xl">
                  Benchmark your resume against specific job requirements, measure ATS keyword match rates, and uncover missing architectural competencies.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Inputs */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="bg-white border border-[#1C1B19]/10 rounded-xl p-6 shadow-sm space-y-4">
                    <label className="block font-mono text-[11.5px] uppercase tracking-wider text-[#1C1B19]/70 font-semibold">
                      Paste or Upload Resume Text
                    </label>
                    <textarea
                      rows={5}
                      value={resumeText}
                      onChange={(e) => setResumeText(e.target.value)}
                      placeholder="Paste your existing resume text or paste bullet points here..."
                      className="w-full p-3 rounded-sm border border-[#1C1B19]/20 text-[13.5px] bg-[#FAF9F5]/50 focus:outline-none focus:border-[#2F5D50]"
                    />

                    <label className="block font-mono text-[11.5px] uppercase tracking-wider text-[#1C1B19]/70 font-semibold pt-2">
                      Target Job Description (Optional)
                    </label>
                    <textarea
                      rows={4}
                      value={jobSpecText}
                      onChange={(e) => setJobSpecText(e.target.value)}
                      placeholder="e.g. Staff Software Engineer - Distributed Systems at Stripe: Must have experience with Kafka, Redis, fault tolerance, and multi-region data stores..."
                      className="w-full p-3 rounded-sm border border-[#1C1B19]/20 text-[13.5px] bg-[#FAF9F5]/50 focus:outline-none focus:border-[#2F5D50]"
                    />

                    <button
                      type="button"
                      disabled={isScoring}
                      onClick={handleScoreResume}
                      className="w-full py-2.5 rounded-sm bg-[#1C1B19] hover:bg-[#2F5D50] text-white font-medium text-[13.5px] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
                    >
                      {isScoring ? (
                        <span className="font-mono text-[12px]">Auditing with AI reasoning models...</span>
                      ) : (
                        <>
                          <FiZap className="w-4 h-4" />
                          <span>Audit & Score Resume</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Scorecard Results */}
                <div className="lg:col-span-5 space-y-4">
                  {scoreResult ? (
                    <div className="bg-white border border-[#2F5D50]/30 rounded-xl p-6 shadow-md space-y-5">
                      <div className="flex items-center justify-between border-b border-[#1C1B19]/10 pb-4">
                        <div>
                          <span className="font-mono text-[11px] text-[#2F5D50] uppercase font-semibold">
                            ATS Scorecard
                          </span>
                          <h3 className="font-serif text-[22px] font-medium text-[#1C1B19]">
                            Overall Match
                          </h3>
                        </div>
                        <div className="w-14 h-14 rounded-full bg-[#2F5D50]/15 text-[#2F5D50] flex items-center justify-center font-serif text-[22px] font-bold">
                          {scoreResult.overall}
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center py-1 font-mono text-[11.5px]">
                        <div className="p-2 rounded bg-[#F7F5F0]">
                          <span className="text-[#1C1B19]/50 block">Keywords</span>
                          <strong className="text-[#1C1B19] text-[13px]">{scoreResult.atsMatch}</strong>
                        </div>
                        <div className="p-2 rounded bg-[#F7F5F0]">
                          <span className="text-[#1C1B19]/50 block">Impact</span>
                          <strong className="text-[#1C1B19] text-[13px]">{scoreResult.quantImpact}</strong>
                        </div>
                        <div className="p-2 rounded bg-[#F7F5F0]">
                          <span className="text-[#1C1B19]/50 block">Alignment</span>
                          <strong className="text-[#1C1B19] text-[13px]">{scoreResult.techAlignment}</strong>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="font-mono text-[11px] uppercase tracking-wider text-emerald-800 font-semibold">
                          Strengths Detected:
                        </p>
                        {scoreResult.strengths.map((s, i) => (
                          <div key={i} className="flex items-start gap-2 text-[12.5px] text-[#1C1B19]/80">
                            <FiCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{s}</span>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-2 pt-2 border-t border-[#1C1B19]/10">
                        <p className="font-mono text-[11px] uppercase tracking-wider text-amber-800 font-semibold">
                          Recommended Additions:
                        </p>
                        {scoreResult.gaps.map((g, i) => (
                          <div key={i} className="flex items-start gap-2 text-[12.5px] text-[#1C1B19]/80">
                            <span className="text-amber-600 font-bold shrink-0 mt-0.5">•</span>
                            <span>{g}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white border border-[#1C1B19]/10 rounded-xl p-8 text-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-[#F7F5F0] text-[#2F5D50] flex items-center justify-center mx-auto">
                        <FiUploadCloud className="w-6 h-6" />
                      </div>
                      <h4 className="font-serif text-[17px] font-medium text-[#1C1B19]">
                        Ready to Audit
                      </h4>
                      <p className="text-[13px] text-[#1C1B19]/60">
                        Click "Audit & Score Resume" to receive quantified impact grading, keyword analysis, and role calibration.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 5: ROADMAP BUILDER ================= */}
          {activeTab === "roadmap-builder" && (
            <div className="space-y-8">
              <div className="bg-white border border-[#1C1B19]/10 rounded-xl p-6 sm:p-8 shadow-sm">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-[#2F5D50]/10 text-[#2F5D50] font-mono text-[11px] font-medium mb-3">
                  <FiMap className="w-3.5 h-3.5" />
                  <span>PREPARATION ROADMAP</span>
                </div>
                <h1 className="font-serif text-[28px] sm:text-[34px] font-medium tracking-tight text-[#1C1B19]">
                  Candidate Engineering Roadmap
                </h1>
                <p className="mt-1.5 text-[14.5px] text-[#1C1B19]/65 max-w-2xl">
                  Step-by-step preparation timeline tailored for Staff Backend & Distributed Systems roles.
                </p>
              </div>

              {/* Roadmap Milestones */}
              <div className="space-y-4">
                {roadmapMilestones.map((m, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-[#1C1B19]/10 rounded-xl p-6 shadow-sm space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[12px] font-bold text-[#2F5D50] bg-[#2F5D50]/10 px-2.5 py-1 rounded-sm border border-[#2F5D50]/20">
                          {m.week}
                        </span>
                        <h3 className="font-serif text-[18px] font-medium text-[#1C1B19]">
                          {m.topic}
                        </h3>
                      </div>

                      <span
                        className={`font-mono text-[11px] px-2.5 py-0.5 rounded-sm uppercase tracking-wider font-medium ${
                          m.status === "completed"
                            ? "bg-emerald-100 text-emerald-800"
                            : m.status === "in-progress"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {m.status.replace("-", " ")}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                      {m.items.map((item, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-md bg-[#FAF9F5] border border-[#1C1B19]/10 text-[13px] flex items-start gap-2 text-[#1C1B19]/80"
                        >
                          <FiCheckCircle
                            className={`w-4 h-4 shrink-0 mt-0.5 ${
                              m.status === "completed"
                                ? "text-emerald-600"
                                : m.status === "in-progress" && i === 0
                                ? "text-amber-600"
                                : "text-slate-300"
                            }`}
                          />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;