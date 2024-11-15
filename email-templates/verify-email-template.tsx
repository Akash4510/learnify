interface EmailTemplateProps {
  confirmLink: string;
}

export const VerifyEmailTemplate = ({ confirmLink }: EmailTemplateProps) => (
  <div>
    <p>
      Click <a href={confirmLink}>here</a> to confirm your email and get access
      to your account
    </p>
  </div>
);
