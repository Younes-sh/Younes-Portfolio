import { connectDB } from '../../../../lib/mongodb';
import User from '../../../../models/User';
import { NextResponse } from 'next/server';




export async function POST(request) {
  try {
    const { email, username } = await request.json();
    
    await connectDB();
    
    // پیدا کردن کاربر با ایمیل یا نام کاربری
    let user;
    if (email) {
      user = await User.findOne({ email });
    } else if (username) {
      user = await User.findOne({ username });
    } else {
      return NextResponse.json(
        { 
          success: false,
          message: 'Please provide either email or username' 
        },
        { status: 400 }
      );
    }
    
    if (!user) {
      return NextResponse.json(
        { 
          success: false,
          message: 'User not found' 
        },
        { status: 404 }
      );
    }
    
    // تغییر role به admin
    user.role = 'admin';
    await user.save();
    
    return NextResponse.json({
      success: true,
      message: 'User is now an admin',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        fullName: user.fullName
      }
    });
    
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { 
        success: false,
        message: 'Internal server error',
        error: error.message 
      },
      { status: 500 }
    );
  }
}