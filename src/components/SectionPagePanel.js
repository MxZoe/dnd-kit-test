import React from "react";

export function EmptySectionPagePanel() {
  return (
    <div className="mt-5">
      <div className="rounded-md shadow bg-gray-50 px-6 py-6 border-dashed border-gray-200 border-2">
        <p className="font-semibold text-xl text-gray-300">
          Drag and Drop the page from the sidebar here.
        </p>
      </div>
    </div>
  );
}

const SectionPagePanel = React.forwardRef(({ page, ...rest }, ref) => {
  return (
    <div className="mt-5" ref={ref} {...rest}>
      <div className="rounded-md shadow bg-gray-50 px-6 py-5 sm:flex sm:items-start sm:justify-between">
        <div className="sm:flex sm:items-start">
          <div className="mt-3 sm:mt-0 sm:ml-4">
            <div className="text-sm font-medium text-gray-900">
              {page.title}
            </div>
            <div className="mt-1 text-sm text-gray-600 sm:flex sm:items-center">
              <div>{page.summary}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default SectionPagePanel;
