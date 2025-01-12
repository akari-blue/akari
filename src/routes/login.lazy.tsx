import { createLazyFileRoute } from '@tanstack/react-router';
import { ErrorBoundary } from '../components/error-boundary';
import { LoginForm } from '../components/login-form';

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
