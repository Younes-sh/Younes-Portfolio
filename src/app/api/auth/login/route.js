import { connectDB } from '../../../../../lib/mongodb';
import User from '../../../../../models/User';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    
    console.log('Login attempt for:', username);
    
    await connectDB();
    
    // پیدا کردن کاربر با username و انتخاب password
    const user = await User.findOne({ username }).select('+password');
    
    if (!user) {
      console.log('User not found:', username);
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    // بررسی رمز عبور
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      console.log('Invalid password for:', username);
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    // بررسی نقش کاربر
    if (user.role !== 'admin') {
      console.log('User is not admin:', username);
      return NextResponse.json(
        { message: 'Access denied. Admin only.' },
        { status: 403 }
      );
    }
    
    // ایجاد توکن
    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    console.log('Login successful for:', username);
    
    return NextResponse.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
    
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}