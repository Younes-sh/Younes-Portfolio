import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/mongodb';
import Project from '../../../../models/Projects';




export async function GET() {
  try {
    await connectDB();
    const projects = await Project.find().sort({ createdAt: -1 });
    return NextResponse.json(projects);
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json(
      { message: 'Error fetching projects', error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    console.log('Received project data:', data);
    
    await connectDB();
    console.log('DB Connected');
    
    const project = await Project.create(data);
    console.log('Project created:', project._id);
    
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('POST Error Details:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    if (error.errors) {
      console.error('Validation errors:', error.errors);
    }
    return NextResponse.json(
      { 
        message: 'Error creating project', 
        error: error.message,
        details: error.errors 
      },
      { status: 500 }
    );
  }
}