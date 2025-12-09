interface TextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const TextInput = ({ label, value, onChange }: TextInputProps) => {
  return (
    <div className="my-4">
      <label className="block text-lg font-medium mb-1" htmlFor={label}>
        {label}
      </label>
      <input
        id={label}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 rounded-md bg-gray-200 dark:bg-gray-700 border-transparent focus:border-blue-500 focus:ring-blue-500"
      />
    </div>
  );
};

export default TextInput;
