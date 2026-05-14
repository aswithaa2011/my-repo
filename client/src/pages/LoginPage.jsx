import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../utils/axios';
import { useAuth } from '../hooks/useAuth';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
  const [lockedTimer, setLockedTimer] = useState(null);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotMsg, setForgotMsg] = useState('');

  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  useEffect(() => {
    let interval;
    if (lockedTimer && lockedTimer > 0) {
      interval = setInterval(() => {
        setLockedTimer((prev) => prev - 1);
      }, 1000);
    } else if (lockedTimer === 0) {
      setLockedTimer(null);
      setError('');
    }
    return () => clearInterval(interval);
  }, [lockedTimer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('/api/auth/login', { email, password });
      
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      login(res.data, res.data.token);
      
      if (res.data.role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/user-portal');
      }
    } catch (err) {
      setShake(true);
      setTimeout(() => setShake(false), 400);
      
      if (err.response && err.response.data.locked) {
        const msg = err.response.data.message;
        const match = msg.match(/(\d+)/);
        if (match) {
          setLockedTimer(parseInt(match[0], 10));
        }
        setError(msg);
      } else {
        setError(err.response?.data?.message || 'Invalid credentials');
      }
    }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/forgot-password', { email: forgotEmail });
      setForgotMsg(`OTP: ${res.data.otp}`); // Mock display
    } catch (err) {
      setForgotMsg(err.response?.data?.message || 'Error occurred');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-bg-primary px-4 sm:px-6 lg:px-8">
      <div className={`max-w-md w-full space-y-8 glass-card p-10 rounded-2xl ${shake ? 'shake' : ''}`}>
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Sign in to your account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-100 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400">Email address</label>
              <input
                type="email"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-3 border border-border-glow bg-bg-secondary text-white rounded-md focus:outline-none focus:ring-accent-blue focus:border-accent-blue focus:z-10 sm:text-sm transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={lockedTimer !== null}
              />
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-400">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                required
                className="mt-1 appearance-none relative block w-full px-3 py-3 border border-border-glow bg-bg-secondary text-white rounded-md focus:outline-none focus:ring-accent-blue focus:border-accent-blue focus:z-10 sm:text-sm transition-colors"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={lockedTimer !== null}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 pt-6 flex items-center text-gray-400 hover:text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-accent-blue focus:ring-accent-blue border-gray-700 rounded bg-bg-secondary"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <button type="button" onClick={() => setShowForgotModal(true)} className="font-medium text-accent-blue hover:text-accent-cyan transition-colors">
                Forgot your password?
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={lockedTimer !== null}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-accent-blue hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-blue transition-all shadow-[0_0_15px_rgba(79,142,247,0.4)] ${lockedTimer !== null ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {lockedTimer !== null ? `Locked (${lockedTimer}s)` : 'Sign In'}
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-400">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-accent-blue hover:text-accent-cyan">
              Register here
            </Link>
          </p>
        </div>
      </div>

      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="glass-card p-6 rounded-xl w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Reset Password</h3>
            {forgotMsg && <p className="mb-4 text-accent-cyan">{forgotMsg}</p>}
            <form onSubmit={handleForgotSubmit}>
              <input 
                type="email" 
                required 
                placeholder="Enter your email"
                className="w-full px-3 py-2 border border-border-glow bg-bg-secondary text-white rounded mb-4"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
              />
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setShowForgotModal(false)} className="px-4 py-2 text-gray-400 hover:text-white">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-accent-blue text-white rounded">Send OTP</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
