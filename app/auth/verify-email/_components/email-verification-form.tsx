"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

import { WrapperCard } from "@/components/auth/wrapper-card";
import { AlertMessage } from "@/components/ui/alert-message";
import { verifyEmail } from "@/actions/auth";

export const EmailVerificationForm = () => {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(async () => {
    if (!token) {
      setError("Missing Token!");
      return;
    }

    verifyEmail(token)
      .then((data) => {
        const { error, success } = data;

        if (success) {
          setSuccess(success.message);
        }
        if (error) {
          setError(error.message);
        }
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

      <div className="space-y-1">
        {error && <AlertMessage variant="error" message={error} />}
        {success && <AlertMessage variant="success" message={success} />}
      </div>
    </WrapperCard>
  );
};
