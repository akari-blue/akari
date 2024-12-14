import { Debug } from './Debug';
export const NotImplementedBox = ({ type, data }: { type: string; data: unknown }) => (
  <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg mb-3">
    NOT IMPLEMENTED: {type}
    <Debug value={data} />
  </div>
);
