import Hero from "../../components/Hero/Hearo";
import Skills from '../../components/Skills/Skills';
import { connectDB } from '../../lib/mongodb';
import ProjectP from '../../models/Projects';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import Link from "next/link";

const WIN_FONT = "'Tahoma', 'MS Sans Serif', Arial, sans-serif";

export default async function Home() {
  await connectDB();
  const rawProjects = await ProjectP.find({ featured: true }).limit(3).lean();

  const projects = rawProjects.map((project: any) => ({
    ...project,
    _id: project._id.toString(),
    createdAt: project.createdAt?.toISOString(),
    updatedAt: project.updatedAt?.toISOString(),
  }));

  return (
    <>
      <Hero />

      {/* Featured Projects — Win2000 window style */}
      <section
        style={{
          padding: '32px 16px',
          backgroundColor: '#008080',
          fontFamily: WIN_FONT,
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

          {/* Section window frame */}
          <div
            style={{
              backgroundColor: '#d4d0c8',
              borderTop:    '2px solid #ffffff',
              borderLeft:   '2px solid #ffffff',
              borderRight:  '2px solid #404040',
              borderBottom: '2px solid #404040',
            }}
          >
            {/* Title bar */}
            <div
              style={{
                background: 'linear-gradient(90deg, #000080 0%, #1084d0 100%)',
                color: '#ffffff',
                fontSize: '11px',
                fontWeight: 'bold',
                padding: '3px 8px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                userSelect: 'none',
              }}
            >
              <span>&#128193;</span>
              Featured Projects — My Portfolio
              <span style={{ marginLeft: 'auto', display: 'flex', gap: '2px' }}>
                {['_', '□', '×'].map((btn, i) => (
                  <span
                    key={i}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '16px',
                      height: '14px',
                      backgroundColor: '#d4d0c8',
                      borderTop:    '1px solid #ffffff',
                      borderLeft:   '1px solid #ffffff',
                      borderRight:  '1px solid #404040',
                      borderBottom: '1px solid #404040',
                      color: '#000000',
                      fontSize: '9px',
                      fontWeight: 'bold',
                      cursor: 'default',
                    }}
                  >
                    {btn}
                  </span>
                ))}
              </span>
            </div>

            {/* Toolbar */}
            <div
              style={{
                backgroundColor: '#d4d0c8',
                borderBottom: '1px solid #808080',
                padding: '3px 8px',
                fontSize: '11px',
                display: 'flex',
                gap: '12px',
              }}
            >
              {['File', 'Edit', 'View', 'Favorites', 'Help'].map((item) => (
                <span
                  key={item}
                  style={{ color: '#000000', cursor: 'default', padding: '1px 4px' }}
                >
                  {item}
                </span>
              ))}
            </div>

            {/* Address bar */}
            <div
              style={{
                backgroundColor: '#d4d0c8',
                padding: '4px 8px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '11px',
                borderBottom: '1px solid #808080',
              }}
            >
              <span style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>Address:</span>
              <div
                style={{
                  flex: 1,
                  backgroundColor: '#ffffff',
                  borderTop:    '1px solid #808080',
                  borderLeft:   '1px solid #808080',
                  borderRight:  '1px solid #ffffff',
                  borderBottom: '1px solid #ffffff',
                  padding: '1px 6px',
                  fontSize: '11px',
                }}
              >
                C:\Portfolio\FeaturedProjects
              </div>
              <span
                style={{
                  padding: '2px 12px',
                  backgroundColor: '#d4d0c8',
                  borderTop:    '2px solid #ffffff',
                  borderLeft:   '2px solid #ffffff',
                  borderRight:  '2px solid #404040',
                  borderBottom: '2px solid #404040',
                  fontSize: '11px',
                  cursor: 'pointer',
                }}
              >
                Go
              </span>
            </div>

            {/* Projects grid */}
            <div
              style={{
                padding: '16px',
                backgroundColor: '#f0ece0',
                borderTop:    '2px solid #808080',
                borderLeft:   '2px solid #808080',
                margin: '8px',
                borderRight:  '2px solid #ffffff',
                borderBottom: '2px solid #ffffff',
                minHeight: '200px',
              }}
            >
              {projects.length === 0 ? (
                <div
                  style={{
                    textAlign: 'center',
                    padding: '40px',
                    fontSize: '11px',
                    color: '#808080',
                    fontStyle: 'italic',
                  }}
                >
                  No featured projects found. This folder is empty.
                </div>
              ) : (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '16px',
                  }}
                >
                  {projects.map((project: any) => (
                    <ProjectCard key={project._id} project={project} />
                  ))}
                </div>
              )}
            </div>

            {/* Status bar */}
            <div
              style={{
                backgroundColor: '#d4d0c8',
                borderTop: '1px solid #808080',
                padding: '2px 8px',
                fontSize: '11px',
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', gap: '8px' }}>
                <span
                  style={{
                    borderTop:    '1px solid #808080',
                    borderLeft:   '1px solid #808080',
                    borderRight:  '1px solid #ffffff',
                    borderBottom: '1px solid #ffffff',
                    padding: '0 6px',
                  }}
                >
                  {projects.length} object(s)
                </span>
              </div>
              <Link
                href="/projects"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '2px 12px',
                  fontSize: '11px',
                  fontFamily: WIN_FONT,
                  textDecoration: 'none',
                  backgroundColor: '#d4d0c8',
                  color: '#000000',
                  borderTop:    '2px solid #ffffff',
                  borderLeft:   '2px solid #ffffff',
                  borderRight:  '2px solid #404040',
                  borderBottom: '2px solid #404040',
                }}
              >
                View All Projects &gt;
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Skills />
    </>
  );
}
