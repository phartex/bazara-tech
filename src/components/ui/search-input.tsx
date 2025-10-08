"use client"

import Image from "next/image";

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Search in service request",
  value,
  onChange,
  onSubmit
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="relative flex items-center w-full max-w-lg mx-auto rounded-lg shadow-sm border border-gray-300 focus-within:border-blue-500"
    >
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Image src={"/images/icons/search.svg"} width={16} height={16} alt="search" />
      </div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full py-2 pl-10 pr-16 text-sm text-gray-900 placeholder-gray-500  bg-white rounded-lg focus:outline-none focus:ring-0"
      />
     
    </form>
  );
};

export default SearchInput;
