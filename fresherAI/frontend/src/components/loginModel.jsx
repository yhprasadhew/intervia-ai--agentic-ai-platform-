import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { FcGoogle } from "react-icons/fc";
import {
  FiX,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiShield,
} from "react-icons/fi";
import {
  auth,
  googleProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "../configs/firebase.js";

const LoginModel = ({ isOpen, onClose, onSuccess }) => {
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

  const syncWithBackend = async (firebaseUser) => {
    const token = await firebaseUser.getIdToken(true);
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ token }),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || "Authentication failed with backend server.");
    }

    localStorage.setItem(
      "intervia_user",
      JSON.stringify({
        id: data.user.id,
        name: data.user.name || firebaseUser.displayName || email.split("@")[0],
        email: data.user.email || firebaseUser.email,
        interviewCoins: data.user.interviewCoins ?? 150,
        photoURL: firebaseUser.photoURL || null,
      })
    );

    return data;
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
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
      if (onSuccess) onSuccess();
      if (onClose) onClose();
      navigate("/dashboard");
    } catch (err) {
      console.error("Modal email auth error:", err);
      if (
        err.code === "auth/user-not-found" ||
        err.code === "auth/invalid-credential" ||
        err.code === "auth/wrong-password"
      ) {
        setError(
          isSignUp
            ? "Could not create account with these credentials."
            : "Invalid email or password. New user? Click below to sign up."
        );
      } else if (err.code === "auth/email-already-in-use") {
        setError("This email is already in use. Please sign in instead.");
      } else {
        setError(err.message || "Authentication failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await syncWithBackend(result.user);
      if (onSuccess) onSuccess();
      if (onClose) onClose();
      navigate("/dashboard");
    } catch (err) {
      console.error("Modal google auth error:", err);
      if (err.code === "auth/popup-closed-by-user") {
        setError("Sign-in popup was closed before completing.");
      } else {
        setError(err.message || "Google authentication failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#1C1B19]/60 backdrop-blur-sm"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative w-full max-w-md bg-white rounded-xl shadow-2xl border border-[#1C1B19]/10 p-6 sm:p-8 z-10 overflow-hidden font-sans text-[#1C1B19]"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-[#1C1B19]/40 hover:text-[#1C1B19] rounded-sm transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <FiX className="w-5 h-5" />
          </button>

          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-[#2F5D50]/10 border border-[#2F5D50]/20 font-mono text-[11px] text-[#2F5D50] font-medium mb-3">
            <FiShield className="w-3 h-3" />
            <span>AUTHENTICATION</span>
          </div>

          <h2 className="font-serif text-[26px] font-medium tracking-tight text-[#1C1B19]">
            {isSignUp ? "Create candidate profile" : "Welcome back"}
          </h2>
          <p className="mt-1 text-[13.5px] text-[#1C1B19]/65">
            {isSignUp
              ? "Start realistic mock interviews with AI engineering leaders."
              : "Sign in to access your interview roadmap and feedback history."}
          </p>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 text-[13px] rounded-sm flex items-start gap-2">
              <span className="shrink-0">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Google OAuth Button */}
          <div className="mt-5">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full py-2.5 px-4 border border-[#1C1B19]/15 rounded-sm bg-[#F7F5F0] hover:bg-[#FAF9F5] hover:border-[#1C1B19]/30 transition-all font-medium text-[14px] text-[#1C1B19] flex items-center justify-center gap-2.5 shadow-sm active:scale-[0.99] disabled:opacity-60 cursor-pointer"
            >
              <FcGoogle className="w-5 h-5 shrink-0" />
              <span>Continue with Google</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-5 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#1C1B19]/10" />
            </div>
            <span className="relative bg-white px-3 font-mono text-[11px] uppercase tracking-wider text-[#1C1B19]/45">
              or continue with email
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleEmailAuth} className="space-y-3.5">
            <div>
              <label className="block font-mono text-[11px] uppercase text-[#1C1B19]/70 mb-1 font-medium">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1C1B19]/40 w-4 h-4" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-9 pr-3 py-2 rounded-sm border border-[#1C1B19]/15 text-[14px] text-[#1C1B19] placeholder:text-[#1C1B19]/35 focus:outline-none focus:border-[#2F5D50] focus:ring-1 focus:ring-[#2F5D50] bg-[#FAF9F5]/50"
                />
              </div>
            </div>

            <div>
              <label className="block font-mono text-[11px] uppercase text-[#1C1B19]/70 mb-1 font-medium">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1C1B19]/40 w-4 h-4" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-10 py-2 rounded-sm border border-[#1C1B19]/15 text-[14px] text-[#1C1B19] placeholder:text-[#1C1B19]/35 focus:outline-none focus:border-[#2F5D50] focus:ring-1 focus:ring-[#2F5D50] bg-[#FAF9F5]/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1C1B19]/40 hover:text-[#1C1B19]"
                >
                  {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-2.5 px-4 rounded-sm bg-[#1C1B19] hover:bg-[#2F5D50] text-white font-medium text-[14px] transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-60 cursor-pointer"
            >
              {loading ? (
                <span className="font-mono text-[12.5px]">Authenticating...</span>
              ) : (
                <>
                  <span>{isSignUp ? "Create Account" : "Sign In"}</span>
                  <FiArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Toggle */}
          <div className="mt-5 pt-4 border-t border-[#1C1B19]/10 text-center">
            <p className="text-[13px] text-[#1C1B19]/65">
              {isSignUp ? "Already have an account? " : "New candidate? "}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError("");
                }}
                className="font-medium text-[#2F5D50] hover:underline cursor-pointer bg-transparent border-none p-0"
              >
                {isSignUp ? "Sign In →" : "Sign up free →"}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default LoginModel;