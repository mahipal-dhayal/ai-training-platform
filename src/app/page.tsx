import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-col sm:flex-row"></div>
        <h1 className="text-4xl font-bold text-center sm:text-left">
          Welcome to the Comply AI Training Platform
        </h1>
        <p className="text-lg text-gray-700 text-center sm:text-left">
          Enhance your skills with our comprehensive AI training modules.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/dashboard" className="bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700 transition-colors">
            Go to Dashboard
          </Link>
          <Link href="/certificate" className="bg-green-600 text-white px-6 py-3 rounded shadow hover:bg-green-700 transition-colors">
            View Certificate
          </Link>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <p>© {new Date().getFullYear()} Mahipal Dhayal & Ai Training. All rights reserved.</p>
      </footer>
    </div>
  );
}
