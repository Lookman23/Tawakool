import React from "react";

export function Dialog({ open, onOpenChange, children }) {
  if (!open) return null;

  const handleOverlayClick = () => {
    if (onOpenChange) onOpenChange(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={handleOverlayClick}
    >
      <div
        className="bg-white rounded-lg shadow-lg max-w-lg w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export function DialogTrigger({ asChild, children, ...props }) {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, props);
  }
  return (
    <button type="button" {...props}>
      {children}
    </button>
  );
}

export function DialogContent({ className = "", ...props }) {
  return (
    <div className={`p-4 sm:p-6 ${className}`} {...props} />
  );
}

export function DialogHeader({ className = "", ...props }) {
  return (
    <div className={`mb-3 ${className}`} {...props} />
  );
}

export function DialogTitle({ className = "", ...props }) {
  return (
    <h2 className={`text-lg font-semibold leading-none mb-1 ${className}`} {...props} />
  );
}

export function DialogDescription({ className = "", ...props }) {
  return (
    <p className={`text-sm text-gray-600 ${className}`} {...props} />
  );
}

export function DialogFooter({ className = "", ...props }) {
  return (
    <div
      className={`mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end ${className}`}
      {...props}
    />
  );
}
