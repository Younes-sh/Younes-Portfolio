import { connectDB } from '../../../../lib/mongodb';
import User from '../../../../models/User';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    const { username, email, password, fullName } = await request.json();
    
    // اعتبارسنجی ساده
    if (!username || !email || !password) {
      return NextResponse.json(
        { message: 'Please provide all required fields' },
        { status: 400 }
      );
    }
    
    await connectDB();
    
    // بررسی وجود کاربر تکراری
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });
    
    if (existingUser) {
      return NextResponse.json(
        { message: 'Username or email already exists' },
        { status: 400 }
      );
    }
    
    // هش کردن رمز عبور
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // ایجاد کاربر جدید با رمز هش شده
    const user = new User({
      username,
      email,
      password: hashedPassword,
      fullName: fullName || '',
      role: 'user',
      isActive: true,
    });
    
    await user.save();
    
    // حذف password از پاسخ
    const userResponse = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      fullName: user.fullName
    };
    
    console.log('User created successfully:', user.username);
    
    return NextResponse.json({
      message: 'User created successfully',
      user: userResponse
    }, { status: 201 });
    
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Error creating user', error: error.message },
      { status: 500 }
    );
  }
}