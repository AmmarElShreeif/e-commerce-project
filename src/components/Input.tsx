import React from "react";

interface InputType {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ label, type, value, onChange }: InputType) => {
  return (
    <div>
      <label className={"block text-sm font-semibold text-primary-100"}>
        {label}
      </label>

      <input
        type={type}
        value={value}
        required
        onChange={onChange}
        className="mt-1 w-full p-2 rounded-md border outline-none border-primary-200 bg-white text-sm text-gray-700 shadow-sm"
      />
    </div>
  );
};

export default Input;
