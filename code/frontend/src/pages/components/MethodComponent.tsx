import React from 'react';
import { IoIosAddCircle, IoIosRemoveCircle } from 'react-icons/io';

type Method = {
  description: string;
};

type MethodComponentProps = {
  methods: Method[];
  onAddMethod: () => void;
  onRemoveMethod: (index: number) => void;
  onChange: (index: number, value: string) => void;
};

const MethodComponent = ({
  methods,
  onAddMethod,
  onRemoveMethod,
  onChange,
}: MethodComponentProps) => {
  return (
    <div>
      <h3 className="text-2xl mb-2">Preparation Methods</h3>
      <hr className="h-px mb-2 bg-darkBlue border-0"/>
      {methods.map((method, index) => (
        <div key={index} className="mb-2">
          <textarea
            value={method.description}
            onChange={(e) => onChange(index, e.target.value)}
            placeholder={`Step ${index + 1}`}
            className="p-2 px-1 w-full rounded-md"
          />
          <button
            type="button"
            onClick={() => onRemoveMethod(index)}
            className="bg-red-500 text-white px-4 py-2 rounded-md w-full flex items-center justify-center"
          >
            <IoIosRemoveCircle />
            <p className="px-2">Remove</p>
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={onAddMethod}
        className="mb-2 w-full bg-green-500 text-white px-4 py-2 rounded-md flex items-center justify-center"
      >
        <IoIosAddCircle />
        <p className="px-2">Add Method</p>
      </button>
    </div>
  );
};

export default MethodComponent;
