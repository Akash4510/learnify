"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

import "react-quill/dist/quill.bubble.css";

interface PreviewProps {
  value: string;
}

export const Preview = ({ value }: PreviewProps) => {
  // Importing ReactQuill like this to avoid hydration error.
  // Because 'use client' directive is not enough to disable ssr.
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  return (
    <div className="bg-background/30 rounded-md">
      <ReactQuill theme="bubble" value={value} readOnly />
    </div>
  );
};
