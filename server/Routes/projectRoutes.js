import express from 'express';
import Project from '../model/Project.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   GET /api/projects/stats
// @desc    Get project stats by status/category
// @access  Admin Only
router.get('/stats', protect, adminOnly, async (req, res) => {
  try {
    const total = await Project.countDocuments();
    const completed = await Project.countDocuments({ status: 'Completed' });
    const ongoing = await Project.countDocuments({ status: 'Ongoing' });
    
    // Group by category
    const byCategory = await Project.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);
    
    res.json({
      total,
      completed,
      ongoing,
      byCategory
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stats', error: error.message });
  }
});

// @route   GET /api/projects
// @desc    Get all projects with filtering, search, sorting, pagination
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, status, search, sort, order, page = 1, limit = 6 } = req.query;
    
    const query = {};
    if (category && category !== 'All') query.category = category;
    if (status && status !== 'All') query.status = status;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const sortOptions = {};
    if (sort) {
      sortOptions[sort] = order === 'asc' ? 1 : -1;
    } else {
      sortOptions.createdAt = -1; // Default descending
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const projects = await Project.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit))
      .populate('createdBy', 'fullName email avatar');
      
    const total = await Project.countDocuments(query);

    res.json({
      projects,
      totalPages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error: error.message });
  }
});

// @route   GET /api/projects/:id
// @desc    Get single project
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('createdBy', 'fullName email avatar');
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching project', error: error.message });
  }
});

// @route   POST /api/projects
// @desc    Create project
// @access  Admin Only
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const projectData = { ...req.body, createdBy: req.user._id };
    const newProject = new Project(projectData);
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(400).json({ message: 'Error creating project', error: error.message });
  }
});

// @route   PUT /api/projects/:id
// @desc    Update project
// @access  Admin Only
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const projectData = { ...req.body, updatedAt: Date.now() };
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      projectData,
      { new: true, runValidators: true }
    );
    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: 'Error updating project', error: error.message });
  }
});

// @route   DELETE /api/projects/:id
// @desc    Delete project
// @access  Admin Only
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project', error: error.message });
  }
});

export default router;
