import React from "react";

type EnumSelectComponentProps<T> = {
  label: string;
  value: T;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { label: string; value: T }[]; 
};

function EnumSelectComponent<T extends string | number>({
  label,
  value,
  onChange,
  options,
}: EnumSelectComponentProps<T>) {
  return (
    <div className="mb-2 mr-2 inline-block">
      <label htmlFor={label} className="block text-lightBlue font-medium">
        {label}
      </label>
      <select
        id={label}
        name={label}
        value={value}
        onChange={onChange}
        className="mt-1 py-3 px-2 block w-full text-darkBlue rounded-md focus:outline-none focus:ring-2 focus:ring-darkBlue"
        required
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default EnumSelectComponent;
