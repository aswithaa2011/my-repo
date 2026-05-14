import mongoose from 'mongoose';

const jobApplicationSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  position: {
    type: String,
    required: true,
    enum: ['SRE Engineer', 'DevOps Specialist', 'Cloud Architect', 'Full Stack Developer', 'Security Analyst']
  },
  resumeLink: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    required: true
  },
  message: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Reviewing', 'Interviewed', 'Rejected', 'Hired'],
    default: 'Pending'
  },
  appliedAt: {
    type: Date,
    default: Date.now
  }
});

const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);
export default JobApplication;
