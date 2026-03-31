import { NextResponse } from 'next/server';
import { connectDB } from '../../../../../lib/mongodb';
import Project from '../../../../../models/Projects';

export async function GET(request, { params }) {
  try {
    await connectDB();

    // مهم: در نسخه‌های جدید باید params را await کنید
    const resolvedParams = await params; 
    const id = resolvedParams.id;

    if (!id) {
      return NextResponse.json({ message: 'ID is missing' }, { status: 400 });
    }

    const project = await Project.findById(id);
    
    if (!project) {
      return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }
    
    return NextResponse.json(project); // اینجا JSON معتبر برگردانده می‌شود
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    // ۱. حتماً params را await کنید تا id استخراج شود
    const resolvedParams = await params;
    const id = resolvedParams.id;

    const data = await request.json();
    await connectDB();
    
    // ۲. استفاده از id استخراج شده
    const project = await Project.findByIdAndUpdate(
      id,
      { ...data, updatedAt: Date.now() },
      { 
        returnDocument: 'after', // جایگزین جدید برای new: true طبق هشدار موندو
        runValidators: true 
      }
    );
    
    if (!project) {
      return NextResponse.json(
        { message: 'Project not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(project);
  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json(
      { message: 'Error updating project', error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    // ابتدا params را await کنید
    const { id } = await params;
    
    console.log('Deleting project with ID:', id);
    
    if (!id) {
      return NextResponse.json(
        { message: 'Project ID is required' },
        { status: 400 }
      );
    }
    
    await connectDB();
    console.log('DB Connected');
    
    // پیدا کردن و حذف پروژه
    const deletedProject = await Project.findByIdAndDelete(id);
    
    if (!deletedProject) {
      console.log('Project not found:', id);
      return NextResponse.json(
        { message: 'Project not found' },
        { status: 404 }
      );
    }
    
    console.log('Project deleted successfully:', deletedProject.title);
    
    return NextResponse.json({ 
      success: true,
      message: 'Project deleted successfully',
      deletedProject: {
        id: deletedProject._id,
        title: deletedProject.title
      }
    });
    
  } catch (error) {
    console.error('DELETE Error details:', error);
    return NextResponse.json(
      { 
        message: 'Error deleting project', 
        error: error.message,
        stack: error.stack 
      },
      { status: 500 }
    );
  }
}