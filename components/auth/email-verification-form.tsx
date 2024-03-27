import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

import { WrapperCard } from "./wrapper-card";
import { verifyEmail } from "@/actions/auth/verify-email";
import { FormAlert } from "../form-alert";

export const EmailVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Missing Token!");
      return;
    }

    verifyEmail(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <WrapperCard
      title="Confirming your verification"
      subtitle="We are veryifying your email"
      switchFormLabel="Back to login"
      switchFormHref="/auth/login"
      showSocials={false}
    >
      {!success && !error && (
        <div className="flex items-center justify-center w-full">
          <Loader2 className="animate-spin" />
        </div>
      )}

      {success && <FormAlert type="success" message={success} />}
      {error && <FormAlert type="error" message={error} />}
    </WrapperCard>
  );
};
