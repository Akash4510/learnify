import { Heading } from "@/components/heading";

const ShippingPolicyPage = () => {
  return (
    <div className="p-4 pt-5 pb-12 md:pb-20 space-y-5">
      <Heading
        title="Shipping Policy"
        titleClassName="uppercase"
        subtitle="Everything You Need to Know About Our Shipping Process, Timelines, and Costs"
        subtitleClassName="text-base"
      />

      <div className="leading-7">
        <p>Shipping policy content goes here.</p>
      </div>
    </div>
  );
};

export default ShippingPolicyPage;
