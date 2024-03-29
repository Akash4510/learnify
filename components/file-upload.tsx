import { toast } from "sonner";

import { ourFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@/lib/uploadthing";

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}

export const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        toast.error(`${error?.message}`);
      }}
      className="w-full cursor-pointer border border-dashed border-slate-500 rounded-md ut-button:bg-primary ut-button:ut-readying:bg-primary/60 ut-button:text-sm ut-button:cursor-pointer ut-button:h-9 ut-button:w-[7.2rem] ut-button:mt-5 ut-button:hover:bg-primary/90 ut-label:text-primary ut-allowed-content:text-muted-foreground"
    />
  );
};
