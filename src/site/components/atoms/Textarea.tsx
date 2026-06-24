import { TextareaHTMLAttributes, useId } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export function Textarea({
  label,
  className = "",
  id,
  ...props
}: TextareaProps) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label htmlFor={textareaId} className="text-sm text-foreground/80">
          {label}
          {props.required && (
            <span className="text-accent" aria-hidden="true">
              {" "}
              *
            </span>
          )}
        </label>
      )}
      <textarea
        id={textareaId}
        aria-required={props.required ? true : undefined}
        className={`px-4 py-3 bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-accent transition-all min-h-[120px] ${className}`}
        {...props}
      />
    </div>
  );
}
