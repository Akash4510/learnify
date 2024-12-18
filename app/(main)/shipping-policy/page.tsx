import Link from "next/link";

import { Heading } from "@/components/heading";

const RefundPolicyPage = () => {
  return (
    <div className="p-4 pt-5 pb-12 md:pb-20 space-y-5">
      <Heading
        title="Shipping Policy"
        titleClassName="uppercase"
        subtitle="Everything You Need to Know About Our Shipping Process, Timelines, and Costs"
        subtitleClassName="text-base"
      />

      <div className="space-y-7 leading-7">
        <div className="space-y-2">
          <p className="list-item list-inside">
            At our Servise, we prioritize quick and efficient delivery of your
            purchases.
          </p>
          <p className="list-item list-inside">
            Upon successful completion of your order, you can expect to receive
            your course, within 00 to 01 minutes.
          </p>
          <p className="list-item list-inside">
            Our delivery method involves sending the products downloadable links
            directly to you via WhatsApp or email, ensuring a seamless and
            convenient experience.
          </p>
          <p className="list-item list-inside">
            If you encounter any issues or delays, please don&apos;t hesitate to
            reach out to our customer support team for prompt assistance. Your
            satisfaction is our utmost priority.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicyPage;
