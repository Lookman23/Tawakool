import React from "react";

// Table très simple pour remplacer le composant shadcn/ui
// Suffisant pour que l'admin et le build fonctionnent.

export function Table({ className = "", ...props }) {
  return (
    <table
      className={`w-full border-collapse text-sm ${className}`}
      {...props}
    />
  );
}

export function TableHeader({ className = "", ...props }) {
  return <thead className={className} {...props} />;
}

export function TableBody({ className = "", ...props }) {
  return <tbody className={className} {...props} />;
}

export function TableRow({ className = "", ...props }) {
  return (
    <tr
      className={`border-b last:border-b-0 hover:bg-gray-50 ${className}`}
      {...props}
    />
  );
}

export function TableHead({ className = "", ...props }) {
  return (
    <th
      className={`text-left font-medium px-3 py-2 bg-gray-100 ${className}`}
      {...props}
    />
  );
}

export function TableCell({ className = "", ...props }) {
  return (
    <td
      className={`px-3 py-2 align-middle ${className}`}
      {...props}
    />
  );
}
