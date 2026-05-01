interface InputProps {
  placeholder?: string;
  inputRef?: any;
  label?: string;
  type?: string;
}

export const Input = ({
  placeholder,
  inputRef,
  label,
  type = "text",
}: InputProps) => {
  return (
    <div className=" flex flex-col gap-1.5 w-full ">
      {label && (
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-tight">
          {label}
        </label>
      )}

      <input
        ref={inputRef}
        placeholder={placeholder}
        type={type}
        className="
         w-full px-4 py-2.5
         bg-gray-50 border border-gray-200
         rounded-lg text-sm text-gray-800
         placeholder:text-gray-400
         focus:outline-none focus:bg-white focus:border-purple-400 focus:ring-2 focus:ring-purple-100
         transition-all duration-150
         
         "
      />
    </div>
  );
};