import React from "react";

function Loading() {
  return (
    <div className="h-full flex align-middle justify-center fixed top-0 bottom-0 left-0 right-0 bg-slate-600">
      <span className="loading loading-bars loading-lg"></span>
    </div>
  );
}

export default Loading;
