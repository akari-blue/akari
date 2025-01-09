import { WifiOff } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useOfflineStatus } from '@/hooks/useOfflineStatus';

export const OfflineBanner = () => {
  const isOffline = useOfflineStatus();

  if (!isOffline) return null;

  return (
    <Alert
      variant="destructive"
      className="sticky top-0 left-0 right-0 z-40 rounded-none flex items-center justify-center animate-in fade-in slide-in-from-top duration-300 bg-background"
    >
      <WifiOff className="h-4 w-4" />
      <AlertDescription className="ml-2">{"You're currently offline. Some features may be unavailable."}</AlertDescription>
    </Alert>
  );
};
