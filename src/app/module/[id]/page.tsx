'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getIdToken } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Link from 'next/link';

interface Module {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  pptUrl: string;
}

const moduleOrder = ['ai', 'ai-insurance', 'ai-compliance', 'ethical-ai', 'future-of-ai'];

export default function ModulePage() {
  const { id } = useParams();
  const [module, setModule] = useState<Module | null>(null);

  useEffect(() => {
    async function fetchModule() {
      const res = await fetch(`https://ai-training-backend-comply-production.up.railway.app/api/modules`);
      const data: Module[] = await res.json();
      const matched = data.find((m) => m.id === id);
      setModule(matched || null);
    }

    fetchModule();
  }, [id]);

  const handleMarkComplete = async () => {
    const user = auth.currentUser;
    if (!user) return alert('Please login first');

    const token = await getIdToken(user);

    const res = await fetch('https://ai-training-backend-comply-production.up.railway.app/api/progress/complete', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ moduleId: id }),
    });

    if (res.ok) {
      alert('✅ Marked as complete!');
    } else {
      alert('❌ Error marking as complete.');
    }
  };

  if (!module) return <div className="p-8">Loading...</div>;

  // 🧭 Navigation logic
  const currentIndex = moduleOrder.indexOf(id as string);
  const prevId = currentIndex > 0 ? moduleOrder[currentIndex - 1] : null;
  const nextId = currentIndex < moduleOrder.length - 1 ? moduleOrder[currentIndex + 1] : null;

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">{module.title}</h1>
      <p className="text-gray-700">{module.description}</p>

      <div className="aspect-video">
        <iframe
          src={module.videoUrl}
          title={module.title}
          width="100%"
          height="100%"
          allowFullScreen
        />
      </div>

      <a
        href={module.pptUrl}
        target="_blank"
        className="inline-block bg-green-600 text-white px-4 py-2 rounded"
      >
        📥 Download PPT
      </a>

      <button
        onClick={handleMarkComplete}
        className="block mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        ✅ Mark as Complete
      </button>

      {/* 🧭 Navigation Buttons */}
      <div className="flex justify-between mt-10">
        {prevId ? (
          <Link
            href={`/module/${prevId}`}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            ← Previous
          </Link>
        ) : <div />}

        {nextId ? (
          <Link
            href={`/module/${nextId}`}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Next →
          </Link>
        ) : <div />}
      </div>
    </div>
  );
}
