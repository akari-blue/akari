export function Badge({ children, title }: { children: React.ReactNode; title: string }) {
  if (!children) return null;
  return (
    <div className="flex items-center">
      <span title={title} className="border p-1 text-xs rounded-md">
        {children}
      </span>
    </div>
  );
}
