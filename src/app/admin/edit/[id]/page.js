'use client';
import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import AdminGuard from '../../../../../components/AdminGuard/AdminGuard';
import Image from 'next/image';

function EditProjectPanel({ params }) {
  // ۱. آنباکس کردن پارامترها
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false); // متغیر برای وضعیت آپلود
  const [imageFile, setImageFile] = useState(null); // برای نگه داشتن فایل جدید تصویر
  
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

  // ۲. دریافت اطلاعات پروژه قدیمی برای نمایش در فرم
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/${id}`);
        if (!res.ok) throw new Error('پروژه پیدا نشد');
        const data = await res.json();
        
        setFormData({
          ...data,
          technologies: data.technologies ? data.technologies.join(', ') : '',
        });
      } catch (error) {
        console.error("خطا در fetch:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  // ۳. تعریف تابع handleSubmit که قبلاً جایش خالی بود
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      let finalImageUrl = formData.imageUrl;

      // اگر کاربر فایل جدیدی انتخاب کرده باشد
      if (imageFile) {
        const uploadData = new FormData();
        uploadData.append('image', imageFile);
        const res = await fetch('/api/upload', { method: 'POST', body: uploadData });
        const result = await res.json();
        finalImageUrl = result.url;
      }

      const updatedProject = {
        ...formData,
        technologies: formData.technologies.split(',').map(t => t.trim()),
        imageUrl: finalImageUrl,
      };

      const res = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProject),
      });

      if (res.ok) {
        alert('پروژه با موفقیت بروزرسانی شد');
        router.push('/admin');
        router.refresh();
      } else {
        alert('خطا در ذخیره تغییرات');
      }
    } catch (error) {
      alert('خطا: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <div className="p-20 text-center">در حال بارگذاری...</div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Project</h1>
        
        {/* حالا handleSubmit تعریف شده است و خطا نمی‌دهد */}
        <form onSubmit={handleSubmit} className="space-y-6 text-gray-700">
  {/* عنوان پروژه */}
  <div>
    <label className="block font-medium mb-1 text-gray-900">Title</label>
    <input
      type="text"
      required
      value={formData.title}
      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
    />
  </div>

  {/* توضیحات کوتاه */}
  <div>
    <label className="block font-medium mb-1 text-gray-900">Short Description</label>
    <textarea
      required
      rows="2"
      value={formData.description}
      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
      className="w-full border rounded-lg px-4 py-2"
    />
  </div>

  {/* توضیحات کامل */}
  <div>
    <label className="block font-medium mb-1 text-gray-900">Full Description (Long)</label>
    <textarea
      required
      rows="5"
      value={formData.longDescription}
      onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
      className="w-full border rounded-lg px-4 py-2"
    />
  </div>

  {/* تکنولوژی‌ها */}
  <div>
    <label className="block font-medium mb-1 text-gray-900">Technologies (separate with comma)</label>
    <input
      type="text"
      placeholder="React, Next.js, Tailwind..."
      value={formData.technologies}
      onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
      className="w-full border rounded-lg px-4 py-2"
    />
  </div>

  {/* لینک‌ها در یک ردیف */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <label className="block font-medium mb-1 text-gray-900">Live Demo URL</label>
      <input
        type="url"
        value={formData.liveUrl}
        onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
        className="w-full border rounded-lg px-4 py-2"
      />
    </div>
    <div>
      <label className="block font-medium mb-1 text-gray-900">GitHub URL</label>
      <input
        type="url"
        value={formData.githubUrl}
        onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
        className="w-full border rounded-lg px-4 py-2"
      />
    </div>
  </div>

  {/* وضعیت پروژه ویژه (Featured) */}
  <div className="flex items-center gap-2">
    <input
      type="checkbox"
      id="featured"
      checked={formData.featured}
      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
      className="w-5 h-5 cursor-pointer"
    />
    <label htmlFor="featured" className="font-medium text-gray-900 cursor-pointer">
      Show as Featured Project
    </label>
  </div>

  {/* بخش تصویر */}
  <div>
    <label className="block font-medium mb-1 text-gray-900">Project Image</label>
    {formData.imageUrl && !imageFile && (
      <div className="mb-3 relative h-48 w-full border rounded-lg bg-gray-50 overflow-hidden">
        <Image 
          src={formData.imageUrl} 
          alt="Current" 
          fill 
          className="object-contain" 
        />
      </div>
    )}
    <input
      type="file"
      accept="image/*"
      onChange={(e) => setImageFile(e.target.files[0])}
      className="w-full border rounded-lg px-4 py-2"
    />
    <p className="text-xs text-gray-500 mt-1">Leave empty to keep the current image.</p>
  </div>

  {/* دکمه‌ها */}
  <div className="flex gap-4 pt-4">
    <button
      type="submit"
      disabled={uploading}
      className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 disabled:bg-gray-400 transition"
    >
      {uploading ? 'Saving Changes...' : 'Update Project'}
    </button>
    <button
      type="button"
      onClick={() => router.push('/admin')}
      className="flex-1 bg-gray-100 text-gray-800 py-3 rounded-lg font-bold hover:bg-gray-200 transition"
    >
      Cancel
    </button>
  </div>
</form>
      </div>
    </div>
  );
}

// کامپوننت اصلی برای خروجی صفحه
export default function EditPage({ params }) {
  return (
    <AdminGuard>
      <EditProjectPanel params={params} />
    </AdminGuard>
  );
}