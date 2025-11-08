import mongoose, { Document, Schema } from 'mongoose';

// Report interface
export interface IReport extends Document {
  userId: mongoose.Types.ObjectId;
  fileName: string;
  filePath: string;
  fileType: string;
  extractedText: string;
  aiSummary: string;
  aiAnalysis: {
    abnormalities: string[];
    recommendations: string[];
    plainEnglish: string;
  };
  status: 'pending' | 'approved' | 'rejected';
  doctorComments?: string;
  reviewedBy?: mongoose.Types.ObjectId;
  reviewedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Report schema
const ReportSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    filePath: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      required: true,
      enum: ['pdf', 'image', 'text'],
    },
    extractedText: {
      type: String,
      default: '',
    },
    aiSummary: {
      type: String,
      default: '',
    },
    aiAnalysis: {
      abnormalities: [String],
      recommendations: [String],
      plainEnglish: String,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    doctorComments: {
      type: String,
      default: '',
    },
    reviewedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    reviewedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
ReportSchema.index({ userId: 1, createdAt: -1 });
ReportSchema.index({ status: 1 });

export default mongoose.model<IReport>('Report', ReportSchema);


