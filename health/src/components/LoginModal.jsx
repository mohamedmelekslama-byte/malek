import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Globe, Code, Apple, ArrowLeft } from 'lucide-react';
import { authenticateUser, registerUser } from '../utils/authDb';

// Custom hook to track component mount status
function useIsMounted() {
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  return () => isMounted.current;
}

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const isMounted = useIsMounted();
  const [mode, setMode] = useState('login'); // 'login' | 'register' | 'forgot'

  // Input states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const [forgotEmail, setForgotEmail] = useState('');

  // Status feedback states
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Clear errors when toggling modes
  useEffect(() => {
    setErrorMsg('');
    setSuccessMsg('');
  }, [mode]);
  // Reset modal state on close
  const handleClose = () => {
    setMode('login');
    setLoginEmail('');
    setLoginPassword('');
    setRegisterName('');
    setRegisterEmail('');
    setRegisterPassword('');
    setForgotEmail('');
    setErrorMsg('');
    setSuccessMsg('');
    onClose();
  };

  // Close on ESC key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') handleClose(); };
    if (isOpen) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen]);

  if (!isOpen) return null;



  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const res = authenticateUser(loginEmail, loginPassword);
    if (res.success) {
      setSuccessMsg(`Welcome back, ${res.user.name.split(' ')[0]}! Logging in...`);
      const timeoutId = setTimeout(() => {
        if (isMounted()) {
          onLoginSuccess(res.user);
          handleClose();
        }
      }, 1000);
    return () => clearTimeout(timeoutId);
    } else {
      setErrorMsg(res.error);
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const res = registerUser(registerName, registerEmail, registerPassword);
    if (res.success) {
      setSuccessMsg('Account created successfully! Logging you in...');
      const timeoutId = setTimeout(() => {
        if (isMounted()) {
          onLoginSuccess(res.user);
          handleClose();
        }
      }, 1500);
    return () => clearTimeout(timeoutId);
    } else {
      setErrorMsg(res.error);
    }
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!forgotEmail.trim()) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setSuccessMsg('If this email is registered, a password recovery link has been sent!');
    setForgotEmail('');
    const timeoutId = setTimeout(() => {
        if (isMounted()) setMode('login');
      }, 2500);
    return () => clearTimeout(timeoutId);
  };

  const formVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => { e.stopPropagation(); handleClose(); }}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="relative w-full max-w-[420px] h-[650px] rounded-3xl overflow-hidden shadow-2xl flex flex-col z-10"
        >
          {/* Close Button */}
          <button
            onClick={(e) => { e.stopPropagation(); handleClose(); }}
    type="button"
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors cursor-pointer"
            aria-label="Close authentication panel"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Top 1/3: Abstract Fluid Background */}
          <div className="relative h-[200px] w-full bg-[#0a2310] overflow-hidden flex flex-col justify-end p-6 flex-shrink-0">
            {/* Organic Fluid Shapes (CSS Gradients + Blur) */}
            <div className="absolute top-[-50px] left-[-20px] w-[180px] h-[180px] bg-white rounded-full blur-[40px] opacity-70 mix-blend-screen" />
            <div className="absolute top-0 right-[-30px] w-[200px] h-[200px] bg-[#22c55e] rounded-full blur-[50px] opacity-60 mix-blend-screen" />
            <div className="absolute bottom-[-60px] left-[50px] w-[240px] h-[150px] bg-white/80 rounded-full blur-[35px] opacity-80 mix-blend-screen" />
            <div className="absolute bottom-[-80px] right-[20px] w-[180px] h-[180px] bg-[#10b981] rounded-full blur-[40px] opacity-80" />

            {/* Wavy Path overlay using SVG */}
            <svg
              className="absolute bottom-0 left-0 w-full h-[60px] text-white fill-current"
              viewBox="0 0 1440 320"
              preserveAspectRatio="none"
            >
              <path d="M0,96L60,112C120,128,240,160,360,154.7C480,149,600,107,720,106.7C840,107,960,149,1080,165.3C1200,181,1320,171,1380,165.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
            </svg>

            {/* Float branding logo inside the top 1/3 */}
            <div className="relative z-10 text-left">
              {mode === 'forgot' && (
                <button 
                  onClick={() => setMode('login')}
                  className="flex items-center gap-1.5 text-white/80 hover:text-white text-xs mb-3 font-semibold transition-colors cursor-pointer animate-pulse"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to sign in
                </button>
              )}
              <span className="text-[10px] bg-white/20 border border-white/30 text-white font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                {mode === 'login' ? 'Member Portal' : mode === 'register' ? 'Registration' : 'Security'}
              </span>
              <h2 className="text-xl font-display font-bold text-white mt-2">
                VitaFuel Ecosystem
              </h2>
            </div>
          </div>

          {/* Bottom 2/3: Clean White Card */}
          <div className="flex-grow bg-white p-8 flex flex-col justify-between text-left overflow-y-auto">
            <AnimatePresence mode="wait">
              {mode === 'login' && (
                <motion.div
                  key="login"
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex-grow flex flex-col justify-between"
                >
                  <form onSubmit={handleLoginSubmit} className="flex-grow flex flex-col justify-between">
                    <div>
                      {/* Header */}
                      <div className="mb-5">
                        <h3 className="text-2xl font-display font-extrabold text-gray-900 leading-tight">
                          Welcome back
                        </h3>
                        <p className="text-xs text-gray-500 mt-1 font-sans font-light">
                          Sign in to access your customized metabolic meal schedule.
                        </p>
                      </div>

                      {/* Error & Success Messages */}
                      {errorMsg && (
                        <div className="p-3 mb-4 rounded-xl bg-red-50 border border-red-200 text-[11px] text-red-600 font-semibold flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
                          {errorMsg}
                        </div>
                      )}
                      {successMsg && (
                        <div className="p-3 mb-4 rounded-xl bg-green-50 border border-green-200 text-[11px] text-green-600 font-semibold flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-ping" />
                          {successMsg}
                        </div>
                      )}

                      {/* Input Form Fields */}
                      <div className="space-y-4">
                        {/* Email Input */}
                        <div className="relative border-b border-gray-200 focus-within:border-blue-600 transition-colors py-1.5">
                          <Mail className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="email"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            placeholder="Email Address"
                            className="w-full pl-7 pr-3 py-1 bg-transparent text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
                            required
                          />
                        </div>

                        {/* Password Input */}
                        <div className="relative border-b border-gray-200 focus-within:border-blue-600 transition-colors py-1.5">
                          <Lock className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="password"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            placeholder="Password"
                            className="w-full pl-7 pr-3 py-1 bg-transparent text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
                            required
                          />
                        </div>

                        {/* Forgot Password */}
                        <div className="text-right">
                          <button
                            type="button"
                            onClick={() => setMode('forgot')}
                            className="text-[10px] font-semibold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
                          >
                            Forgot Password?
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-4 mt-6">
                      <button
                        type="submit"
                        className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs tracking-wider uppercase transition-colors shadow-lg shadow-blue-600/20 hover:shadow-blue-600/35 cursor-pointer"
                      >
                        Sign in
                      </button>

                      <div className="flex items-center justify-center gap-3">
                        <span className="h-[1px] bg-gray-100 flex-grow" />
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Or Sign In With</span>
                        <span className="h-[1px] bg-gray-100 flex-grow" />
                      </div>

                      <div className="flex justify-center gap-4">
                        {[
                          { icon: Globe, label: 'Google' },
                          { icon: Apple, label: 'Apple' },
                          { icon: Code, label: 'GitHub' }
                        ].map((social, idx) => {
                          const Icon = social.icon;
                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => {
                                setSuccessMsg(`Mock ${social.label} auth requested...`);
                                setTimeout(() => {
                                  onLoginSuccess({ name: `${social.label} Member`, email: 'oauth@example.com' });
                                  handleClose();
                                }, 1000);
                              }}
                              className="w-11 h-11 rounded-full border border-gray-200 hover:border-gray-900 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors cursor-pointer bg-white"
                              title={`Sign in with ${social.label}`}
                            >
                              <Icon className="w-4 h-4" />
                            </button>
                          );
                        })}
                      </div>

                      <div className="text-center">
                        <p className="text-[11px] text-gray-500">
                          Don't have an account?{' '}
                          <button
                            type="button"
                            onClick={() => setMode('register')}
                            className="font-bold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer ml-1"
                          >
                            Create Account
                          </button>
                        </p>
                      </div>
                    </div>
                  </form>
                </motion.div>
              )}

              {mode === 'register' && (
                <motion.div
                  key="register"
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex-grow flex flex-col justify-between"
                >
                  <form onSubmit={handleRegisterSubmit} className="flex-grow flex flex-col justify-between">
                    <div>
                      {/* Header */}
                      <div className="mb-5">
                        <h3 className="text-2xl font-display font-extrabold text-gray-900 leading-tight">
                          Create Account
                        </h3>
                        <p className="text-xs text-gray-500 mt-1 font-sans font-light">
                          Join VitaFuel to customize your metabolic meal plans.
                        </p>
                      </div>

                      {/* Error & Success Messages */}
                      {errorMsg && (
                        <div className="p-3 mb-4 rounded-xl bg-red-50 border border-red-200 text-[11px] text-red-600 font-semibold flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
                          {errorMsg}
                        </div>
                      )}
                      {successMsg && (
                        <div className="p-3 mb-4 rounded-xl bg-green-50 border border-green-200 text-[11px] text-green-600 font-semibold flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-ping" />
                          {successMsg}
                        </div>
                      )}

                      {/* Input Form Fields */}
                      <div className="space-y-4">
                        {/* Name Input */}
                        <div className="relative border-b border-gray-200 focus-within:border-blue-600 transition-colors py-1.5">
                          <User className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="text"
                            value={registerName}
                            onChange={(e) => setRegisterName(e.target.value)}
                            placeholder="Full Name"
                            className="w-full pl-7 pr-3 py-1 bg-transparent text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
                            required
                          />
                        </div>

                        {/* Email Input */}
                        <div className="relative border-b border-gray-200 focus-within:border-blue-600 transition-colors py-1.5">
                          <Mail className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="email"
                            value={registerEmail}
                            onChange={(e) => setRegisterEmail(e.target.value)}
                            placeholder="Email Address"
                            className="w-full pl-7 pr-3 py-1 bg-transparent text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
                            required
                          />
                        </div>

                        {/* Password Input */}
                        <div className="relative border-b border-gray-200 focus-within:border-blue-600 transition-colors py-1.5">
                          <Lock className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="password"
                            value={registerPassword}
                            onChange={(e) => setRegisterPassword(e.target.value)}
                            placeholder="Password"
                            className="w-full pl-7 pr-3 py-1 bg-transparent text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-4 mt-6">
                      <button
                        type="submit"
                        className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs tracking-wider uppercase transition-colors shadow-lg shadow-blue-600/20 hover:shadow-blue-600/35 cursor-pointer"
                      >
                        Sign up
                      </button>

                      <div className="flex items-center justify-center gap-3">
                        <span className="h-[1px] bg-gray-100 flex-grow" />
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Or Register With</span>
                        <span className="h-[1px] bg-gray-100 flex-grow" />
                      </div>

                      <div className="flex justify-center gap-4">
                        {[
                          { icon: Globe, label: 'Google' },
                          { icon: Apple, label: 'Apple' },
                          { icon: Code, label: 'GitHub' }
                        ].map((social, idx) => {
                          const Icon = social.icon;
                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => {
                                setSuccessMsg(`Mock ${social.label} auth requested...`);
                                setTimeout(() => {
                                  onLoginSuccess({ name: `${social.label} Member`, email: 'oauth@example.com' });
                                  handleClose();
                                }, 1000);
                              }}
                              className="w-11 h-11 rounded-full border border-gray-200 hover:border-gray-900 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors cursor-pointer bg-white"
                              title={`Register with ${social.label}`}
                            >
                              <Icon className="w-4 h-4" />
                            </button>
                          );
                        })}
                      </div>

                      <div className="text-center">
                        <p className="text-[11px] text-gray-500">
                          Already have an account?{' '}
                          <button
                            type="button"
                            onClick={() => setMode('login')}
                            className="font-bold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer ml-1"
                          >
                            Sign In
                          </button>
                        </p>
                      </div>
                    </div>
                  </form>
                </motion.div>
              )}

              {mode === 'forgot' && (
                <motion.div
                  key="forgot"
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex-grow flex flex-col justify-between"
                >
                  <form onSubmit={handleForgotSubmit} className="flex-grow flex flex-col justify-between">
                    <div>
                      {/* Header */}
                      <div className="mb-6">
                        <h3 className="text-2xl font-display font-extrabold text-gray-900 leading-tight">
                          Reset Password
                        </h3>
                        <p className="text-xs text-gray-500 mt-1 font-sans font-light">
                          Enter your email address and we will send you a recovery link.
                        </p>
                      </div>

                      {/* Error & Success Messages */}
                      {errorMsg && (
                        <div className="p-3 mb-4 rounded-xl bg-red-50 border border-red-200 text-[11px] text-red-600 font-semibold flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
                          {errorMsg}
                        </div>
                      )}
                      {successMsg && (
                        <div className="p-3 mb-4 rounded-xl bg-green-50 border border-green-200 text-[11px] text-green-600 font-semibold flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-ping" />
                          {successMsg}
                        </div>
                      )}

                      {/* Input Form Fields */}
                      <div className="space-y-6">
                        {/* Email Input */}
                        <div className="relative border-b border-gray-200 focus-within:border-blue-600 transition-colors py-1.5">
                          <Mail className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="email"
                            value={forgotEmail}
                            onChange={(e) => setForgotEmail(e.target.value)}
                            placeholder="Email Address"
                            className="w-full pl-7 pr-3 py-1 bg-transparent text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-5 mt-6">
                      <button
                        type="submit"
                        className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs tracking-wider uppercase transition-colors shadow-lg shadow-blue-600/20 hover:shadow-blue-600/35 cursor-pointer"
                      >
                        Send reset link
                      </button>

                      <div className="text-center pt-4">
                        <button
                          type="button"
                          onClick={() => setMode('login')}
                          className="font-bold text-xs text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
                        >
                          Back to Sign In
                        </button>
                      </div>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
