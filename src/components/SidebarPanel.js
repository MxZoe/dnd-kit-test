import React from "react";

export default function SidebarPanel({ children }) {
  return <div className="overflow-y-auto space-y-4 py-6 px-6">{children}</div>;
}
