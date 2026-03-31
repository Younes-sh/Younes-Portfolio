import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required.'],
    trim: true,
  },
  slug: {
    type: String,
    unique: true,
    sparse: true, // این خط اجازه می‌دهد اگر فیلد خالی بود، خطای Duplicate نگیرید
    lowercase: true,
  },
  description: {
    type: String,
    required: [true, 'Short description is required.'],
  },
  longDescription: {
    type: String,
  },
  technologies: {
    type: [String],
    default: [],
  },
  imageUrl: {
    type: String,
    required: [true, 'Project image address is required.'],
  },
  liveUrl: {
    type: String,
    default: '',
  },
  githubUrl: {
    type: String,
    default: '',
  },
  featured: {
    type: Boolean,
    default: false,
  },
}, { 
  timestamps: true // ایجاد auto createdAt و updatedAt
});

// جلوگیری از ایجاد مدل تکراری در Next.js Hot Reloading
const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);

export default Project;