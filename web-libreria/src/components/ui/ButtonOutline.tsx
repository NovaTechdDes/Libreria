"use client";
interface Props {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export const ButtonOutline = ({
  text,
  onClick,
  disabled,
  className = "",
}: Props) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`bg-slate-50 px-4 py-2 border-2 border-black rounded-md hover:bg-slate-200 text-slate-800 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {text}
    </button>
  );
};
