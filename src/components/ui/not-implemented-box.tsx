import { useTranslation } from 'react-i18next';
import { Debug } from './debug';
export const NotImplementedBox = ({ type, data }: { type: string; data?: unknown }) => {
  const { t } = useTranslation('debug');
  return (
    <div className="p-4 text-center border border-neutral-200 dark:border-neutral-800 rounded-lg shadow">
      {t('notImplemented', { value: type })}
      {Boolean(data) && <Debug value={data} />}
    </div>
  );
};
