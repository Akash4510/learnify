import Link from "next/link";

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

      <div className="space-y-7 leading-7">
        <div className="space-y-2">
          <h3 className="text-xl font-bold">Overview</h3>
          <p className="list-item list-inside">
            Our refund and returns policy lasts 24 hours. If 24 hours have
            passed since your purchase, we can&apos;t offer you a full refund or
            exchange.
          </p>
          <p className="list-item list-inside">
            Amount will be refunded after deducting Payment Gateway charges.
          </p>
          <p className="list-item list-inside">
            No Refund will be given to the customer for the purchase of any
            package made by the customer directly from the LearnUPIND website{" "}
            <Link
              href="/"
              className="text-blue-400 underline underline-offset-2"
            >
              https://www.learnupind.com
            </Link>{" "}
            or through the affiliate link of the person who referred him to the
            LearnUPIND website after 24 hours of the purchase under any
            circumstances.
          </p>
          <p className="list-item list-inside">
            To complete your refund, we require a receipt or proof of purchase.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold">Cancel & Refund Policy</h3>
          <p className="list-item list-inside">
            The deductions include a Payment Gateway Fee of 3% and a Processing
            Fee of 5% of the paid amount.
          </p>
          <p className="list-item list-inside">
            Our Cancel and refund policy lasts 24 hours if you have not viewed
            course. If 24 hours have passed since your purchase, we can&apos;t
            offer you a full refund.
          </p>
          <p className="list-item list-inside">
            To be eligible for a refund your course must be unseen.
          </p>
          <p className="list-item list-inside">
            To complete your return, we require a receipt or proof of purchase.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold">Refunds</h3>
          <p className="list-item list-inside">
            Since the Website offers non-tangible, irrevocable goods we do not
            provide refunds after the product is purchased, which you
            acknowledge prior to purchasing any product on the Website.
          </p>
          <p className="list-item list-inside">
            We do have a fully functioning 365 day trial available which is
            identical to the product that you may download and try before making
            a purchase.
          </p>
          <p className="list-item list-inside">
            Once your refund request is received and inspected, we will send you
            an email to notify you that we have received your request. We will
            also notify you of the approval or rejection of your refund.
          </p>
          <p className="list-item list-inside">
            If you are approved, then your refund will be processed, and a
            credit will automatically be applied to your credit card or original
            method of payment, within a certain amount of days.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold">Late or missing refunds</h3>
          <p className="list-item list-inside">
            If you haven&apos;t received a refund yet, first check your bank
            account again.
          </p>
          <p className="list-item list-inside">
            Then contact your credit card company, it may take some time before
            your refund is officially posted.
          </p>
          <p className="list-item list-inside">
            Next contact your bank. There is often some processing time before a
            refund is posted.
          </p>
          <p className="list-item list-inside">
            If you&apos;ve done all of this and you still have not received your
            refund yet, please contact us at helplearnupind@gmail.com
          </p>
          <div className="list-item list-inside">
            For the refund, you need to mail at helplearnupind@gmail.com In the
            following format with registered e-mail ID only.
            <p className="pl-5">Full Name -</p>
            <p className="pl-5">Registered e-mail ID -</p>
            <p className="pl-5">Registration date -</p>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold">Who we share your data with?</h3>
          <p>
            If you request a password reset, your IP address will be included in
            the reset email.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold">Contacting us</h3>
          <p className="list-item list-inside">
            If you have any questions, concerns, or complaints regarding this
            refund policy, we encourage you to contact us using the details
            below: learnupindcare@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicyPage;
