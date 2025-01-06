import { createLazyFileRoute } from '@tanstack/react-router';
import { ToggleSwitch } from '../components/ui/ToggleSwitch';
import { useSettings } from '../hooks/useSetting';
import { Input } from '../components/ui/input';
import { useTranslation } from 'react-i18next';
import i18n, { languageNames, languages } from '@/i18n';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/bluesky/hooks/useAuth';
import { Helmet } from 'react-helmet';
import { Moon, Sun } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useTheme } from '@/components/theme-provider/use-theme';
import { Link } from '@/components/ui/Link';
import TimeAgo from 'react-timeago-i18n';
import { StickyHeader } from '@/components/sticky-header';

export const Route = createLazyFileRoute('/settings')({
  component: RouteComponent,
});

function RouteComponent() {
  const { setSettings, experiments, font, language } = useSettings();
  const { logout, isAuthenticated } = useAuth();
  const { t } = useTranslation(['settings', 'auth', 'app']);

  return (
    <>
      <Helmet>
        <title>{t('app:settings')}</title>
      </Helmet>
      <StickyHeader>
        <h1 className="text-xl font-bold">{t('app:settings')}</h1>
      </StickyHeader>
      <div className="flex flex-col gap-4 pb-safe-or-16 md:pb-safe-or-2 divide-y">
        <div className="p-2 pt-0 border-none">
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <span>{'theme'}</span>
          </div>
        </div>
        <div className="p-2">
          <ToggleSwitch
            on={experiments.devMode}
            setOn={(on) => {
              setSettings((state) => ({ experiments: { ...state.experiments, devMode: on } }));
            }}
            label={t('developerMode.name')}
          />
          <p>{t('developerMode.description')}</p>
        </div>
        <div className="p-2">
          <ToggleSwitch
            on={experiments.streamerMode}
            setOn={(on) => setSettings((state) => ({ experiments: { ...state.experiments, streamerMode: on } }))}
            label={t('streamerMode.name')}
          />
          <p>{t('streamerMode.description')}</p>
        </div>
        <div className="p-2">
          <ToggleSwitch
            on={experiments.zenMode}
            setOn={(on) => setSettings((state) => ({ experiments: { ...state.experiments, zenMode: on } }))}
            label={t('zenMode.name')}
          />
          <p>{t('zenMode.description')}</p>
        </div>
        <div className="p-2">
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
        <div className="p-2">
          <ToggleSwitch
            on={experiments.responsiveUI}
            setOn={(on) => setSettings((state) => ({ experiments: { ...state.experiments, responsiveUI: on } }))}
            label={t('responsiveUI.name')}
          />
          <p>{t('responsiveUI.description')}</p>
        </div>
        <div className="p-2">
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
                  <option key={lang} value={lang}>
                    {languageNames[lang as keyof typeof languageNames]}
                  </option>
                ))}
              </>
            </select>
            <label>{t('language.name')}</label>
          </div>
          <p>{t('language.description')}</p>
        </div>
        <div className="p-2">
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
                  <option key={fontFamily}>{fontFamily}</option>
                ))}
              </>
            </select>
            <label>{t('font.family.name')}</label>
          </div>
          <p>{t('font.family.description')}</p>
        </div>
        <div className="p-2">
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
                  <option key={fontName}>{fontName}</option>
                ))}
              </>
            </select>
            <label>{t('font.size.name')}</label>
          </div>
          <p>{t('font.size.description')}</p>
        </div>
        <div className="p-2">
          <ToggleSwitch
            on={experiments.cleanHandles}
            setOn={(on) => setSettings((state) => ({ experiments: { ...state.experiments, cleanHandles: on } }))}
            label={t('cleanHandles.name')}
          />
          <p>{t('cleanHandles.description')}</p>
        </div>
        <div className="p-2">
          <div>
            <Link href={`https://github.com/akari-blue/akari/commit/${__COMMIT_HASH__}`}>
              {'commit: '}
              {__COMMIT_HASH__}
            </Link>
          </div>
          <div>
            {'build date: '}
            <TimeAgo date={__BUILD_DATE__} />
          </div>
          <div>
            {'version: '}
            {__APP_VERSION__}
          </div>
        </div>
        {isAuthenticated && (
          <div className="px-2 border-none">
            <Button className="w-full" onClick={logout}>
              {t('auth:logout')}
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">{'Toggle theme'}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>{'Light'}</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>{'Dark'}</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>{'System'}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
