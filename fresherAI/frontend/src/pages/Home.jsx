import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiCheck,
  FiCpu,
  FiFileText,
  FiBarChart2,
  FiMap,
  FiChevronDown,
  FiShield,
  FiMic,
  FiCode,
  FiLayers,
  FiZap,
  FiStar,
} from "react-icons/fi";

const Home = () => {
  // State for interactive track selector demo
  const [activeTrack, setActiveTrack] = useState(0);
  // State for FAQ accordion
  const [openFaq, setOpenFaq] = useState(null);

  const tracks = [
    {
      id: "backend",
      label: "Backend & Distributed Systems",
      icon: <FiCpu className="w-4 h-4" />,
      agentName: "Agent Marcus • Staff Distributed Systems",
      question:
        "“Let's say your Redis cache goes down under a 100k QPS burst. Walk me through your fallback strategy to protect PostgreSQL from cascading collapse.”",
      probes: [
        "Cache stampede prevention",
        "Probabilistic early expiration",
        "Circuit breaker patterns",
      ],
      scorePreview: { clarity: "96%", depth: "Staff-Level", rating: "Pass" },
    },
    {
      id: "ai",
      label: "AI & ML Infrastructure",
      icon: <FiZap className="w-4 h-4" />,
      agentName: "Agent Sophia • Principal AI Researcher",
      question:
        "“How would you minimize time-to-first-token in a multi-tenant vLLM cluster serving a 70B parameter model across 8x H100 GPUs?”",
      probes: [
        "PagedAttention & KV-cache optimization",
        "Continuous batching trade-offs",
        "Tensor vs Pipeline parallelism",
      ],
      scorePreview: { clarity: "94%", depth: "Expert", rating: "Strong Pass" },
    },
    {
      id: "frontend",
      label: "Frontend & Web Performance",
      icon: <FiCode className="w-4 h-4" />,
      agentName: "Agent Elena • Senior Frontend Architect",
      question:
        "“Explain how React 19's Server Components and Actions change how you handle optimistic state updates and hydration errors on heavy e-commerce pages.”",
      probes: [
        "Concurrent mode execution",
        "Sub-tree selective hydration",
        "Bundle chunk streaming",
      ],
      scorePreview: { clarity: "98%", depth: "Senior", rating: "Pass" },
    },
    {
      id: "system-design",
      label: "System Design & Architecture",
      icon: <FiLayers className="w-4 h-4" />,
      agentName: "Agent David • VP of Architecture",
      question:
        "“Design a global idempotency layer for a financial transaction system handling cross-border payments with strict SLA < 50ms.”",
      probes: [
        "Distributed lock leasing",
        "Two-phase commit vs Saga",
        "Outbox event dispatching",
      ],
      scorePreview: { clarity: "91%", depth: "Distinguished", rating: "Pass" },
    },
  ];

  const agents = [
    {
      index: "01",
      icon: <FiFileText className="w-5 h-5 text-[#2F5D50]" />,
      title: "Resume Ingestion Agent",
      subtitle: "Grounded in your real background",
      description:
        "Extracts projects, verified skills, and past architecture work from your resume to calibrate realistic, tailor-fit interview difficulty.",
      tag: "Context Grounding",
    },
    {
      index: "02",
      icon: <FiMic className="w-5 h-5 text-[#2F5D50]" />,
      title: "Adaptive Voice & Code Agent",
      subtitle: "Dynamic conversation, not static scripts",
      description:
        "Listens to your spoken thoughts, detects hand-waving or gaps, and asks conversational follow-up questions just like a FAANG tech lead.",
      tag: "Sub-250ms Voice Latency",
    },
    {
      index: "03",
      icon: <FiBarChart2 className="w-5 h-5 text-[#2F5D50]" />,
      title: "Granular Scoring Agent",
      subtitle: "Actionable rubric evaluations",
      description:
        "Scores your technical depth, system trade-offs, algorithmic accuracy, and communication clarity with detailed timestamps.",
      tag: "Multi-Factor Rubric",
    },
    {
      index: "04",
      icon: <FiMap className="w-5 h-5 text-[#2F5D50]" />,
      title: "Curated Study Roadmap Agent",
      subtitle: "Zero guesswork on what to study next",
      description:
        "Transforms identified weak spots into a prioritized study plan with linked system design patterns, papers, and leetcode practice.",
      tag: "Automated Curriculum",
    },
  ];

  const comparisons = [
    {
      feature: "Follow-up question adaptability",
      generic: "None (Static question lists)",
      human: "High, but inconsistent quality",
      intervia: "Dynamic real-time agentic follow-ups",
    },
    {
      feature: "Cost & Scheduling friction",
      generic: "$0 (Manual self-study)",
      human: "$200 - $350 / hour + days of scheduling",
      intervia: "Instant 24/7 on-demand access",
    },
    {
      feature: "Objective evaluation rubric",
      generic: "None (Self-graded)",
      human: "Subjective, depends heavily on the person",
      intervia: "Standardized multi-agent scoring",
    },
    {
      feature: "Resume & background integration",
      generic: "Not supported",
      human: "Hit or miss depending on prep time",
      intervia: "Deep resume semantic extraction",
    },
  ];

  const faqs = [
    {
      q: "How does the AI adapt follow-up questions in real time?",
      a: "Our multi-agent orchestration evaluates your verbal and coding responses incrementally. When you mention a technology (such as Redis or Kafka), the agent dynamically probes your reasoning on edge cases, failure states, and concurrency bottlenecks instead of reading from a fixed script.",
    },
    {
      q: "Can I practice for specific seniority levels?",
      a: "Yes. You can configure target roles from Intern and Junior Engineer up to Senior, Staff, and Engineering Director. The agent adjusts the interview rubric to focus either on fundamentals, high-scale system trade-offs, or behavioral leadership.",
    },
    {
      q: "How is my resume processed and kept secure?",
      a: "Your resume is parsed locally in an isolated session solely to construct your candidate profile for the interview context. We never sell your data, use your resume for public model training, or share session recordings with employers without explicit consent.",
    },
    {
      q: "What technical tracks are currently supported?",
      a: "We currently support Backend & Distributed Systems, Frontend & Web Architecture, AI/ML Engineering, DevOps & Cloud Infrastructure, and Core Algorithms & Data Structures.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#1C1B19] font-sans selection:bg-[#2F5D50] selection:text-white">
      {/* ================= TOP ANNOUNCEMENT BANNER ================= */}
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

      {/* ================= NAVBAR ================= */}
      <nav className="sticky top-0 left-0 right-0 z-50 border-b border-[#1C1B19]/10 bg-[#F7F5F0]/90 backdrop-blur-md transition-all">
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

          {/* Links */}
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

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link
              to="/dashboard"
              className="hidden sm:block px-4 py-2 text-[14px] text-[#1C1B19]/70 hover:text-[#1C1B19] transition-colors font-medium"
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
        </div>
      </nav>

      {/* ================= HERO SECTION ================= */}
      <section className="px-6 pt-20 pb-20 md:pt-28 md:pb-28 border-b border-[#1C1B19]/10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Tag / Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#2F5D50]/10 border border-[#2F5D50]/20 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2F5D50]" />
              <span className="font-mono text-[12px] text-[#2F5D50] font-medium">
                Multi-Agent Technical Interview Simulator
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-[42px] sm:text-[54px] md:text-[62px] leading-[1.05] font-medium tracking-tight text-[#1C1B19]">
              Practice the interview <br className="hidden sm:block" />
              <span className="italic text-[#2F5D50]">before</span> it happens.
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-[#1C1B19]/75">
              Intervia AI runs rigorous conversational technical interviews, reads
              your resume, challenges hand-wavy explanations, and gives you an
              honest score — before the real recruiter call.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/dashboard"
                className="px-7 py-3.5 rounded-sm bg-[#1C1B19] hover:bg-[#2F5D50] text-white text-[15px] font-medium transition-all shadow-md hover:shadow-lg flex items-center gap-2"
              >
                <span>Start Free Session</span>
                <FiArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#tracks"
                className="px-5 py-3.5 rounded-sm border border-[#1C1B19]/15 text-[15px] text-[#1C1B19]/80 hover:text-[#1C1B19] hover:border-[#1C1B19]/40 transition-colors font-medium bg-white/50"
              >
                Explore Track Matrix
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 pt-8 border-t border-[#1C1B19]/10 grid grid-cols-3 gap-6">
              <div>
                <p className="font-mono text-[22px] font-semibold text-[#1C1B19]">
                  14,800+
                </p>
                <p className="text-[12px] text-[#1C1B19]/60 font-mono mt-0.5">
                  Mocks Completed
                </p>
              </div>
              <div>
                <p className="font-mono text-[22px] font-semibold text-[#2F5D50]">
                  &lt; 250ms
                </p>
                <p className="text-[12px] text-[#1C1B19]/60 font-mono mt-0.5">
                  Voice Latency
                </p>
              </div>
              <div>
                <p className="font-mono text-[22px] font-semibold text-[#1C1B19]">
                  4.9 / 5.0
                </p>
                <p className="text-[12px] text-[#1C1B19]/60 font-mono mt-0.5">
                  Candidate Rating
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Visual with intervia1.jpg */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="relative"
          >
            {/* Background ambient glow */}
            <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#2F5D50]/15 to-[#B8763A]/10 rounded-xl blur-xl -z-10" />

            <div className="relative border border-[#1C1B19]/15 bg-white rounded-lg overflow-hidden shadow-2xl">
              {/* Card Terminal Header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-[#1C1B19]/10 bg-[#FAF9F5]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1C1B19]/20" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1C1B19]/20" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1C1B19]/20" />
                  <span className="font-mono text-[11px] text-[#1C1B19]/60 ml-2">
                    session_live • distributed_track.ai
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#2F5D50] animate-pulse" />
                  <span className="font-mono text-[11px] text-[#2F5D50] font-medium">
                    AI AGENT ACTIVE
                  </span>
                </div>
              </div>

              {/* Picture from public folder */}
              <div className="relative overflow-hidden bg-slate-900 group">
                <img
                  src="/ss1.png"
                  alt="Intervia AI Multi-Agent Interview in Progress"
                  className="w-full h-[360px] sm:h-[420px] object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                />

                {/* Floating HUD Chip on Image */}
                <div className="absolute top-4 left-4 bg-[#1C1B19]/80 backdrop-blur-md px-3.5 py-1.5 rounded-sm border border-white/15 flex items-center gap-2 text-white">
                  <FiMic className="w-3.5 h-3.5 text-[#2F5D50]" />
                  <span className="font-mono text-[11px] tracking-wide">
                    Live Audio Stream: Connected
                  </span>
                </div>
              </div>

              {/* Live Real-time Evaluation Card */}
              <div className="p-4 bg-white border-t border-[#1C1B19]/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-[#1C1B19]/50 uppercase tracking-wider">
                    Real-time Evaluation Metrics
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded-sm bg-[#2F5D50]/10 text-[#2F5D50] font-medium">
                      Technical Depth: 95%
                    </span>
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded-sm bg-[#B8763A]/10 text-[#B8763A] font-medium">
                      Trade-offs: Detailed
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-[#F7F5F0] rounded border border-[#1C1B19]/10 text-[13px] leading-relaxed text-[#1C1B19]/85">
                  <p className="font-mono text-[10.5px] text-[#2F5D50] mb-1 font-semibold uppercase">
                    Agent Observation:
                  </p>
                  "Candidate cleanly isolated the distributed consensus state
                  from ephemeral workers using Redis token buckets with TTL
                  leasing."
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= SOCIAL PROOF STRIP ================= */}
      <div className="py-8 px-6 bg-white/60 border-b border-[#1C1B19]/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <p className="font-mono text-[12px] text-[#1C1B19]/50 uppercase tracking-widest">
            Trained on interview rubrics from Tier-1 Engineering teams:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 font-mono text-[13px] text-[#1C1B19]/70 font-semibold">
            <span className="hover:text-[#1C1B19] transition-colors">GOOGLE</span>
            <span className="text-[#1C1B19]/20">•</span>
            <span className="hover:text-[#1C1B19] transition-colors">META</span>
            <span className="text-[#1C1B19]/20">•</span>
            <span className="hover:text-[#1C1B19] transition-colors">STRIPE</span>
            <span className="text-[#1C1B19]/20">•</span>
            <span className="hover:text-[#1C1B19] transition-colors">OPENAI</span>
            <span className="text-[#1C1B19]/20">•</span>
            <span className="hover:text-[#1C1B19] transition-colors">AMAZON</span>
          </div>
        </div>
      </div>

      {/* ================= 4 AGENT ARCHITECTURE PIPELINE ================= */}
      <section id="agents" className="px-6 py-24 max-w-6xl mx-auto">
        <div className="max-w-xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#2F5D50]/10 border border-[#2F5D50]/20 mb-4 font-mono text-[12px] text-[#2F5D50]">
            Four Autonomous Agents • One Pipeline
          </div>
          <h2 className="font-serif text-[34px] md:text-[42px] font-medium tracking-tight text-[#1C1B19]">
            Engineered like a real panel.
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-[#1C1B19]/70">
            Each agent handles a specialized phase of the hiring loop, passing
            context forward so your resume, live answers, and gap analysis align
            accurately.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {agents.map((agent) => (
            <div
              key={agent.title}
              className="bg-white border border-[#1C1B19]/12 rounded-lg p-8 shadow-sm hover:shadow-md hover:border-[#2F5D50]/40 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-sm bg-[#F7F5F0] border border-[#1C1B19]/10 flex items-center justify-center group-hover:bg-[#2F5D50]/10 transition-colors">
                    {agent.icon}
                  </div>
                  <span className="font-mono text-[13px] text-[#1C1B19]/40 font-semibold">
                    AGENT {agent.index}
                  </span>
                </div>
                <span className="font-mono text-[11px] text-[#2F5D50] bg-[#2F5D50]/10 px-2 py-0.5 rounded-sm font-medium">
                  {agent.tag}
                </span>
                <h3 className="text-[20px] font-semibold text-[#1C1B19] mt-3">
                  {agent.title}
                </h3>
                <p className="font-mono text-[12px] text-[#1C1B19]/50 mb-3">
                  {agent.subtitle}
                </p>
                <p className="text-[14.5px] leading-relaxed text-[#1C1B19]/75">
                  {agent.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#1C1B19]/10 flex items-center justify-between text-[13px]">
                <span className="font-mono text-[12px] text-[#1C1B19]/60">
                  Status: Autonomous
                </span>
                <span className="font-mono text-[12px] text-[#2F5D50] flex items-center gap-1">
                  <FiCheck className="w-3.5 h-3.5" /> Ready
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= INTERACTIVE TRACK MATRIX ================= */}
      <section id="tracks" className="px-6 py-24 bg-white border-y border-[#1C1B19]/10">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-xl mb-12">
            <h2 className="font-serif text-[32px] md:text-[40px] font-medium tracking-tight text-[#1C1B19]">
              Test an agent preview
            </h2>
            <p className="mt-3 text-[16px] text-[#1C1B19]/65">
              Select a specialization track to inspect the live questions and
              evaluation depth of our specialized agents.
            </p>
          </div>

          {/* Track Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {tracks.map((track, idx) => (
              <button
                key={track.id}
                onClick={() => setActiveTrack(idx)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-sm text-[13.5px] font-mono font-medium transition-all ${
                  activeTrack === idx
                    ? "bg-[#1C1B19] text-white shadow-sm"
                    : "bg-[#F7F5F0] text-[#1C1B19]/70 hover:text-[#1C1B19] hover:bg-[#1C1B19]/5 border border-[#1C1B19]/10"
                }`}
              >
                {track.icon}
                <span>{track.label}</span>
              </button>
            ))}
          </div>

          {/* Active Track Interactive Panel */}
          <div className="border border-[#1C1B19]/15 rounded-lg bg-[#FAF9F5] p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1C1B19]/10 pb-4 mb-6">
              <div>
                <span className="font-mono text-[12px] text-[#2F5D50] font-semibold uppercase tracking-wider">
                  Persona assigned
                </span>
                <h4 className="text-[17px] font-semibold text-[#1C1B19]">
                  {tracks[activeTrack].agentName}
                </h4>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[12px] px-2.5 py-1 rounded bg-white border border-[#1C1B19]/10 text-[#1C1B19]">
                  Clarity: {tracks[activeTrack].scorePreview.clarity}
                </span>
                <span className="font-mono text-[12px] px-2.5 py-1 rounded bg-[#2F5D50]/10 text-[#2F5D50] font-medium">
                  Result: {tracks[activeTrack].scorePreview.rating}
                </span>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <p className="font-mono text-[11px] text-[#1C1B19]/50 mb-2 uppercase tracking-wide">
                  Real Question Probe:
                </p>
                <p className="font-serif text-[20px] md:text-[23px] leading-relaxed text-[#1C1B19] italic">
                  {tracks[activeTrack].question}
                </p>
              </div>

              <div>
                <p className="font-mono text-[11px] text-[#1C1B19]/50 mb-3 uppercase tracking-wide">
                  Agent Follow-Up Checklist:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {tracks[activeTrack].probes.map((probe) => (
                    <div
                      key={probe}
                      className="bg-white border border-[#1C1B19]/10 p-3 rounded text-[13px] text-[#1C1B19]/80 flex items-center gap-2"
                    >
                      <FiCheck className="text-[#2F5D50] shrink-0" />
                      <span>{probe}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <span className="font-mono text-[12px] text-[#1C1B19]/60">
                  Ready to test this track?
                </span>
                <Link
                  to="/dashboard"
                  className="px-5 py-2.5 rounded-sm bg-[#2F5D50] hover:bg-[#1C1B19] text-white text-[13px] font-medium font-mono transition-colors flex items-center gap-1.5"
                >
                  <span>Launch this simulation</span>
                  <FiArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS (3 STEPS) ================= */}
      <section id="how-it-works" className="px-6 py-24 max-w-6xl mx-auto">
        <div className="max-w-xl mb-16">
          <h2 className="font-serif text-[32px] md:text-[40px] font-medium tracking-tight text-[#1C1B19]">
            Three steps, zero guesswork
          </h2>
          <p className="mt-3 text-[16px] text-[#1C1B19]/65">
            How candidate preparation shifts from memorizing answers to building
            instinctive interview reflexes.
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          <div className="hidden md:block absolute top-[14px] left-[8%] right-[8%] h-px bg-[#1C1B19]/15" />

          <div className="relative bg-white border border-[#1C1B19]/10 p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-[14px] font-semibold text-white bg-[#2F5D50] px-2.5 py-0.5 rounded-sm">
                01
              </span>
            </div>
            <h3 className="text-[18px] font-semibold text-[#1C1B19] mb-2">
              Upload Resume & Set Target
            </h3>
            <p className="text-[14.5px] leading-relaxed text-[#1C1B19]/70">
              The Resume Agent indexes your past stack, projects, and tenure to
              ground the upcoming questions in your actual background.
            </p>
          </div>

          <div className="relative bg-white border border-[#1C1B19]/10 p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-[14px] font-semibold text-white bg-[#1C1B19] px-2.5 py-0.5 rounded-sm">
                02
              </span>
            </div>
            <h3 className="text-[18px] font-semibold text-[#1C1B19] mb-2">
              Conduct Live Voice & Code Interview
            </h3>
            <p className="text-[14.5px] leading-relaxed text-[#1C1B19]/70">
              Engage directly with the AI interviewer. Clarify requirements, discuss
              trade-offs out loud, and write code on the shared interactive canvas.
            </p>
          </div>

          <div className="relative bg-white border border-[#1C1B19]/10 p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-[14px] font-semibold text-white bg-[#B8763A] px-2.5 py-0.5 rounded-sm">
                03
              </span>
            </div>
            <h3 className="text-[18px] font-semibold text-[#1C1B19] mb-2">
              Score & Prioritized Study Plan
            </h3>
            <p className="text-[14.5px] leading-relaxed text-[#1C1B19]/70">
              Receive line-by-line answer grading and an algorithmic study
              roadmap targeting the precise gaps preventing your next offer.
            </p>
          </div>
        </div>
      </section>

      {/* ================= COMPARISON TABLE ================= */}
      <section id="comparison" className="px-6 py-24 bg-white border-t border-[#1C1B19]/10">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-xl mb-12">
            <h2 className="font-serif text-[32px] md:text-[38px] font-medium tracking-tight text-[#1C1B19]">
              Why engineers choose Intervia AI
            </h2>
            <p className="mt-3 text-[16px] text-[#1C1B19]/65">
              Traditional interview prep is either too static or prohibitively
              expensive. Here is how we bridge the gap.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-[#1C1B19]/15">
                  <th className="py-4 px-4 font-mono text-[13px] text-[#1C1B19]/60">
                    FEATURE
                  </th>
                  <th className="py-4 px-4 font-mono text-[13px] text-[#1C1B19]/60">
                    LEETCODE / QUESTION LISTS
                  </th>
                  <th className="py-4 px-4 font-mono text-[13px] text-[#1C1B19]/60">
                    PAID HUMAN COACHING
                  </th>
                  <th className="py-4 px-4 font-mono text-[13px] text-[#2F5D50] bg-[#2F5D50]/5">
                    INTERVIA AI AGENTS
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1C1B19]/10 text-[14px]">
                {comparisons.map((c, i) => (
                  <tr key={i} className="hover:bg-[#FAF9F5] transition-colors">
                    <td className="py-4 px-4 font-medium text-[#1C1B19]">
                      {c.feature}
                    </td>
                    <td className="py-4 px-4 text-[#1C1B19]/60">{c.generic}</td>
                    <td className="py-4 px-4 text-[#1C1B19]/60">{c.human}</td>
                    <td className="py-4 px-4 font-semibold text-[#2F5D50] bg-[#2F5D50]/5">
                      ✓ {c.intervia}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ================= FAQ ACCORDION ================= */}
      <section id="faq" className="px-6 py-24 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-[32px] md:text-[38px] font-medium tracking-tight text-[#1C1B19]">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-[16px] text-[#1C1B19]/65">
            Everything you need to know about our multi-agent architecture and mock loops.
          </p>
        </div>

        <div className="divide-y divide-[#1C1B19]/15 border-y border-[#1C1B19]/15">
          {faqs.map((faq, index) => (
            <div key={index} className="py-5">
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full flex items-center justify-between text-left gap-4 font-medium text-[17px] text-[#1C1B19] hover:text-[#2F5D50] transition-colors"
              >
                <span>{faq.q}</span>
                <FiChevronDown
                  className={`w-5 h-5 text-[#1C1B19]/40 transition-transform duration-300 ${
                    openFaq === index ? "rotate-180 text-[#2F5D50]" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openFaq === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="mt-3 text-[14.5px] leading-relaxed text-[#1C1B19]/75 pr-6">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FINAL CTA SECTION ================= */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto border border-[#1C1B19]/20 bg-[#1C1B19] text-[#F7F5F0] rounded-xl p-10 md:p-16 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#2F5D50]/30 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <span className="font-mono text-[12px] text-[#2F5D50] bg-white/10 px-3 py-1 rounded-sm uppercase tracking-wider font-semibold">
              Instant Session Access
            </span>
            <h2 className="font-serif text-[34px] sm:text-[44px] md:text-[50px] font-medium tracking-tight mt-4 leading-tight">
              Your dream engineering offer starts with your next simulation.
            </h2>
            <p className="mt-4 text-[16px] text-slate-300 leading-relaxed max-w-lg">
              Get an unvarnished, calibrated evaluation of your technical depth,
              system communication, and resume alignment in less than 15 minutes.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/dashboard"
                className="px-8 py-4 rounded-sm bg-[#2F5D50] hover:bg-white hover:text-[#1C1B19] text-white font-medium text-[15px] transition-all flex items-center gap-2 shadow-lg"
              >
                <span>Launch Free Simulation</span>
                <FiArrowRight className="w-4 h-4" />
              </Link>
              <span className="font-mono text-[12px] text-slate-400">
                No credit card required • Instant start
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-[#1C1B19]/10 py-12 px-6 text-[13.5px] text-[#1C1B19]/60 bg-[#FAF9F5]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-sm bg-[#2F5D50] flex items-center justify-center text-[11px] text-white font-mono font-medium">
                iv
              </div>
              <span className="font-semibold text-[#1C1B19]">Intervia AI</span>
            </div>
            <p className="text-[13px] text-[#1C1B19]/60 leading-relaxed">
              Multi-agent platform for realistic technical interview preparation
              and automated career roadmap synthesis.
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <p className="font-mono text-[12px] text-[#1C1B19] font-semibold mb-3 uppercase">
              Agents
            </p>
            <ul className="space-y-2 text-[13px]">
              <li>
                <a href="#agents" className="hover:text-[#1C1B19] transition-colors">
                  Resume Ingestion Agent
                </a>
              </li>
              <li>
                <a href="#agents" className="hover:text-[#1C1B19] transition-colors">
                  Conversational Technical Agent
                </a>
              </li>
              <li>
                <a href="#agents" className="hover:text-[#1C1B19] transition-colors">
                  Multi-Factor Rubric Scorer
                </a>
              </li>
              <li>
                <a href="#agents" className="hover:text-[#1C1B19] transition-colors">
                  Curriculum Roadmap Agent
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <p className="font-mono text-[12px] text-[#1C1B19] font-semibold mb-3 uppercase">
              Tracks
            </p>
            <ul className="space-y-2 text-[13px]">
              <li>
                <a href="#tracks" className="hover:text-[#1C1B19] transition-colors">
                  Distributed Systems & Go
                </a>
              </li>
              <li>
                <a href="#tracks" className="hover:text-[#1C1B19] transition-colors">
                  Frontend & React Performance
                </a>
              </li>
              <li>
                <a href="#tracks" className="hover:text-[#1C1B19] transition-colors">
                  Machine Learning & LLMs
                </a>
              </li>
              <li>
                <a href="#tracks" className="hover:text-[#1C1B19] transition-colors">
                  System Design & Cloud Infra
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <p className="font-mono text-[12px] text-[#1C1B19] font-semibold mb-3 uppercase">
              System
            </p>
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-white border border-[#1C1B19]/10 text-[12px] font-mono text-[#2F5D50]">
                <span className="w-2 h-2 rounded-full bg-[#2F5D50]" />
                All Systems Operational
              </div>
              <p className="text-[12px] text-[#1C1B19]/50">
                Running Gateway v1.0 • Node v22 • Mongoose 9.x
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto pt-8 border-t border-[#1C1B19]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Intervia AI. All rights reserved.</p>
          <div className="flex gap-6 font-mono text-[12px]">
            <Link to="/dashboard" className="hover:text-[#1C1B19] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/dashboard" className="hover:text-[#1C1B19] transition-colors">
              Terms of Service
            </Link>
            <Link to="/dashboard" className="hover:text-[#1C1B19] transition-colors">
              Security
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
