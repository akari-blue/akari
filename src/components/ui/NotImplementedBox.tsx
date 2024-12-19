import { useTranslation } from 'react-i18next';
import { Debug } from './Debug';
export const NotImplementedBox = ({ type, data }: { type: string; data: unknown }) => {
  const { t } = useTranslation('debug');
  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg mb-3">
      {t('notImplemented', { value: type })}
      <Debug value={data} />
    </div>
  );
};
