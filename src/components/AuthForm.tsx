'use client';

import { useState } from 'react';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function AuthForm({ type = 'login' }: { type: 'login' | 'signup' }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleAuth = async () => {
    try {
      if (type === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      router.push('/dashboard');
    } catch (err) {
      alert('Authentication failed');
      console.error(err);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">{type === 'login' ? 'Login' : 'Sign Up'}</h1>
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border mb-2"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 border mb-4"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleAuth} className="bg-blue-500 text-white w-full py-2 rounded">
        {type === 'login' ? 'Login' : 'Sign Up'}
      </button>
    </div>
  );
}
