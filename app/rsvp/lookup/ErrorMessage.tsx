"use client";

import { useParams, useSearchParams } from "next/navigation";

enum Error {
  Configuration = "Configuration",
}

const errorMap = {
  [Error.Configuration]: (
    <p>
      There was a problem when trying to authenticate. Please contact us if this
      error persists. Unique error code:{" "}
      <code className="text-xs bg-slate-100 p-1 rounded-sm">Configuration</code>
    </p>
  ),
};

export default function ErrorMessage({}) {
  const search = useSearchParams();
  const error = search.get("error") as Error;

  if (error) {
    return (
      <div>
        <div>
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white flex flex-row justify-center items-center gap-2">
            Something went wrong
          </h5>
          <div className="font-normal text-gray-700 dark:text-gray-400">
            {errorMap[error] || "Please contact us if this error persists."}
          </div>
        </div>
      </div>
    );
  } else return <></>;
}
