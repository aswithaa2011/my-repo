import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['SRE', 'DevOps', 'Cloud', 'Monitoring', 'Automation', 'Security'],
    required: true
  },
  techStack: {
    type: [String],
    default: []
  },
  status: {
    type: String,
    enum: ['Planning', 'Ongoing', 'Completed', 'On Hold'],
    default: 'Planning'
  },
  clientName: {
    type: String
  },
  imageUrl: {
    type: String
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Medium'
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
});

const Project = mongoose.model('Project', projectSchema);
export default Project;
