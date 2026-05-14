import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Web', 'Mobile', 'Cloud', 'AI/ML', 'DevOps'],
    required: true,
  },
  techStack: {
    type: [String],
    default: [],
  },
  status: {
    type: String,
    enum: ['Ongoing', 'Completed', 'On Hold'],
    default: 'Ongoing',
  },
  clientName: {
    type: String,
    default: '',
  },
  imageUrl: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
