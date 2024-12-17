import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../lib/bluesky/hooks/useAuth';
import { HandleInput } from './ui/HandleInput';
import { Input } from './ui/Input';
import { Label } from './ui/Label';
import { Button } from './ui/Button';

interface LoginFormData {
  handle: string;
  password: string;
}

export function LoginForm() {
  const { t } = useTranslation(['auth', 'app']);
  const { login, isLoading, error } = useAuth();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => {
    login(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-md">
      <div>
        <Label htmlFor="handle">{t('app:blueskyHandle')}</Label>
        <Controller
          name="handle"
          control={control}
          rules={{ required: 'Handle is required' }}
          render={({ field }) => <HandleInput value={field.value || ''} onChange={field.onChange} className="mt-1" />}
        />
        {errors.handle && <p className="mt-1 text-sm text-red-500">{errors.handle.message}</p>}
      </div>

      <div>
        <Label htmlFor="password">{t('password')}</Label>
        <Input
          id="password"
          type="password"
          {...register('password', { required: 'Password is required' })}
          error={!!errors.password}
        />
        {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
      </div>

      {error && <p className="text-red-500 text-sm">{error.message}</p>}

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? t('login.pending') : t('login.default')}
      </Button>
    </form>
  );
}
