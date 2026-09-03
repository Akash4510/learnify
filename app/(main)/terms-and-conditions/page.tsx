import { Heading } from "@/components/heading";

const TermsAndConditionsPage = () => {
  return (
    <div className="p-4 pt-5 pb-12 md:pb-20 space-y-5">
      <Heading
        title="Terms and Conditions"
        titleClassName="uppercase"
        subtitle="The Agreement That Explains Your Rights and Responsibilities While Using Our Services"
        subtitleClassName="text-base"
      />

      <div className="leading-7">
        <p>Terms and conditions content goes here.</p>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;
