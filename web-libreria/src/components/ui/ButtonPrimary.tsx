"use client";

interface Props {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export const ButtonPrimary = ({
  text,
  onClick,
  disabled,
  className = "",
}: Props) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/80 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {text}
    </button>
  );
};
