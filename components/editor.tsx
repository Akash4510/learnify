"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

import "react-quill/dist/quill.snow.css";

interface EditorProps {
  onChange: (value: string) => void;
  value: string | undefined | null;
}

export const Editor = ({ onChange, value }: EditorProps) => {
  // Importing ReactQuill like this to avoid hydration error.
  // Because 'use client' directive is not enough to disable ssr.
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  return (
    <div className="bg-background/10 rounded-md">
      <ReactQuill theme="snow" value={value || ""} onChange={onChange} />
    </div>
  );
};
