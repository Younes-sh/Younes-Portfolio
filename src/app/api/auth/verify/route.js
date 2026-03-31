import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(request) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];
    
    if (!token) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    return NextResponse.json({ 
      user: decoded,
      valid: true 
    });
    
  } catch (error) {
    console.error('Verify error:', error);
    return NextResponse.json(
      { message: 'Invalid token', error: error.message },
      { status: 401 }
    );
  }
}