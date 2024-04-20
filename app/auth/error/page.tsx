import { AlertTriangle } from "lucide-react";

import { WrapperCard } from "@/components/auth/wrapper-card";

const AuthErrorPage = () => {
  return (
    <WrapperCard
      title="OOPS!"
      subtitle="Something went wrong!"
      switchFormLabel="Back to login"
      switchFormHref="/auth/login"
    >
      <div className="flex items-center justify-center">
        <AlertTriangle className="text-destructive" />
      </div>
    </WrapperCard>
  );
};

export default AuthErrorPage;
