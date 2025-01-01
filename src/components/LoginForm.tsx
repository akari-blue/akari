import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../lib/bluesky/hooks/useAuth';
import { HandleInput } from './ui/HandleInput';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';

type LoginFormData = {
  handle: string;
  password: string;
  authFactorToken?: string;
};

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
    <form onSubmit={handleSubmit(onSubmit)} className="p-2">
      <div className="flex flex-col gap-2 w-[550px]">
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
          <Input id="password" type="password" {...register('password', { required: 'Password is required' })} />
          {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
        </div>

        {error &&
          (error?.message === 'A sign in code has been sent to your email address' ||
          error?.message === 'Token is invalid' ? (
            <div>
              <Label htmlFor="authFactorToken">{t('authFactorToken')}</Label>
              <Input
                id="authFactorToken"
                type="text"
                {...register('authFactorToken', { required: 'Two-factor token is required' })}
              />
              {errors.authFactorToken && <p className="mt-1 text-sm text-red-500">{errors.authFactorToken?.message}</p>}
            </div>
          ) : (
            <p className="text-red-500 text-sm">{error.message}</p>
          ))}

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? t('login.pending') : t('login.default')}
        </Button>
      </div>
    </form>
  );
}
