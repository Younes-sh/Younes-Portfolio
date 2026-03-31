'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminGuard from '../../../components/AdminGuard/AdminGuard';
import Image from 'next/image';

function AdminPanel() {
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('projects'); // 'projects' or 'messages'
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    longDescription: '',
    technologies: '',
    imageUrl: '',
    liveUrl: '',
    githubUrl: '',
    featured: false,
  });
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchProjects();
    fetchMessages();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/contact', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setMessages(data.messages);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      return data.url;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const createSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      let imageUrl = formData.imageUrl;

      if (imageFile) {
        console.log('Uploading image...');
        imageUrl = await handleImageUpload(imageFile);
        console.log('Image uploaded:', imageUrl);
      }

      const projectData = {
        title: formData.title,
        description: formData.description,
        longDescription: formData.longDescription,
        technologies: formData.technologies.split(',').map(t => t.trim()),
        imageUrl: imageUrl,
        liveUrl: formData.liveUrl,
        githubUrl: formData.githubUrl,
        featured: formData.featured,
        slug: createSlug(formData.title),
      };
      
      console.log('Sending project data:', projectData);

      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      const responseData = await res.json();
      console.log('Response status:', res.status);
      console.log('Response data:', responseData);

      if (res.ok) {
        // Reset form
        setFormData({
          title: '',
          description: '',
          longDescription: '',
          technologies: '',
          imageUrl: '',
          liveUrl: '',
          githubUrl: '',
          featured: false,
        });
        setImageFile(null);
        fetchProjects();
        alert('Project added successfully!');
      } else {
        console.error('Error response:', responseData);
        alert(responseData.message || 'Error adding project');
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('Error: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        const res = await fetch(`/api/projects/${id}`, {
          method: 'DELETE',
        });

        if (res.ok) {
          fetchProjects();
          alert('Project deleted successfully');
        }
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Error deleting project');
      }
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'read' }),
      });
      if (res.ok) {
        fetchMessages();
      }
    } catch (error) {
      console.error('Error marking message:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b">
        <button
          onClick={() => setActiveTab('projects')}
          className={`px-6 py-2 text-lg font-medium transition-colors ${
            activeTab === 'projects'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Projects
        </button>
        <button
          onClick={() => setActiveTab('messages')}
          className={`px-6 py-2 text-lg font-medium transition-colors ${
            activeTab === 'messages'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Messages
          {messages.filter(m => m.status === 'unread').length > 0 && (
            <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {messages.filter(m => m.status === 'unread').length}
            </span>
          )}
        </button>
      </div>

      {/* Projects Tab */}
      {activeTab === 'projects' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add Project Form */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Add New Project</h2>
            <form onSubmit={handleSubmit} className="space-y-4 text-gray-700">
              <div>
                <label className="block text-sm font-medium mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Project title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Short Description *</label>
                <textarea
                  required
                  rows="2"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief description of the project"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Full Description *</label>
                <textarea
                  required
                  rows="4"
                  value={formData.longDescription}
                  onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Detailed description of the project"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Technologies (comma separated) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  placeholder="React, Next.js, MongoDB, Tailwind"
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Image *</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="w-full border rounded-lg px-3 py-2"
                />
                {formData.imageUrl && (
                  <div className="mt-2 relative h-32 w-full">
                    <Image
                      src={formData.imageUrl}
                      alt="Preview"
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Live URL</label>
                <input
                  type="url"
                  value={formData.liveUrl}
                  onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                  placeholder="https://example.com"
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">GitHub URL</label>
                <input
                  type="url"
                  value={formData.githubUrl}
                  onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                  placeholder="https://github.com/username/repo"
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="mr-2 w-4 h-4"
                />
                <label htmlFor="featured" className="text-sm font-medium">
                  Featured Project (show on homepage)
                </label>
              </div>

              <button
                type="submit"
                disabled={uploading}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
              >
                {uploading ? 'Uploading...' : 'Add Project'}
              </button>
            </form>
          </div>

          {/* Projects List */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Existing Projects</h2>
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {projects.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No projects yet. Add your first project!</p>
              ) : (
                projects.map((project) => (
                  <div key={project._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-800">{project.title}</h3>
                        <p className="text-gray-600 text-sm mt-1">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {project.technologies.slice(0, 3).map((tech, idx) => (
                            <span key={idx} className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              +{project.technologies.length - 3}
                            </span>
                          )}
                        </div>
                        {project.featured && (
                          <span className="inline-block mt-2 text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded">
                            ★ Featured
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => router.push(`/admin/edit/${project._id}`)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(project._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Messages Tab */}
      {activeTab === 'messages' && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Contact Messages</h2>
          <div className="space-y-4">
            {messages.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No messages yet</p>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${
                    msg.status === 'unread' ? 'bg-blue-50 border-blue-200' : 'bg-white'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-gray-800">{msg.name}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          msg.status === 'unread' ? 'bg-red-100 text-red-600' :
                          msg.status === 'read' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-green-100 text-green-600'
                        }`}>
                          {msg.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{msg.email}</p>
                      <p className="font-medium text-gray-800 mt-3">{msg.subject}</p>
                      <p className="text-gray-600 mt-2 whitespace-pre-wrap">{msg.message}</p>
                      <p className="text-xs text-gray-400 mt-3">
                        {new Date(msg.createdAt).toLocaleString()}
                      </p>
                      {msg.ipAddress && msg.ipAddress !== 'unknown' && (
                        <p className="text-xs text-gray-400 mt-1">IP: {msg.ipAddress}</p>
                      )}
                    </div>
                    {msg.status === 'unread' && (
                      <button
                        onClick={() => handleMarkAsRead(msg._id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors ml-4"
                      >
                        Mark as Read
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminPage() {
  return (
    <AdminGuard>
      <AdminPanel />
    </AdminGuard>
  );
}