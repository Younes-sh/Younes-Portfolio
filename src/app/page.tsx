import Hero from "../../components/Hero/Hearo";
import Skills from '../../components/Skills/Skills';
import { connectDB } from '../../lib/mongodb';
import ProjectP from '../../models/Projects';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import Link from "next/link";

export default async function Home() {
  await connectDB();
  const rawProjects = await ProjectP.find({ featured: true }).limit(3).lean();

  const projects = rawProjects.map(project => ({
    ...project,
    _id: project._id.toString(), // تبدیل ObjectId به string
    createdAt: project.createdAt?.toISOString(), // تبدیل تاریخ به string (در صورت وجود)
    updatedAt: project.updatedAt?.toISOString(),
  }));

  return (
    <>
      <Hero />
      {/* Featured Projects Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 text-gray-900">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Projects</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Some of my best work that showcases my skills and creativity
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/projects"
              className="inline-flex items-center px-6 py-3 bg-white border-2 border-gray-900 text-gray-900 rounded-full font-medium hover:bg-gray-900 hover:text-white transition-all duration-300"
            >
              View All Projects
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
      
      <Skills />
      {/* <Contact /> */}
    </>
  );
}