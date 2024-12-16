export function Badge({ children, title }: { children: React.ReactNode; title: string }) {
  if (!children) return null;
  return (
    <div className="flex items-center">
      <span title={title} className="bg-neutral-800 text-white p-1 text-xs rounded-md">
        {children}
      </span>
    </div>
  );
}
