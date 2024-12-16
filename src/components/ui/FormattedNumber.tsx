export const FormattedNumber = ({ value, unit }: { value: number | undefined | null; unit: string }) => {
  if (value === undefined || value === null) return null;

  const formattedValue = new Intl.NumberFormat('en-US').format(value);
  const compactValue = new Intl.NumberFormat('en-US', { notation: 'compact' }).format(value);

  return (
    <span title={`${formattedValue} ${unit}`}>
      {compactValue} {unit}
    </span>
  );
};
