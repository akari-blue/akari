import { useState } from 'react';
import { useSettings } from '../../hooks/useSetting';

export const Debug = ({ value }: { value: unknown }) => {
  const experiments = useSettings((state) => state.experiments);
  const [open, setOpen] = useState(false);
  const onClick = () => {
    setOpen((prev) => !prev);
  };

  if (!experiments.devMode) return null;

  return (
    <div className="flex flex-col gap-2">
      <div className="w-full flex flex-row justify-end">
        <button onClick={onClick} className="mt-[-20px] h-5 ">
          👀
        </button>
      </div>
      <div>
        {open && (
          <pre className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-auto h-64">
            {JSON.stringify(value, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
};
