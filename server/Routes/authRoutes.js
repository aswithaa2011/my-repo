import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../model/User.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || 'secret123', {
    expiresIn: '7d',
  });
};

const getInitials = (name) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
};

// @route   POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { fullName, email, password, role, secretKey } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const assignedRole = 'user';
    
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Generate simple avatar (using UI Avatars API for simplicity)
    const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=random&color=fff`;

    const user = await User.create({
      fullName,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: assignedRole,
      avatar
    });

    if (user) {
      console.log(`User created: ${user.email}`);
      res.status(201).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        token: generateToken(user._id, user.role),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data provided' });
    }
  } catch (error) {
    console.error('Registration Error:', error);
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Email address already in use' });
    }
    res.status(500).json({ message: 'Server registration error', error: error.message });
  }
});

// @route   POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (user.lockedUntil && user.lockedUntil > Date.now()) {
      const remainingSeconds = Math.ceil((user.lockedUntil - Date.now()) / 1000);
      return res.status(403).json({ message: `Account locked. Try again in ${remainingSeconds} seconds`, locked: true });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      user.loginAttempts += 1;
      if (user.loginAttempts >= 5) {
        user.lockedUntil = new Date(Date.now() + 30 * 1000); // lock for 30s
      }
      await user.save();
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    user.loginAttempts = 0;
    user.lockedUntil = undefined;
    await user.save();

    res.json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/auth/forgot-password
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetOTP = otp;
    user.resetOTPExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 mins
    await user.save();

    // Mock sending email
    res.json({ message: 'OTP generated successfully (MOCK)', otp });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/auth/reset-password
router.post('/reset-password', async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.resetOTP !== otp || user.resetOTPExpiry < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(newPassword, salt);
    user.resetOTP = undefined;
    user.resetOTPExpiry = undefined;
    await user.save();

    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/auth/me
router.get('/me', protect, (req, res) => {
  res.json({
    _id: req.user._id,
    fullName: req.user.fullName,
    email: req.user.email,
    role: req.user.role,
    avatar: req.user.avatar
  });
});

// @route   POST /api/auth/logout
router.post('/logout', (req, res) => {
  // Since we use JWT in localStorage, the client just needs to delete the token.
  // We can log the event here or clear cookies if they were used.
  res.json({ message: 'Logged out successfully' });
});

export default router;
