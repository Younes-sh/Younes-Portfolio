import { connectDB } from '../../../lib/mongodb';
import Project from '../../../models/Projects';
import ProjectCard from '../../../components/ProjectCard/ProjectCard';



export default async function ProjectsPage() {
  await connectDB();
  const projects = await Project.find().sort({ createdAt: -1 }).lean();
  
  // تبدیل ObjectId به رشته
  const serializedProjects = projects.map(project => ({
    ...project,
    _id: project._id.toString(),
    createdAt: project.createdAt?.toISOString(),
    updatedAt: project.updatedAt?.toISOString(),
  }));

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">All Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {serializedProjects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </div>
  );
}