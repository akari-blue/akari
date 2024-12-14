type ToggleSwitchProps = {
  on: boolean;
  setOn: (on: boolean) => void;
  label: string;
};

export const ToggleSwitch = ({ on, setOn, label }: ToggleSwitchProps) => {
  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={() => setOn(!on)}
        className={`w-16 h-8 rounded-lg p-1 cursor-pointer transition-colors duration-300 ease-in-out relative ${
          on ? 'bg-gray-200' : 'bg-gray-700'
        }`}
        aria-label={label}
      >
        <div
          className={`w-6 h-6 rounded-md bg-black shadow-md absolute top-1 transform transition-transform duration-300 ease-in-out ${
            on ? 'translate-x-8' : 'translate-x-0'
          }`}
        />
      </button>
      {label && <span className="text-white">{label}</span>}
    </div>
  );
};
