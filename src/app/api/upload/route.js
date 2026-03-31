import { NextResponse } from 'next/server';
import cloudinary from "../../../../lib/cloudinary"



export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('image');
    
    if (!file) {
      return NextResponse.json(
        { message: 'No file uploaded' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: 'portfolio',
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      ).end(buffer);
    });

    console.log('Upload success:', result.secure_url);
    return NextResponse.json({ url: result.secure_url });
  } catch (error) {
    console.error('Upload API error:', error);
    return NextResponse.json(
      { message: 'Error uploading image', error: error.message },
      { status: 500 }
    );
  }
}