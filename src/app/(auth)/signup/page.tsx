import AuthForm from '@/components/AuthForm';
import Link from 'next/link';

export default function SignupPage() {
  return (
    <div className="p-6">
      <AuthForm type="signup" />
      <p className="text-center mt-4 text-sm text-gray-600">
        Already have an account?{' '}
        <Link href="/login" className="text-blue-600 underline">
          Login here
        </Link>
      </p>
    </div>
  );
}
