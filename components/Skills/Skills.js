'use client';

import { useInView } from 'react-intersection-observer';

const skills = [
  { name: 'React.js', level: 90, icon: '⚛️' },
  { name: 'Next.js', level: 85, icon: '▲' },
  { name: 'Node.js', level: 85, icon: '💚' },
  { name: 'TypeScript', level: 80, icon: '📘' },
  { name: 'MongoDB', level: 85, icon: '🍃' },
  { name: 'Tailwind CSS', level: 90, icon: '🎨' },
  { name: 'GraphQL', level: 75, icon: '📊' },
  { name: 'Python', level: 70, icon: '🐍' },
  { name: 'Docker', level: 30, icon: '🐳' },
  { name: 'AWS', level: 25, icon: '☁️' },
  { name: 'Git', level: 85, icon: '🔧' },
  {name: 'Vercel', level: 90, icon: '🚀'},
  {name: 'Netlify', level: 80, icon: '🌐'},
  {name: 'linux', level: 70, icon: '🐧'},
  {name: 'Redux', level: 80, icon: '🔄'},
  {name: 'Sass', level: 75, icon: '💅'},
  {name: 'Webpack', level: 65, icon: '📦'},
  {name: 'Babel', level: 60, icon: '🔧'},
  {name: 'ESLint', level: 80, icon: '🧹'},
  {name: 'Prettier', level: 85, icon: '🎨'},
  {name:'github', level: 90, icon: '🐙'},
  {name:'cloudinary', level: 80, icon: '☁️'},
];

export default function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-24 bg-gray-50 text-gray-900" id="skills">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Technical Skills</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Technologies and tools I work with to bring ideas to life
          </p>
        </div>

        <div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto text-gray-600"
        >
          {skills.map((skill, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                inView ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl mb-4">{skill.icon}</div>
              <h3 className="text-xl font-bold mb-3">{skill.name}</h3>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block text-blue-600">
                      Proficiency
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-blue-600">
                      {skill.level}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 text-xs flex rounded-full bg-gray-200">
                  <div
                    style={{ width: `${inView ? skill.level : 0}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-1000 ease-out"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}