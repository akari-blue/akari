export const FormattedNumber = ({
  value,
  unit,
  notation = 'compact',
  prefix = '',
}: {
  value: number | undefined | null;
  unit?: string;
  notation?: 'compact' | 'standard';
  prefix?: string;
}) => {
  if (value === undefined || value === null) return null;

  const formattedValue = new Intl.NumberFormat(navigator.languages ?? 'en-US').format(value);
  const compactValue = new Intl.NumberFormat(navigator.languages ?? 'en-US', { notation }).format(value);

  return (
    <span title={`${prefix}${formattedValue} ${unit}`}>
      {prefix}
      {compactValue} {unit}
    </span>
  );
};
