import { useTranslation } from 'react-i18next';
import { Debug } from './Debug';
export const NotImplementedBox = ({ type, data }: { type: string; data?: unknown }) => {
  const { t } = useTranslation('debug');
  return (
    <div className="p-4 bg-gray-100 dark:bg-neutral-600 text-center">
      {t('notImplemented', { value: type })}
      {Boolean(data) && <Debug value={data} />}
    </div>
  );
};
