import { createLazyFileRoute } from '@tanstack/react-router';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { LoginForm } from '../components/LoginForm';

export const Route = createLazyFileRoute('/login')({
  component: Login,
});

export function Login() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">Welcome to Bluesky</h1>
      <ErrorBoundary>
        <LoginForm />
      </ErrorBoundary>
    </div>
  );
}
