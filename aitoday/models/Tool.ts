import mongoose, { Schema, Document } from 'mongoose';

export interface ITool extends Document {
  id: number;
  name: string;
  description: string;
  url: string;
  category: string;
  logo: string;
  screenshot: string;
  tags: string[];
  isFree: boolean;
  popularity: number;
  rating: string;
  createdAt: string;
}

const ToolSchema: Schema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: String, required: true },
  category: { type: String, required: true },
  logo: { type: String, required: true },
  screenshot: { type: String, required: true },
  tags: [{ type: String }],
  isFree: { type: Boolean, default: false },
  popularity: { type: Number, default: 0 },
  rating: { type: String, default: '4.0' },
  createdAt: { type: String, default: () => new Date().toISOString() },
});

ToolSchema.index({ name: 'text', description: 'text' });
ToolSchema.index({ category: 1 });
ToolSchema.index({ popularity: -1 });

export default mongoose.models.Tool || mongoose.model<ITool>('Tool', ToolSchema);
