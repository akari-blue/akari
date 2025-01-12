import error2json from '@stdlib/error-to-json';
import { TFunction } from 'i18next';
import { Component, ErrorInfo, ReactNode } from 'react';
import { withTranslation } from 'react-i18next';
import { Button } from './ui/button';

type Props = {
  children: ReactNode;
  fallback?: ReactNode;
  t: TFunction<['error'], undefined>;
};

type State = {
  hasError: boolean;
  error?: Error;
};

class ErrorBoundaryInner extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    const t = this.props.t;
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex flex-col items-center justify-center bg-background w-full">
            <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">{t('somethingWentWrong')}</h1>
            <pre className="text-gray-600 dark:text-gray-300 max-w-full overflow-x-auto">
              {this.state.error
                ? JSON.stringify(error2json(this.state.error), null, 2)
                    .split('\n')
                    .map((item, index) => (
                      <span key={index}>
                        {item}
                        <br />
                      </span>
                    ))
                : 'An unexpected error occurred'}
            </pre>
            <div className="flex items-center justify-end w-full">
              <Button
                variant="outline"
                // reload the component
                onClick={() => this.setState({ hasError: false })}
              >
                {t('reloadComponent')}
              </Button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export const ErrorBoundary = withTranslation()(ErrorBoundaryInner);
