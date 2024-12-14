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

      <div className="space-y-3 leading-7">
        <p>
          <ol>
            <li className="list-item list-inside list-decimal">
              If cancellation is made within 24 hours, then only you will
              request a refund subject to certain deductions.
            </li>
            <li className="list-item list-inside list-decimal">
              The deductions include a Payment Gateway Fee of 3% and a
              Processing Fee of 5% of the paid amount.
            </li>
            <li className="list-item list-inside list-decimal">
              The refund will be process to the original payment mode only.
            </li>
            <li className="list-item list-inside list-decimal">
              The turnaround time for refund is 7-10 working days.
            </li>
            <li className="list-item list-inside list-decimal">
              During peak times (holidays, special events, etc,) it can take
              longer than normal to process.{" "}
              <span className="text-red-400">*Note:-</span> If the reason is not
              valid, you will not be eligible for a refund.
            </li>
          </ol>
        </p>

        <p className="list-item list-inside space-y-2">
          Process for Refund Request To request a refund, an individual must
          send an Email to support learnupind@gmail.com from their registered
          email address with the following details:
          <ol>
            <li className="list-item list-inside list-decimal">Full Name</li>
            <li className="list-item list-inside list-decimal">
              Registered Email ID
            </li>
            <li className="list-item list-inside list-decimal">
              Registration Date
            </li>
            <li className="list-item list-inside list-decimal">
              Valid reason for Refund
            </li>
            <li className="list-item list-inside list-decimal">
              Screenshot of payment with Date and Time: (You must have received
              an email/message when you paid){" "}
            </li>
          </ol>
          <div>
            <p>
              <span className="text-red-400">*Note:-</span> Refund requests will
              not be processed without the above-shared details.
            </p>
            <p>
              Refund Cancellation Policy Once a customer cancels their refund
              request, the claim cannot be re-opened or undone in the future.
            </p>
          </div>
        </p>
      </div>
    </div>
  );
};

export default RefundPolicyPage;
