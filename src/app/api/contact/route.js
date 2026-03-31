import { connectDB } from '../../../../lib/mongodb';
import Message from '../../../../models/Message';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json();
    
    // اعتبارسنجی
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }
    
    // دریافت اطلاعات IP و User-Agent (اختیاری)
    const ipAddress = request.headers.get('x-forwarded-for') || 
                      request.headers.get('x-real-ip') || 
                      'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    
    await connectDB();
    
    // ایجاد پیام جدید
    const newMessage = await Message.create({
      name,
      email,
      subject,
      message,
      status: 'unread',
      ipAddress,
      userAgent,
    });
    
    return NextResponse.json(
      { 
        success: true,
        message: 'Message sent successfully',
        data: {
          id: newMessage._id,
          name: newMessage.name,
          email: newMessage.email,
          subject: newMessage.subject,
          status: newMessage.status,
          createdAt: newMessage.createdAt,
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact API error:', error);
    
    // خطای اعتبارسنجی mongoose
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        { message: 'Validation error', errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { message: 'Error sending message', error: error.message },
      { status: 500 }
    );
  }
}

// GET: دریافت پیام‌ها (فقط برای ادمین)
export async function GET(request) {
  try {
    // بررسی توکن ادمین (امنیت)
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const token = authHeader.split(' ')[1];
    // می‌توانید توکن را بررسی کنید
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // if (decoded.role !== 'admin') { ... }
    
    await connectDB();
    
    const messages = await Message.find()
      .sort({ createdAt: -1 })
      .select('-__v'); // حذف فیلد __v
    
    return NextResponse.json({ 
      success: true, 
      count: messages.length,
      messages 
    });
  } catch (error) {
    console.error('Get messages error:', error);
    return NextResponse.json(
      { message: 'Error fetching messages' },
      { status: 500 }
    );
  }
}