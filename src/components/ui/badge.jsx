import React from "react";

export function Badge({ variant = "default", className = "", ...props }) {
  const base =
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium";

  const variants = {
    default: "bg-gray-900 text-white border-transparent",
    outline: "bg-transparent text-gray-900 border-gray-300",
    success: "bg-emerald-100 text-emerald-800 border-transparent",
    warning: "bg-amber-100 text-amber-800 border-transparent",
    destructive: "bg-red-100 text-red-800 border-transparent",
  };

  const classes = `${base} ${
    variants[variant] || variants.default
  } ${className}`;

  return <span className={classes} {...props} />;
}
