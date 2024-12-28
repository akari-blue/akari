import { useTranslation } from 'react-i18next';

export const NotFound = () => {
  const { t } = useTranslation('app');
  return <div className="text-center py-8 text-gray-600 dark:text-gray-400">{t('notFound')}</div>;
};
