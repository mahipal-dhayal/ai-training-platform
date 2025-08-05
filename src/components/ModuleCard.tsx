import Link from 'next/link';

interface Module {
  id: string;
  title: string;
  description: string;
  completed?: boolean;
}

export default function ModuleCard({ module }: { module: Module }) {
  return (
    <Link href={`/module/${module.id}`}>
      <div className="border p-4 rounded-lg shadow hover:shadow-md transition-all">
        <h2 className="text-xl font-bold">{module.title}</h2>
        <p className="text-gray-600 mb-2">{module.description}</p>
        <span
          className={`inline-block px-2 py-1 rounded text-sm ${
            module.completed
              ? 'bg-green-100 text-green-700'
              : 'bg-yellow-100 text-yellow-700'
          }`}
        >
          {module.completed ? '✅ Completed' : '⏳ In Progress'}
        </span>
      </div>
    </Link>
  );
}
