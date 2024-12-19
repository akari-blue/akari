import { createLazyFileRoute } from '@tanstack/react-router';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { LoginForm } from '../components/LoginForm';

export const Route = createLazyFileRoute('/login')({
  component: Login,
});

export function Login() {
  return (
    <div className="flex flex-col items-center justify-center">
      <ErrorBoundary>
        <LoginForm />
      </ErrorBoundary>
    </div>
  );
}
