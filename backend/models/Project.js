import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ['Residential', 'Commercial']
    },
    description: { type: String, default: '' },
    media: [{ type: String }]
  },
  { timestamps: true }
);

const Project = mongoose.model('Project', projectSchema);

export default Project;
