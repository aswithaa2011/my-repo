import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../utils/axios';
import { useAuth } from '../hooks/useAuth';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const getPasswordStrength = (pass) => {
    let score = 0;
    if (!pass) return { score: 0, label: '', color: 'bg-gray-700' };
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 1) return { score, label: 'Weak', color: 'bg-danger' };
    if (score <= 3) return { score, label: 'Medium', color: 'bg-warning' };
    return { score, label: 'Strong', color: 'bg-success' };
  };

  const strength = getPasswordStrength(formData.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validations
    if (strength.score < 4 && formData.password.length > 0) {
      setError('Password must be at least 8 characters, include uppercase, number, and special character.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const res = await axios.post('/api/auth/register', formData);
      login(res.data, res.data.token);
      if (res.data.role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/user-portal');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-bg-primary px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-md w-full space-y-8 glass-card p-10 rounded-2xl">
        <div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-white">Create an account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-100 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400">Full Name</label>
              <input
                type="text"
                required
                className="mt-1 block w-full px-3 py-3 border border-border-glow bg-bg-secondary text-white rounded-md focus:ring-accent-blue focus:border-accent-blue transition-colors"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400">Email Address</label>
              <input
                type="email"
                required
                className="mt-1 block w-full px-3 py-3 border border-border-glow bg-bg-secondary text-white rounded-md focus:ring-accent-blue focus:border-accent-blue transition-colors"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-400">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                required
                className="mt-1 block w-full px-3 py-3 border border-border-glow bg-bg-secondary text-white rounded-md focus:ring-accent-blue focus:border-accent-blue transition-colors"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 pt-6 flex items-center text-gray-400 hover:text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            
            {formData.password && (
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-400">Password Strength</span>
                  <span className={`text-xs font-semibold ${strength.label === 'Strong' ? 'text-success' : strength.label === 'Medium' ? 'text-warning' : 'text-danger'}`}>{strength.label}</span>
                </div>
                <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden flex">
                  <div className={`h-full ${strength.score >= 1 ? strength.color : ''} w-1/4`}></div>
                  <div className={`h-full border-l border-bg-primary ${strength.score >= 2 ? strength.color : ''} w-1/4`}></div>
                  <div className={`h-full border-l border-bg-primary ${strength.score >= 3 ? strength.color : ''} w-1/4`}></div>
                  <div className={`h-full border-l border-bg-primary ${strength.score >= 4 ? strength.color : ''} w-1/4`}></div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-400">Confirm Password</label>
              <input
                type="password"
                required
                className={`mt-1 block w-full px-3 py-3 border bg-bg-secondary text-white rounded-md focus:ring-accent-blue transition-colors ${formData.confirmPassword ? (formData.password === formData.confirmPassword ? 'border-success' : 'border-danger') : 'border-border-glow'}`}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              />
            </div>

          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-accent-blue hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-blue transition-all shadow-[0_0_15px_rgba(79,142,247,0.4)]"
            >
              Register
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-accent-blue hover:text-accent-cyan">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
