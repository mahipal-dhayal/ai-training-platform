'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await auth.signOut();
    router.push('/login');
  };

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <Link href="/" className="text-xl font-bold text-blue-600">
        🤖 Comply AI Training
      </Link>

      {!loading && (
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link href="/dashboard" className="hover:text-blue-600">
                Dashboard
              </Link>
              <Link href="/certificate" className="hover:text-blue-600">
                Certificate
              </Link>
              {/* <span className="text-sm text-gray-600 hidden sm:inline">{user.email}</span> */}
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
