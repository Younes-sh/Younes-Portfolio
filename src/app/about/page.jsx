'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('bio');

  const stats = [
    { label: 'Years Experience', value: '4+' },
    { label: 'Projects Completed', value: '15+' },
    { label: 'Happy Clients', value: '12+' },
    { label: 'Technologies', value: '10+' },
  ];

  const skills = {
    frontend: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux', 'Framer Motion'],
    backend: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'REST API', 'GraphQL'],
    tools: ['Git', 'Docker', 'VSCode', 'Figma', 'Postman', 'Vercel'],
  };

  return (
    <div className="min-h-screen py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            About Me
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get to know me, my journey, and what drives me to create exceptional digital experiences
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Image Section */}
            <div className="relative group">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 p-1">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 rounded-2xl" />
                <Image
                  src="/assets/younes-3.jpeg"
                  alt="Profile"
                  fill
                  className="object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
              
              {/* Floating Badges */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4 animate-bounce-slow">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium">Available for work</span>
                </div>
              </div>
              <div className="absolute -top-6 -left-6 bg-blue-600 text-white rounded-xl shadow-lg p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">4+</div>
                  <div className="text-xs">Years</div>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div>
              {/* Tabs */}
              <div className="flex gap-4 border-b border-gray-200 mb-6">
                {['bio', 'skills', 'journey'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-lg font-medium transition-colors relative ${
                      activeTab === tab
                        ? 'text-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    {activeTab === tab && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                    )}
                  </button>
                ))}
              </div>

              {/* Bio Tab */}
              {activeTab === 'bio' && (
                <div className="space-y-6 animate-fadeIn">
                  <h3 className="text-2xl font-bold">Who Am I?</h3>
                  <p className="text-gray-600 leading-relaxed">
                    I'm a passionate Full Stack Developer with over 4 years of experience in building 
                    modern web applications. I specialize in creating responsive, user-friendly, and 
                    scalable solutions that solve real-world problems.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    My journey in tech started with a curiosity about how things work on the internet. 
                    Today, I'm dedicated to crafting exceptional digital experiences that combine 
                    beautiful design with powerful functionality.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    I believe in writing clean, maintainable code and continuously learning new technologies 
                    to stay at the forefront of web development. When I'm not coding, you can find me 
                    exploring new tech trends, contributing to open source, or enjoying a good cup of coffee.
                  </p>
                  
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                    {stats.map((stat, index) => (
                      <div key={index} className="text-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills Tab */}
              {activeTab === 'skills' && (
                <div className="space-y-8 animate-fadeIn">
                  <div>
                    <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full" />
                      Frontend Development
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {skills.frontend.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm hover:bg-blue-100 hover:scale-105 transition-all cursor-default"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full" />
                      Backend Development
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {skills.backend.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm hover:bg-green-100 hover:scale-105 transition-all cursor-default"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full" />
                      Tools & Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {skills.tools.map((tool, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm hover:bg-purple-100 hover:scale-105 transition-all cursor-default"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Journey Tab */}
              {activeTab === 'journey' && (
                <div className="space-y-8 animate-fadeIn">
                  <div className="relative pl-6 border-l-2 border-blue-200">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 bg-blue-500 rounded-full" />
                    <div className="mb-8">
                      <h4 className="font-bold text-lg">Senior Full Stack Developer</h4>
                      <p className="text-sm text-blue-600 mb-2">2023 - Present</p>
                      <p className="text-gray-600">
                        Leading frontend development for enterprise applications, mentoring junior developers,
                        and architecting scalable solutions using Next.js and Node.js.
                      </p>
                    </div>
                    
                    <div className="absolute -left-[9px] top-32 w-4 h-4 bg-blue-400 rounded-full" />
                    <div className="mb-8">
                      <h4 className="font-bold text-lg">Full Stack Developer</h4>
                      <p className="text-sm text-blue-600 mb-2">2021 - 2023</p>
                      <p className="text-gray-600">
                        Developed and maintained multiple full-stack applications, improved performance by 40%,
                        and collaborated with cross-functional teams to deliver high-quality products.
                      </p>
                    </div>
                    
                    <div className="absolute -left-[9px] top-64 w-4 h-4 bg-blue-300 rounded-full" />
                    <div>
                      <h4 className="font-bold text-lg">Frontend Developer Intern</h4>
                      <p className="text-sm text-blue-600 mb-2">2020 - 2021</p>
                      <p className="text-gray-600">
                        Started my journey building responsive websites, learning modern frameworks like React,
                        and contributing to open-source projects.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Contact Button */}
              <div className="mt-10 pt-6 border-t border-gray-100">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-all duration-300 group"
                >
                  Let's Work Together
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}