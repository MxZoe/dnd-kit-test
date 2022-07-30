import React from "react";

export function EmptySidebarPagePanel() {
  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6 sm:py-10 border-2 border-dashed">
        <p className="text-base text-gray-300">No more pages left</p>
      </div>
    </div>
  );
}

export default function SidebarPagePanel({ page }) {
  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {page.title}
        </h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>{page.summary}</p>
        </div>
      </div>
    </div>
  );
}
