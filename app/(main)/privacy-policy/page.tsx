import { Heading } from "@/components/heading";

const PrivacyPolicyPage = () => {
  return (
    <div className="p-4 pt-5 pb-12 md:pb-20 space-y-5">
      <Heading
        title="Privacy Policy"
        titleClassName="uppercase"
        subtitle="Learn How We Collect, Use, and Protect Your Personal Information"
        subtitleClassName="text-base"
      />

      <div className="leading-7">
        <p>Privacy policy content goes here.</p>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
