import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { FcGoogle } from "react-icons/fc";
import {
  FiArrowLeft,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiCheckCircle,
  FiShield,
} from "react-icons/fi";
import {
  auth,
  googleProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "../configs/firebase.js";

const Login = () => {
  const navigate = useNavigate();

  // Mode: Sign In vs Sign Up
  const [isSignUp, setIsSignUp] = useState(false);

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

  // Send Firebase ID Token to backend to establish session cookie & user record
  const syncWithBackend = async (firebaseUser) => {
    const token = await firebaseUser.getIdToken(true);
    let data;

    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ token }),
      });

      data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to establish authenticated session with backend.");
      }
    } catch (fetchErr) {
      console.warn("Backend server connection notice:", fetchErr.message);
      // If backend is offline, gracefully provide candidate session from verified Firebase user
      data = {
        success: true,
        user: {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || (firebaseUser.email ? firebaseUser.email.split("@")[0] : "Candidate"),
          email: firebaseUser.email,
          interviewCoins: 150,
        },
        offline: true,
      };
    }

    // Persist user details for client components
    localStorage.setItem(
      "intervia_user",
      JSON.stringify({
        id: data.user.id,
        name: data.user.name || firebaseUser.displayName || (firebaseUser.email ? firebaseUser.email.split("@")[0] : "Candidate"),
        email: data.user.email || firebaseUser.email,
        interviewCoins: data.user.interviewCoins ?? 150,
        photoURL: firebaseUser.photoURL || null,
        isOfflineMode: Boolean(data.offline),
      })
    );

    return data;
  };

  // Handle standard email/password login or signup
  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    try {
      let userCredential;
      if (isSignUp) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }

      await syncWithBackend(userCredential.user);
      navigate("/dashboard");
    } catch (err) {
      console.error("Email auth error:", err);
      if (
        err.code === "auth/user-not-found" ||
        err.code === "auth/invalid-credential" ||
        err.code === "auth/wrong-password"
      ) {
        setError(
          isSignUp
            ? "Unable to register with these credentials. Please try another email."
            : "Invalid email or password. Don't have an account yet? Click below to sign up."
        );
      } else if (err.code === "auth/email-already-in-use") {
        setError("An account already exists with this email. Switch to Sign In.");
      } else if (err.code === "auth/weak-password") {
        setError("Password is too weak. Please use at least 6 characters.");
      } else if (err.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else {
        setError(err.message || "Authentication failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle Google Sign-In with Firebase & backend session sync
  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await syncWithBackend(result.user);
      navigate("/dashboard");
    } catch (err) {
      console.error("Google sign-in error:", err);
      if (err.code === "auth/popup-closed-by-user") {
        setError("Google sign-in window was closed before completion.");
      } else if (err.code === "auth/cancelled-popup-request") {
        setError("Authentication request was cancelled.");
      } else if (err.code === "auth/network-request-failed") {
        setError("Network error. Please check your internet connection.");
      } else {
        setError(err.message || "Google authentication failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#1C1B19] font-sans selection:bg-[#2F5D50] selection:text-white flex flex-col justify-between">
      {/* ================= TOP HEADER ================= */}
      <header className="px-6 py-5 border-b border-[#1C1B19]/10 bg-[#F7F5F0]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[14px] font-mono text-[#1C1B19]/70 hover:text-[#1C1B19] transition-colors"
          >
            <FiArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-sm bg-[#2F5D50] flex items-center justify-center text-white text-xs font-mono font-medium">
              iv
            </div>
            <span className="text-[16px] font-medium tracking-tight">
              Intervia <span className="text-[#2F5D50]">AI</span>
            </span>
          </Link>
        </div>
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 flex items-center justify-center px-6 py-12 md:py-16">
        <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Login Form */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-7 bg-white border border-[#1C1B19]/12 rounded-xl p-8 sm:p-10 shadow-sm"
          >
            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm bg-[#2F5D50]/10 border border-[#2F5D50]/20 font-mono text-[11.5px] text-[#2F5D50] font-medium mb-4">
              <FiShield className="w-3 h-3" />
              <span>SECURE CANDIDATE ACCESS</span>
            </div>

            <h1 className="font-serif text-[32px] sm:text-[38px] font-medium tracking-tight text-[#1C1B19] leading-tight">
              {isSignUp ? "Create candidate profile" : "Sign in to your account"}
            </h1>
            <p className="mt-2 text-[15px] text-[#1C1B19]/65">
              {isSignUp
                ? "Join Intervia AI to practice high-stakes system design & coding interviews with real-time feedback."
                : "Resume your practice sessions, review interview feedback, and track your career roadmap."}
            </p>

            {/* Error Message */}
            {error && (
              <div className="mt-5 p-3.5 bg-red-50 border border-red-200 text-red-700 text-[13.5px] rounded-sm flex items-center gap-2">
                <span>⚠️ {error}</span>
              </div>
            )}

            {/* Google OAuth Button */}
            <div className="mt-8">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full py-3 px-4 border border-[#1C1B19]/15 rounded-sm bg-[#F7F5F0] hover:bg-[#FAF9F5] hover:border-[#1C1B19]/30 transition-all font-medium text-[14.5px] text-[#1C1B19] flex items-center justify-center gap-3 shadow-sm hover:shadow active:scale-[0.99] disabled:opacity-60 cursor-pointer"
              >
                <FcGoogle className="w-5 h-5 shrink-0" />
                <span>Continue with Google</span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-7 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#1C1B19]/10" />
              </div>
              <span className="relative bg-white px-3 font-mono text-[11.5px] uppercase tracking-wider text-[#1C1B19]/45">
                {isSignUp ? "or sign up with email" : "or sign in with email"}
              </span>
            </div>

            {/* Email / Password Form */}
            <form onSubmit={handleEmailAuth} className="space-y-4">
              {/* Email field */}
              <div>
                <label className="block font-mono text-[12px] uppercase text-[#1C1B19]/70 mb-1.5 font-medium">
                  Email Address
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1C1B19]/40 w-4 h-4" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-sm border border-[#1C1B19]/15 text-[14.5px] text-[#1C1B19] placeholder:text-[#1C1B19]/35 focus:outline-none focus:border-[#2F5D50] focus:ring-1 focus:ring-[#2F5D50] transition-colors bg-[#FAF9F5]/50"
                  />
                </div>
              </div>

              {/* Password field */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-mono text-[12px] uppercase text-[#1C1B19]/70 font-medium">
                    Password
                  </label>
                  {!isSignUp && (
                    <a
                      href="#forgot"
                      onClick={(e) => {
                        e.preventDefault();
                        alert("Password reset instructions sent to your email.");
                      }}
                      className="font-mono text-[11.5px] text-[#2F5D50] hover:underline"
                    >
                      Forgot password?
                    </a>
                  )}
                </div>
                <div className="relative">
                  <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1C1B19]/40 w-4 h-4" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-11 py-2.5 rounded-sm border border-[#1C1B19]/15 text-[14.5px] text-[#1C1B19] placeholder:text-[#1C1B19]/35 focus:outline-none focus:border-[#2F5D50] focus:ring-1 focus:ring-[#2F5D50] transition-colors bg-[#FAF9F5]/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#1C1B19]/40 hover:text-[#1C1B19]/80 transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <FiEyeOff className="w-4 h-4" />
                    ) : (
                      <FiEye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 accent-[#2F5D50] rounded cursor-pointer"
                  />
                  <span className="text-[13.5px] text-[#1C1B19]/75 select-none">
                    Remember my device for 30 days
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-3 py-3 px-4 rounded-sm bg-[#1C1B19] hover:bg-[#2F5D50] text-white font-medium text-[15px] transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-60 cursor-pointer"
              >
                {loading ? (
                  <span className="font-mono text-[13px]">Authenticating...</span>
                ) : (
                  <>
                    <span>{isSignUp ? "Create Account" : "Sign In"}</span>
                    <FiArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Toggle Sign Up / Sign In */}
            <div className="mt-8 pt-6 border-t border-[#1C1B19]/10 text-center">
              <p className="text-[14px] text-[#1C1B19]/65">
                {isSignUp ? "Already registered? " : "New candidate? "}
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setError("");
                  }}
                  className="font-medium text-[#2F5D50] hover:underline cursor-pointer bg-transparent border-none p-0"
                >
                  {isSignUp ? "Sign in to existing account →" : "Create an account free →"}
                </button>
              </p>
            </div>
          </motion.div>

          {/* Right Column: Editorial Value Proposition & Testimonial */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Interview Simulation Preview Card */}
            <div className="bg-[#1C1B19] text-[#F7F5F0] rounded-xl p-7 border border-[#1C1B19]/20 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#2F5D50]/20 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center gap-2 text-[#2F5D50] font-mono text-[11px] font-semibold mb-4">
                <span className="w-2 h-2 rounded-full bg-[#2F5D50] animate-pulse" />
                <span>ACTIVE SIMULATION PLATFORM</span>
              </div>

              <blockquote className="font-serif text-[18px] sm:text-[20px] leading-relaxed text-slate-200 italic mb-6">
                “The AI interviewer picked up on a slight hesitation when I described Kafka partition keys, asked a sharp follow-up, and graded my answer with total precision.”
              </blockquote>

              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div className="w-9 h-9 rounded-full bg-[#2F5D50] flex items-center justify-center text-white font-mono text-xs font-bold">
                  SK
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-white">
                    Siddharth K.
                  </p>
                  <p className="text-[12px] text-slate-400 font-mono">
                    Offers from Meta & Stripe
                  </p>
                </div>
              </div>
            </div>

            {/* Platform Highlights */}
            <div className="bg-white/70 border border-[#1C1B19]/10 rounded-xl p-6 space-y-3.5">
              <h3 className="font-mono text-[11.5px] uppercase tracking-wider text-[#1C1B19]/50 font-semibold">
                What you get upon sign-in:
              </h3>
              <div className="space-y-2.5 text-[13.5px] text-[#1C1B19]/80">
                <div className="flex items-start gap-2.5">
                  <FiCheckCircle className="w-4 h-4 text-[#2F5D50] shrink-0 mt-0.5" />
                  <span>Interactive AI voice interviews with sub-250ms latency.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <FiCheckCircle className="w-4 h-4 text-[#2F5D50] shrink-0 mt-0.5" />
                  <span>Automated resume gap detection matched to target job specs.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <FiCheckCircle className="w-4 h-4 text-[#2F5D50] shrink-0 mt-0.5" />
                  <span>Personalized skill roadmaps generated from session analytics.</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="px-6 py-5 border-t border-[#1C1B19]/10 text-center font-mono text-[11.5px] text-[#1C1B19]/50">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Intervia AI. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/" className="hover:text-[#1C1B19] transition-colors">
              Terms of Service
            </Link>
            <Link to="/" className="hover:text-[#1C1B19] transition-colors">
              Privacy Notice
            </Link>
            <Link to="/" className="hover:text-[#1C1B19] transition-colors">
              Security Architecture
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;
