import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FaUserCircle, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/#services' },
    { name: 'About', path: '/#about' },
    { name: 'Contact', path: '/#contact' },
  ];

  if (user) {
    if (user.role === 'admin') {
      navLinks.push({ name: 'Dashboard', path: '/dashboard' });
    } else {
      navLinks.push({ name: 'Portal', path: '/user-portal' });
    }
  }

  return (
    <nav className="fixed w-full z-50 bg-bg-primary/80 backdrop-blur-md border-b border-border-glow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-black tracking-tighter text-white flex items-center gap-1">
              <span className="text-accent-green">MAVI</span>SOLUTION
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className="text-text-secondary hover:text-accent-green text-sm font-bold tracking-widest transition-colors uppercase"
              >
                {link.name}
              </a>
            ))}

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 focus:outline-none"
                >
                  <img
                    src={user.avatar || 'https://via.placeholder.com/40'}
                    alt="avatar"
                    className="w-10 h-10 rounded-full border-2 border-accent-blue"
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-bg-secondary border border-border-glow rounded-lg shadow-xl py-2 z-50">
                    <div className="px-4 py-2 border-b border-border-glow mb-2">
                      <p className="text-xs text-text-secondary uppercase font-bold tracking-tighter">Signed in as</p>
                      <p className="text-sm font-bold truncate">{user.fullName}</p>
                    </div>
                    <Link
                      to={user.role === 'admin' ? '/dashboard' : '/user-portal'}
                      className="block px-4 py-2 text-sm text-text-secondary hover:text-white hover:bg-accent-blue/10 transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      {user.role === 'admin' ? 'Admin Dashboard' : 'User Portal'}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-danger hover:bg-danger/10 transition-colors flex items-center gap-2"
                    >
                      <FaSignOutAlt /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-sm font-bold tracking-widest text-text-secondary hover:text-white uppercase transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2 bg-accent-blue hover:bg-accent-blue/80 text-white text-xs font-black tracking-widest rounded transition-all uppercase"
                >
                  Join Us
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-text-secondary hover:text-white"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-bg-secondary border-b border-border-glow">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className="block px-3 py-2 text-base font-bold text-text-secondary hover:text-accent-green uppercase tracking-widest"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            {!user && (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 text-base font-bold text-text-secondary hover:text-white uppercase tracking-widest"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 text-base font-bold text-accent-blue hover:text-accent-blue/80 uppercase tracking-widest"
                  onClick={() => setIsOpen(false)}
                >
                  Join Us
                </Link>
              </>
            )}
            {user && (
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 text-base font-bold text-danger hover:bg-danger/10 transition-colors uppercase tracking-widest"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
