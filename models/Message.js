import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
      trim: true,
      maxlength: [100, 'Name cannot be more than 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    subject: {
      type: String,
      required: [true, 'Please provide a subject'],
      maxlength: [200, 'Subject cannot be more than 200 characters'],
    },
    message: {
      type: String,
      required: [true, 'Please provide a message'],
      maxlength: [5000, 'Message cannot be more than 5000 characters'],
    },
    status: {
      type: String,
      enum: ['unread', 'read', 'replied', 'archived'],
      default: 'unread',
    },
    readAt: {
      type: Date,
    },
    repliedAt: {
      type: Date,
    },
    ipAddress: {
      type: String,
    },
    userAgent: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// متد علامت‌گذاری به عنوان خوانده شده
MessageSchema.methods.markAsRead = async function() {
  this.status = 'read';
  this.readAt = new Date();
  await this.save();
  return this;
};

// متد علامت‌گذاری به عنوان پاسخ داده شده
MessageSchema.methods.markAsReplied = async function() {
  this.status = 'replied';
  this.repliedAt = new Date();
  await this.save();
  return this;
};

export default mongoose.models.Message || mongoose.model('Message', MessageSchema);