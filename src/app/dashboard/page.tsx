"use client";

import { useEffect, useState } from "react";
import ModuleCard from "@/components/ModuleCard";
import { getIdToken } from "firebase/auth";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface Module {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  pptUrl: string;
}

export default function DashboardPage() {
  const [modules, setModules] = useState<Module[]>([]);
  const [completed, setCompleted] = useState<string[]>([]);
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.push("/login");
      return;
    }

    async function fetchData() {
      const token = await getIdToken(user!);

      const moduleRes = await fetch("https://ai-training-backend-comply-production.up.railway.app/api/modules");
      const modulesData: Module[] = await moduleRes.json();
      setModules(modulesData);

      const progressRes = await fetch("https://ai-training-backend-comply-production.up.railway.app/api/progress", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (progressRes.ok) {
        const progress = await progressRes.json();
        setCompleted(progress.completedModules);
      }
    }

    fetchData();
  }, [user, loading]);

  // ✅ Calculate progress percent here, in component scope
  const progressPercent = modules.length
    ? Math.round((completed.length / modules.length) * 100)
    : 0;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Your Training Modules</h1>

      {/* ✅ Progress Bar */}
      <div className="mb-6">
        <div className="text-xl font-semibold text-gray-700 mb-2">
          Progress: {completed.length} / {modules.length} modules completed
        </div>
        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* ✅ Module Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => (
          <ModuleCard
            key={module.id}
            module={{
              ...module,
              completed: completed.includes(module.id),
            }}
          />
        ))}
        {/* ✅ Certificate Button */}
        {progressPercent === 100 && (
          <div className="mt-4">
            <a
              href="/certificate"
              className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
            >
              🎓 Download Certificate
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
