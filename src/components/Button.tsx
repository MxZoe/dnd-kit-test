import React from "react";

export default function Button({ children, ...rest }) {
  return (
    <button className="bg-indigo-500 text-white rounded px-4 py-2" {...rest}>
      {children}
    </button>
  );
}
