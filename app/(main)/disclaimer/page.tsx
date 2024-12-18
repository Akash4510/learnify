import Link from "next/link";

import { Heading } from "@/components/heading";

const DisclaimerPage = () => {
  return (
    <div className="p-4 pt-5 pb-12 md:pb-20 space-y-5">
      <Heading
        title="Disclaimer"
        titleClassName="uppercase"
        subtitle="Read This to Understand Our Limitations and Responsibilities Before Using Our Services"
        subtitleClassName="text-base"
      />

      <div className="space-y-3 leading-7">
        <p className="list-item list-inside">
          The sum that a client pays at LearnUPIND site is just for the online
          courses gave in the Product bought by the client. No amount is paid by
          the client to turn into an affiliate with LearnUPIND.
        </p>
        <p className="list-item list-inside">
          Although we make every effort to ensure that we accurately reflect all
          of the goods and services reviewed on this website and their income
          potential, it should be noted that earnings and income statements made
          by{" "}
          <Link href="/" className="text-blue-400 underline underline-offset-2">
            learnupind.com
          </Link>{" "}
          and its advertisers/sponsors are projections only of what we assume
          you might earn. There is no assurance that you will make those income
          levels, and you accept the risk that individual earnings and income
          statements will vary.
        </p>
        <p className="list-item list-inside">
          The purchase made by the consumer directly from the{" "}
          <Link href="/" className="text-blue-400 underline underline-offset-2">
            LearnUPIND website
          </Link>{" "}
          or via the affiliate connection of the individual who referred the
          purchaser to the LearnUPIND website for his/her desired product does
          not guarantee any profit or financial return whatsoever.
        </p>
        <p className="list-item list-inside">
          Your use of our information, products, and services should be focused
          on your own proper research, and you acknowledge that LearnUPIND is
          not responsible for any successes and failures of your company that
          are directly or indirectly linked to the purchase and use of our
          information, products, and services reviewed or promoted on this
          website.
        </p>
        <p className="list-item list-inside">
          There is no assurance that examples of past earnings can be duplicated
          in the future. We cannot guarantee your future results and/or success.
          There are some unknown risks in business and on the internet that we
          cannot foresee, which could reduce the results you experience. We are
          not responsible for your actions.
        </p>
      </div>
    </div>
  );
};

export default DisclaimerPage;
