import React from "react";

export default function SectionPanel({ section, children }) {
  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {section.title}
        </h3>
        {children}
      </div>
    </div>
  );
}
