import AuthForm from '@/components/AuthForm';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="p-6">
      <AuthForm type="login" />
      <p className="text-center mt-4 text-sm text-gray-600">
        New here?{' '}
        <Link href="/signup" className="text-blue-600 underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
