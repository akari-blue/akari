import { createLazyFileRoute } from '@tanstack/react-router';
import { ToggleSwitch } from '../components/ui/ToggleSwitch';
import { useSettings } from '../hooks/useSetting';
import { Input } from '../components/ui/Input';
import { useTranslation } from 'react-i18next';
import i18n, { languages } from '../i18n';

export const Route = createLazyFileRoute('/settings')({
  component: RouteComponent,
});

function RouteComponent() {
  const { setSettings, experiments, font, language } = useSettings();
  const { t } = useTranslation('settings');

  return (
    <div className="flex flex-col gap-4">
      <div className="border p-2">
        <ToggleSwitch
          on={experiments.devMode}
          setOn={(on) => {
            setSettings((state) => ({ experiments: { ...state.experiments, devMode: on } }));
          }}
          label={t('developerMode.name')}
        />
        <p>{t('developerMode.description')}</p>
      </div>
      <div className="border p-2">
        <ToggleSwitch
          on={experiments.streamerMode}
          setOn={(on) => setSettings((state) => ({ experiments: { ...state.experiments, streamerMode: on } }))}
          label={t('streamerMode.name')}
        />
        <p>{t('streamerMode.description')}</p>
      </div>
      <div className="border p-2">
        <ToggleSwitch
          on={experiments.zenMode}
          setOn={(on) => setSettings((state) => ({ experiments: { ...state.experiments, zenMode: on } }))}
          label={t('zenMode.name')}
        />
        <p>{t('zenMode.description')}</p>
      </div>
      <div className="border p-2">
        <div className="flex items-center space-x-4">
          <Input
            type="number"
            min="1"
            max="4"
            value={experiments.columns}
            onChange={(event) => {
              const value = parseInt(event.target.value, 10);
              setSettings((state) => ({ experiments: { ...state.experiments, columns: value } }));
            }}
          />
        </div>
        <p>{t('columns.description')}</p>
      </div>
      <div className="border p-2">
        <ToggleSwitch
          on={experiments.responsiveUI}
          setOn={(on) => setSettings((state) => ({ experiments: { ...state.experiments, responsiveUI: on } }))}
          label={t('responsiveUI.name')}
        />
        <p>{t('responsiveUI.description')}</p>
      </div>
      <div className="border p-2">
        <div className="flex items-center space-x-4">
          <select
            className="w-64 p-2 text-black"
            defaultValue={language}
            onChange={(event) => {
              const value = event.target.value as 'system' | keyof typeof languages;
              if (value === 'system') {
                i18n.changeLanguage(window.navigator.language);
                setSettings(() => ({ language: 'system' }));
              } else {
                i18n.changeLanguage(value);
                setSettings(() => ({ language: value }));
              }
            }}
          >
            <>
              {['system', ...Object.keys(languages)].map((lang) => (
                <option>{lang}</option>
              ))}
            </>
          </select>
          <label>{t('language.name')}</label>
        </div>
        <p>{t('language.description')}</p>
      </div>
      <div className="border p-2">
        <div className="flex items-center space-x-4">
          <select
            className="w-64 p-2 text-black"
            defaultValue={font.family}
            onChange={(event) => {
              const value = event.target.value as 'system' | 'OpenDyslexic' | 'Atkinson-Hyperlegible';
              setSettings((state) => ({ font: { ...state.font, family: value } }));
            }}
          >
            <>
              {['system', 'OpenDyslexic', 'Atkinson-Hyperlegible'].map((fontFamily) => (
                <option>{fontFamily}</option>
              ))}
            </>
          </select>
          <label>{t('font.family.name')}</label>
        </div>
        <p>{t('font.family.description')}</p>
      </div>
      <div className="border p-2">
        <div className="flex items-center space-x-4">
          <select
            className="w-64 p-2 text-black"
            defaultValue={font.size}
            onChange={(event) => {
              const value = event.target.value as 'system' | 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large';
              setSettings((state) => ({ font: { ...state.font, size: value } }));
            }}
          >
            <>
              {['system', 'extra-small', 'small', 'medium', 'large', 'extra-large'].map((fontName) => (
                <option>{fontName}</option>
              ))}
            </>
          </select>
          <label>{t('font.size.name')}</label>
        </div>
        <p>{t('font.size.description')}</p>
      </div>
      <div className="border p-2">
        <ToggleSwitch
          on={experiments.cleanHandles}
          setOn={(on) => setSettings((state) => ({ experiments: { ...state.experiments, cleanHandles: on } }))}
          label={t('cleanHandles.name')}
        />
        <p>{t('cleanHandles.description')}</p>
      </div>
    </div>
  );
}
