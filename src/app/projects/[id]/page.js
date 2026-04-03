import { connectDB } from '../../../../lib/mongodb';
import Project from '../../../../models/Projects';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';




export default async function ProjectDetail({ params }) {
  // ابتدا params را await کنید
  const { id } = await params;
  
  await connectDB();
  const project = await Project.findById(id).lean();

  if (!project) {
    notFound();
  }

  // تبدیل ObjectId به رشته
  const serializedProject = {
    ...project,
    _id: project._id.toString(),
    createdAt: project.createdAt?.toISOString(),
    updatedAt: project.updatedAt?.toISOString(),
  };

  return (
    <div className="lg:mt-16 mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="relative h-96 w-full rounded-lg overflow-hidden mb-8">
          <Image
            src={serializedProject.imageUrl}
            alt={serializedProject.title}
            fill
            className="lg:object-cover "
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <h1 className="text-4xl font-bold mb-4">{serializedProject.title}</h1>
        <div className="flex flex-wrap gap-2 mb-6">
          {serializedProject.technologies.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="prose max-w-none mb-8">
          <p className="text-gray-700 text-lg leading-relaxed">
            {serializedProject.longDescription}
          </p>
        </div>
        <div className="flex gap-4">
          {serializedProject.liveUrl && (
            <a
              href={serializedProject.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
            >
              Live Demo
            </a>
          )}
          {serializedProject.githubUrl && (
            <a
              href={serializedProject.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 text-white px-6 py-3 rounded hover:bg-gray-900 transition"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
}