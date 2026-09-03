import { Heading } from "@/components/heading";

const RefundPolicyPage = () => {
  return (
    <div className="p-4 pt-5 pb-12 md:pb-20 space-y-5">
      <Heading
        title="Refund Policy"
        titleClassName="uppercase"
        subtitle="Clear Guidelines on When and How You Can Request a Refund"
        subtitleClassName="text-base"
      />

      <div className="leading-7">
        <p>Refund policy content goes here.</p>
      </div>
    </div>
  );
};

export default RefundPolicyPage;
