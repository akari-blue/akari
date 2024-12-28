import { useTranslation } from 'react-i18next';

export const Loading = () => {
  const { t } = useTranslation('app');
  return <div className="text-center py-8 text-gray-600 dark:text-gray-400">{t('loading')}</div>;
};
