interface ResetPasswordTemplateProps {
  resetLink: string;
}

export const ResetPasswordTemplate = ({
  resetLink,
}: ResetPasswordTemplateProps) => {
  return (
    <div>
      <p>
        Click <a href={resetLink}>here</a> to reset your password
      </p>
    </div>
  );
};
