import express from 'express';
import JobApplication from '../model/JobApplication.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Submit a job application
// @route   POST /api/jobs/apply
// @access  Public
router.post('/apply', async (req, res) => {
  try {
    const { fullName, email, position, resumeLink, experience, message } = req.body;

    if (!fullName || !email || !position || !resumeLink || !experience) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const application = await JobApplication.create({
      fullName,
      email: email.toLowerCase(),
      position,
      resumeLink,
      experience,
      message
    });

    res.status(201).json({
      success: true,
      message: 'Application received. Our SRE team will review your signal shortly.',
      data: application
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @desc    Get all applications
// @route   GET /api/jobs/applications
// @access  Private (Admin Only)
router.get('/applications', protect, adminOnly, async (req, res) => {
  try {
    const applications = await JobApplication.find().sort({ appliedAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Update application status
// @route   PATCH /api/jobs/applications/:id
// @access  Private (Admin Only)
router.patch('/applications/:id', protect, adminOnly, async (req, res) => {
  try {
    const application = await JobApplication.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(application);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;
