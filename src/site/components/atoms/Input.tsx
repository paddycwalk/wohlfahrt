import { InputHTMLAttributes, useId } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, className = "", id, ...props }: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label htmlFor={inputId} className="text-sm text-foreground/80">
          {label}
          {props.required && (
            <span className="text-accent" aria-hidden="true">
              {" "}
              *
            </span>
          )}
        </label>
      )}
      <input
        id={inputId}
        aria-required={props.required ? true : undefined}
        className={`px-4 py-3 bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-accent transition-all ${className}`}
        {...props}
      />
    </div>
  );
}
